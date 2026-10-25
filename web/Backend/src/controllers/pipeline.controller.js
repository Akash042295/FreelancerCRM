import mongoose from "mongoose";
import Deal, { PIPELINE_STAGES } from "../models/Deal.js";

const probabilities = { lead: 10, qualified: 25, proposal: 50, negotiation: 75, won: 100, lost: 0 };
const userId = (req) => req.user?._id || req.user?.id || req.user?.userId;
const role = (req) => String(req.user?.role || "").toLowerCase();

function accessFilter(req) {
  const id = userId(req);
  if (!id || !mongoose.isValidObjectId(id)) return null;
  if (role(req) === "admin") return { isArchived: false };
  if (role(req) === "employee") return { isArchived: false, $or: [{ createdBy: id }, { assignedTo: id }] };
  return null;
}
function badRequest(res, message) {
  return res.status(400).json({ success: false, message });
}
function editable(body) {
  const keys = ["title","company","contactName","email","phone","value","currency","stage","probability",
    "expectedCloseDate","description","source","customerId","leadId","assignedTo","position","tags","lostReason"];
  return Object.fromEntries(keys.filter((key) => body[key] !== undefined).map((key) => [key, body[key]]));
}
function validate(body, partial = false) {
  const errors = [];
  if ((!partial || body.title !== undefined) && (typeof body.title !== "string" || !body.title.trim())) errors.push("title is required");
  if (body.value !== undefined && (!Number.isFinite(Number(body.value)) || Number(body.value) < 0)) errors.push("value must be non-negative");
  if (body.stage !== undefined && !PIPELINE_STAGES.includes(body.stage)) errors.push("invalid stage");
  if (body.probability !== undefined && (!Number.isFinite(Number(body.probability)) || Number(body.probability) < 0 || Number(body.probability) > 100)) errors.push("probability must be 0-100");
  for (const key of ["customerId","leadId","assignedTo"]) {
    if (body[key] != null && !mongoose.isValidObjectId(body[key])) errors.push(`${key} must be a valid ObjectId`);
  }
  if (body.currency !== undefined && !/^[A-Za-z]{3}$/.test(body.currency)) errors.push("currency must be a 3-letter code");
  if (body.expectedCloseDate != null && body.expectedCloseDate !== "" && Number.isNaN(Date.parse(body.expectedCloseDate))) errors.push("expectedCloseDate must be a valid date");
  return errors;
}

export async function getStages(req, res) {
  if (!userId(req)) return res.status(401).json({ success: false, message: "Authentication required" });
  if (!["admin","employee"].includes(role(req))) return res.status(403).json({ success: false, message: "Access denied" });
  res.json({ success: true, data: PIPELINE_STAGES.map((key, order) => ({ key, label: key[0].toUpperCase()+key.slice(1), order, defaultProbability: probabilities[key] })) });
}

