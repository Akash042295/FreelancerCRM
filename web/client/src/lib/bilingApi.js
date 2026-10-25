// src/lib/billingApi.js
import { request } from "./pipelineApi";

const API_BASE = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

function getToken() {
  return (
    localStorage.getItem("crm_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("authToken") ||
    ""
  );
}

export const getQuotationsByDeal = (dealId) => request(`/quotations/deal/${dealId}`);
export const createQuotation = (data) => request("/quotations", { method: "POST", body: data });

export const getInvoicesByDeal = (dealId) => request(`/invoices/deal/${dealId}`);
export const createInvoice = (data) => request("/invoices", { method: "POST", body: data });

// 👇 NAYA FUNCTION: PDF ko blob ke roop mein download karega (token header ke through)
export const downloadInvoicePdf = async (invoiceId, invoiceNumber) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/invoices/${invoiceId}/pdf`, {
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    // Agar backend JSON error bhej raha hai toh wo nikaal lein
    let errMsg = `Download failed (${res.status})`;
    try {
      const errData = await res.json();
      errMsg = errData.message || errMsg;
    } catch {
      /* not json */
    }
    throw new Error(errMsg);
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${invoiceNumber || "invoice"}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};