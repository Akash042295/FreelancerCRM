
import PDFDocument from "pdfkit";
import fs from "fs";

export const generateInvoicePDF = (invoice, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // Set headers for download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${invoice.invoiceNumber}.pdf`);

  doc.pipe(res);

  // 1. Header (Company Logo & Title)
  doc.fontSize(20).text("INVOICE", { align: "right" });
  doc.fontSize(10).text(`Invoice #: ${invoice.invoiceNumber}`, { align: "right" });
  doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, { align: "right" });
  doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, { align: "right" });
  doc.moveDown();

  // (Aap yahan invoice.companyLogo ka image doc.image() se add kar sakte hain)

  // 2. Bill To (Customer Info)
  doc.fontSize(12).text("Bill To:", { underline: true });
  doc.fontSize(10).text(invoice.dealId.company || "Customer Name");
  doc.text(invoice.dealId.contactName || "");
  doc.moveDown();

  // 3. Table Headers
  const tableTop = 250;
  doc.font("Helvetica-Bold");
  doc.text("Description", 50, tableTop);
  doc.text("Qty", 300, tableTop);
  doc.text("Rate", 350, tableTop);
  doc.text("Amount", 450, tableTop);
  doc.font("Helvetica");

  // 4. Table Items
  let y = tableTop + 25;
  invoice.items.forEach(item => {
    doc.text(item.description, 50, y);
    doc.text(item.quantity.toString(), 300, y);
    doc.text(`$${item.rate}`, 350, y);
    doc.text(`$${item.amount}`, 450, y);
    y += 25;
  });

  // 5. Totals
  doc.moveDown();
  doc.font("Helvetica-Bold");
  doc.text(`Subtotal: $${invoice.subTotal}`, { align: "right" });
  doc.text(`Tax (${invoice.taxRate}%): $${invoice.taxAmount}`, { align: "right" });
  doc.fontSize(14).text(`Total: $${invoice.totalAmount}`, { align: "right" });

  doc.end();
};