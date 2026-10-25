import mongoose from "mongoose";

export const PIPELINE_STAGES = ["lead", "qualified", "proposal", "negotiation", "won", "lost"];

const dealSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  company: { type: String, trim: true, maxlength: 160, default: "" },
  contactName: { type: String, trim: true, maxlength: 120, default: "" },
  email: { type: String, trim: true, lowercase: true, maxlength: 254, default: "" },
  phone: { type: String, trim: true, maxlength: 40, default: "" },
  value: { type: Number, min: 0, default: 0, required: true },
  currency: { type: String, uppercase: true, trim: true, minlength: 3, maxlength: 3, default: "USD" },
  stage: { type: String, enum: PIPELINE_STAGES, default: "lead", index: true },
  probability: { type: Number, min: 0, max: 100, default: 10 },
  expectedCloseDate: { type: Date, default: null },
  description: { type: String, trim: true, maxlength: 5000, default: "" },
  source: { type: String, trim: true, maxlength: 100, default: "manual" },
  customerId: { type: mongoose.Schema.Types.ObjectId, default: null },
  leadId: { type: mongoose.Schema.Types.ObjectId, default: null },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  position: { type: Number, min: 0, default: 0 },
  tags: { type: [{ type: String, trim: true, maxlength: 40 }], default: [] },
  lostReason: { type: String, trim: true, maxlength: 1000, default: "" },
  isArchived: { type: Boolean, default: false, index: true },
}, { timestamps: true, versionKey: false });

dealSchema.index({ stage: 1, position: 1, updatedAt: -1 });
dealSchema.index({ createdBy: 1, stage: 1, isArchived: 1 });
dealSchema.index({ assignedTo: 1, stage: 1, isArchived: 1 });

export default mongoose.models.Deal || mongoose.model("Deal", dealSchema);
