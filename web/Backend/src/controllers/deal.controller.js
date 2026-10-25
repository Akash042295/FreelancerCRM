import Deal from "../models/Deal.js";
import DealActivity from "../models/ActivityLog.js";

// 1. Single Deal ki Detail Fetch karna (Page load hote hi)
export const getDealById = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id)
      .populate("assignedTo", "name email avatar")
      .populate("createdBy", "name email");

    if (!deal) return res.status(404).json({ success: false, message: "Deal not found" });

    res.status(200).json({ success: true, data: deal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Deal Update karna (Edit Details)
export const updateDeal = async (req, res) => {
  try {
    const updatedDeal = await Deal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: updatedDeal });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 3. Timeline (Activities) Fetch karna
export const getDealActivities = async (req, res) => {
  try {
    const activities = await DealActivity.find({ dealId: req.params.id })
      .populate("createdBy", "name avatar")
      .sort({ createdAt: -1 }); // Latest sabse upar
    res.status(200).json({ success: true, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Naya Note/Activity add karna
export const addDealActivity = async (req, res) => {
  try {
    const activity = await DealActivity.create({
      dealId: req.params.id,
      type: req.body.type || "note",
      content: req.body.content,
      createdBy: req.user._id // Auth middleware se
    });
    const populated = await activity.populate("createdBy", "name avatar");
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};