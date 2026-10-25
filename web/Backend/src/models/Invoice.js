import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  rate: { type: Number, required: true },
  amount: { type: Number, required: true }
});

const invoiceSchema = new mongoose.Schema({
  dealId: { type: mongoose.Schema.Types.ObjectId, ref: "Deal", required: true },
  quotationId: { type: mongoose.Schema.Types.ObjectId, ref: "Quotation" }, // Link to quotation
  invoiceNumber: { type: String, required: true, unique: true }, // e.g., INV-2024-001
  items: [invoiceItemSchema],
  subTotal: { type: Number, required: true },
  taxRate: { type: Number, default: 0 },
  taxAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["unpaid", "partial", "paid", "overdue"], default: "unpaid" },
  dueDate: { type: Date, required: true },
  notes: { type: String },
  companyLogo: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true, versionKey: false });

export default mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);