import mongoose from "mongoose";

const quotationItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  rate: { type: Number, required: true },
  amount: { type: Number, required: true } // quantity * rate
});

const quotationSchema = new mongoose.Schema({
  dealId: { type: mongoose.Schema.Types.ObjectId, ref: "Deal", required: true },
  quotationNumber: { type: String, required: true, unique: true }, // e.g., QT-2024-001
  items: [quotationItemSchema],
  subTotal: { type: Number, required: true },
  taxRate: { type: Number, default: 0 }, // e.g., 18 for 18%
  taxAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["draft", "sent", "accepted", "rejected"], default: "draft" },
  validUntil: { type: Date },
  notes: { type: String },
  companyLogo: { type: String }, // URL to uploaded logo
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true, versionKey: false });

export default mongoose.models.Quotation || mongoose.model("Quotation", quotationSchema);