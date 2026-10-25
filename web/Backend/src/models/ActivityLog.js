import mongoose from "mongoose";

const dealActivitySchema = new mongoose.Schema({
  dealId: { type: mongoose.Schema.Types.ObjectId, ref: "Deal", required: true, index: true },
  type: { type: String, enum: ["note", "call", "email", "meeting", "stage_change"], default: "note" },
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true, versionKey: false });

export default mongoose.models.DealActivity || mongoose.model("DealActivity", dealActivitySchema);