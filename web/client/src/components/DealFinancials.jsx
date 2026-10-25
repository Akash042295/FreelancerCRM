import React, { useState, useEffect } from "react";
import * as billingApi from "../lib/bilingApi.js";
import { Plus, FileText, Download, X, Loader2, ArrowRight } from "lucide-react";

export default function DealFinancials({ dealId }) {
  const [quotations, setQuotations] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);

  const [items, setItems] = useState([{ description: "", quantity: 1, rate: 0 }]);
  const [taxRate, setTaxRate] = useState(0);
  const [validUntil, setValidUntil] = useState("");

  useEffect(() => {
    fetchFinancials();
  }, [dealId]);

  const fetchFinancials = async () => {
    try {
      setLoading(true);
      const [quoteRes, invRes] = await Promise.all([
        billingApi.getQuotationsByDeal(dealId),
        billingApi.getInvoicesByDeal(dealId),
      ]);
      setQuotations(quoteRes.data || []);
      setInvoices(invRes.data || []);
    } catch (error) {
      console.error("Error fetching financials", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuotation = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formattedItems = items.map((item) => ({
        ...item,
        amount: item.quantity * item.rate,
      }));
      await billingApi.createQuotation({
        dealId,
        items: formattedItems,
        taxRate: Number(taxRate),
        validUntil: validUntil || undefined,
        companyLogo: "",
      });
      setIsQuoteModalOpen(false);
      setItems([{ description: "", quantity: 1, rate: 0 }]);
      fetchFinancials();
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConvertToInvoice = async (quotationId) => {
    const dueDate = prompt(
      "Enter Due Date (YYYY-MM-DD):",
      new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0]
    );
    if (!dueDate) return;
    try {
      await billingApi.createInvoice({ quotationId, dueDate });
      alert("Invoice generated successfully!");
      fetchFinancials();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // 👇 NAYA HANDLER
  const handleDownloadPdf = async (invoiceId, invoiceNumber) => {
    try {
      setDownloadingId(invoiceId);
      await billingApi.downloadInvoicePdf(invoiceId, invoiceNumber);
    } catch (error) {
      alert(`PDF download fail: ${error.message}`);
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) return <div className="text-gray-500 p-4">Loading financials...</div>;

  return (
    <div className="mt-6 bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <FileText className="mr-2 text-orange-500" /> Financials
        </h2>
        <button
          onClick={() => setIsQuoteModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center transition"
        >
          <Plus size={16} className="mr-1" /> New Quotation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QUOTATIONS */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Quotations
          </h3>
          <div className="space-y-3">
            {quotations.length === 0 ? (
              <p className="text-sm text-gray-500">No quotations yet.</p>
            ) : (
              quotations.map((q) => (
                <div
                  key={q._id}
                  className="bg-[#111] border border-white/5 p-4 rounded-xl flex justify-between items-center"
                >
                  <div>
                    <p className="text-white font-semibold">{q.quotationNumber}</p>
                    <p className="text-sm text-gray-400">Total: ${q.totalAmount}</p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                        q.status === "accepted"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {q.status.toUpperCase()}
                    </span>
                  </div>
                  {q.status !== "accepted" && (
                    <button
                      onClick={() => handleConvertToInvoice(q._id)}
                      className="text-orange-500 hover:text-white text-xs font-semibold flex items-center border border-orange-500/30 hover:border-orange-500 px-3 py-1.5 rounded-lg transition"
                    >
                      Convert <ArrowRight size={14} className="ml-1" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* INVOICES */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Invoices
          </h3>
          <div className="space-y-3">
            {invoices.length === 0 ? (
              <p className="text-sm text-gray-500">No invoices generated.</p>
            ) : (
              invoices.map((inv) => (
                <div
                  key={inv._id}
                  className="bg-[#111] border border-white/5 p-4 rounded-xl flex justify-between items-center"
                >
                  <div>
                    <p className="text-white font-semibold">{inv.invoiceNumber}</p>
                    <p className="text-sm text-gray-400">Total: ${inv.totalAmount}</p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                        inv.status === "paid"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {inv.status.toUpperCase()}
                    </span>
                  </div>

                  {/* 👇 YAHAN BUTTON ADD KIYA HAI */}
                  <button
                    onClick={() => handleDownloadPdf(inv._id, inv.invoiceNumber)}
                    disabled={downloadingId === inv._id}
                    className="text-blue-400 hover:text-white text-xs font-semibold flex items-center border border-blue-500/30 hover:border-blue-500 px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                  >
                    {downloadingId === inv._id ? (
                      <>
                        <Loader2 size={14} className="mr-1 animate-spin" /> Downloading...
                      </>
                    ) : (
                      <>
                        <Download size={14} className="mr-1" /> PDF
                      </>
                    )}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Create Quotation</h2>
              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateQuotation} className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="text-xs text-gray-400 mb-1 block">Description</label>
                    <input
                      required
                      value={item.description}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].description = e.target.value;
                        setItems(newItems);
                      }}
                      className="w-full bg-[#111] border border-white/10 text-white rounded-lg p-2.5 text-sm outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="w-20">
                    <label className="text-xs text-gray-400 mb-1 block">Qty</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={item.quantity}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].quantity = Number(e.target.value);
                        setItems(newItems);
                      }}
                      className="w-full bg-[#111] border border-white/10 text-white rounded-lg p-2.5 text-sm outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="w-24">
                    <label className="text-xs text-gray-400 mb-1 block">Rate ($)</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={item.rate}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].rate = Number(e.target.value);
                        setItems(newItems);
                      }}
                      className="w-full bg-[#111] border border-white/10 text-white rounded-lg p-2.5 text-sm outline-none focus:border-orange-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setItems(items.filter((_, i) => i !== index))}
                    className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-lg"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setItems([...items, { description: "", quantity: 1, rate: 0 }])}
                className="text-orange-500 text-sm font-semibold flex items-center hover:text-orange-400"
              >
                <Plus size={14} className="mr-1" /> Add Item
              </button>

              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Tax Rate (%)</label>
                  <input
                    type="number"
                    min="0"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 text-white rounded-lg p-2.5 text-sm outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Valid Until</label>
                  <input
                    type="date"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 text-white rounded-lg p-2.5 text-sm outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-semibold flex items-center"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin mr-2" /> : null} Save
                  Quotation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}