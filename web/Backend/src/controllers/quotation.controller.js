import Quotation from "../models/Quotation.js";
import Deal from "../models/Deal.js";

// Helper to generate unique quotation number (e.g., QT-2024-1234)
const generateQuotationNumber = async () => {
  const count = await Quotation.countDocuments();
  return `QT-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;
};

export const createQuotation = async (req, res) => {
  try {
    const { dealId, items, taxRate, validUntil, notes, companyLogo } = req.body;
    
    // Calculate totals
    const subTotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    const taxAmount = (subTotal * (taxRate || 0)) / 100;
    const totalAmount = subTotal + taxAmount;

    const quotationNumber = await generateQuotationNumber();

    const quotation = await Quotation.create({
      dealId, items, subTotal, taxRate, taxAmount, totalAmount,
      quotationNumber, validUntil, notes, companyLogo,
      createdBy: req.user._id
    });

    // Update Deal amount to match quotation
    await Deal.findByIdAndUpdate(dealId, { value: totalAmount });

    res.status(201).json({ success: true, data: quotation });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getQuotationByDeal = async (req, res) => {
  try {
    const quotations = await Quotation.find({ dealId: req.params.dealId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: quotations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};