export async function getPipeline(req, res, next) {
  try {
    const base = accessFilter(req);
    if (!base) return res.status(userId(req) ? 403 : 401).json({ success: false, message: "Access denied" });
    const filter = { ...base };
    if (req.query.stage) {
      if (!PIPELINE_STAGES.includes(req.query.stage)) return badRequest(res, "Invalid stage filter");
      filter.stage = req.query.stage;
    }
    if (req.query.assignedTo) {
      if (!mongoose.isValidObjectId(req.query.assignedTo)) return badRequest(res, "Invalid assignedTo");
      filter.assignedTo = req.query.assignedTo;
    }
    if (req.query.search) {
      const q = String(req.query.search).trim().slice(0, 100);
      filter.$and = [{ $or: ["title","company","contactName","email"].map((field) => ({ [field]: { $regex: q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" } })) }];
    }
    const limitNum = Number.parseInt(req.query.limit, 10);
    const limit = Number.isFinite(limitNum) && limitNum > 0 ? Math.min(limitNum, 250) : 100;
    const deals = await Deal.find(filter).sort({ stage: 1, position: 1, updatedAt: -1 }).limit(limit)
      .populate("assignedTo", "name fullname email").lean();
    const stages = PIPELINE_STAGES.map((key) => {
      const items = deals.filter((d) => d.stage === key);
      const totalValue = items.reduce((s, d) => s + d.value, 0);
      const weightedValue = items.reduce((s, d) => s + d.value * d.probability / 100, 0);
      return { key, label: key[0].toUpperCase()+key.slice(1), count: items.length, totalValue, weightedValue, deals: items };
    });
    res.json({ success: true, data: { stages, summary: {
      dealCount: deals.length,
      totalValue: deals.reduce((s, d) => s + d.value, 0),
      weightedValue: deals.reduce((s, d) => s + d.value * d.probability / 100, 0),
      limit
    } } });
  } catch (err) { next(err); }
}

export async function createDeal(req, res, next) {
  try {
    if (!userId(req)) return res.status(401).json({ success: false, message: "Authentication required" });
    if (!["admin","employee"].includes(role(req))) return res.status(403).json({ success: false, message: "Access denied" });
    const errors = validate(req.body);
    if (errors.length) return res.status(400).json({ success: false, message: "Validation failed", errors });
    const data = editable(req.body);
    data.createdBy = userId(req);
    data.stage ||= "lead";
    data.probability ??= probabilities[data.stage];
    if (role(req) === "employee") {
      if (data.assignedTo && String(data.assignedTo) !== String(userId(req))) return res.status(403).json({ success: false, message: "Employees can assign deals only to themselves" });
      data.assignedTo = userId(req);
    }
    if (data.position === undefined) data.position = await Deal.countDocuments({ stage: data.stage, isArchived: false });
    const deal = await Deal.create(data);
    res.status(201).json({ success: true, message: "Deal created", data: deal });
  } catch (err) { next(err); }
}

export async function updateDeal(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.dealId)) return badRequest(res, "Invalid deal ID");
    const filter = accessFilter(req);
    if (!filter) return res.status(userId(req) ? 403 : 401).json({ success: false, message: "Access denied" });
    const errors = validate(req.body, true);
    if (errors.length) return res.status(400).json({ success: false, message: "Validation failed", errors });
    const data = editable(req.body);
    if (data.stage && data.probability === undefined) data.probability = probabilities[data.stage];
    if (role(req) === "employee" && data.assignedTo && String(data.assignedTo) !== String(userId(req))) return res.status(403).json({ success: false, message: "Cannot reassign to another employee" });
    const deal = await Deal.findOneAndUpdate({ _id: req.params.dealId, ...filter }, { $set: data }, { new: true, runValidators: true });
    if (!deal) return res.status(404).json({ success: false, message: "Deal not found" });
    res.json({ success: true, message: "Deal updated", data: deal });
  } catch (err) { next(err); }
}

export async function moveDeal(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.dealId)) return badRequest(res, "Invalid deal ID");
    const { stage, position, lostReason } = req.body;
    if (!PIPELINE_STAGES.includes(stage)) return badRequest(res, "Invalid stage");
    if (position !== undefined && (!Number.isInteger(Number(position)) || Number(position) < 0)) return badRequest(res, "position must be a non-negative integer");
    const filter = accessFilter(req);
    if (!filter) return res.status(userId(req) ? 403 : 401).json({ success: false, message: "Access denied" });
    const data = { stage, probability: probabilities[stage], lostReason: stage === "lost" ? String(lostReason || "").slice(0,1000) : "" };
    if (position !== undefined) data.position = Number(position);
    const deal = await Deal.findOneAndUpdate({ _id: req.params.dealId, ...filter }, { $set: data }, { new: true, runValidators: true });
    if (!deal) return res.status(404).json({ success: false, message: "Deal not found" });
    res.json({ success: true, message: "Deal moved", data: deal });
  } catch (err) { next(err); }
}

export async function archiveDeal(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.dealId)) return badRequest(res, "Invalid deal ID");
    const filter = accessFilter(req);
    if (!filter) return res.status(userId(req) ? 403 : 401).json({ success: false, message: "Access denied" });
    const deal = await Deal.findOneAndUpdate({ _id: req.params.dealId, ...filter }, { $set: { isArchived: true } }, { new: true });
    if (!deal) return res.status(404).json({ success: false, message: "Deal not found" });
    res.json({ success: true, message: "Deal archived", data: { _id: deal._id } });
  } catch (err) { next(err); }
}
