import express from "express";
import { createInvoiceFromQuotation, getInvoicesByDeal } from "../controllers/invoice.controller.js";
import { generateInvoicePDF } from "../utils/pdfGenerator.js";
import Invoice from "../models/Invoice.js";
const router = express.Router();

router.post("/", createInvoiceFromQuotation);
router.get("/deal/:dealId", getInvoicesByDeal);

// PDF Download Route
router.get("/:id/pdf", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("dealId", "company contactName");
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    generateInvoicePDF(invoice, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;