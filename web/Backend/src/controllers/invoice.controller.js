import Invoice from "../models/Invoice.js";
import Quotation from "../models/Quotation.js";

const generateInvoiceNumber = async () => {
  const count = await Invoice.countDocuments();
  return `INV-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;
};

// Quotation se direct Invoice generate karna
export const createInvoiceFromQuotation = async (req, res) => {
  try {
    const { quotationId, dueDate } = req.body;
    
    const quotation = await Quotation.findById(quotationId);
    if (!quotation) return res.status(404).json({ success: false, message: "Quotation not found" });

    const invoiceNumber = await generateInvoiceNumber();

    const invoice = await Invoice.create({
      dealId: quotation.dealId,
      quotationId: quotation._id,
      invoiceNumber,
      items: quotation.items,
      subTotal: quotation.subTotal,
      taxRate: quotation.taxRate,
      taxAmount: quotation.taxAmount,
      totalAmount: quotation.totalAmount,
      dueDate,
      companyLogo: quotation.companyLogo,
      createdBy: req.user._id
    });

    // Update Quotation Status
    quotation.status = "accepted";
    await quotation.save();

    res.status(201).json({ success: true, data: invoice });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getInvoicesByDeal = async (req, res) => {
  try {
    const invoices = await Invoice.find({ dealId: req.params.dealId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};