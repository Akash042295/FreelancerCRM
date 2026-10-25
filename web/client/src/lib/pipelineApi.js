// src/api/pipelineApi.js
// Backend routes (pipelineRoutes.js) => base: /api/pipeline

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

async function request(path, { method = "GET", body, signal } = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: "include",
    signal,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    /* no json body */
  }

  if (!res.ok) {
    const err = new Error(payload?.message || `Request failed (${res.status})`);
    err.status = res.status;
    err.errors = payload?.errors || [];
    throw err;
  }
  return payload;
}

/* ---------------- Pipeline ---------------- */

export const getStages = (signal) => request("/pipeline/stages", { signal });

export const getPipeline = ({ stage, assignedTo, search, limit } = {}, signal) => {
  const qs = new URLSearchParams();
  if (stage) qs.set("stage", stage);
  if (assignedTo) qs.set("assignedTo", assignedTo);
  if (search) qs.set("search", search);
  if (limit) qs.set("limit", limit);
  const q = qs.toString();
  return request(`/pipeline${q ? `?${q}` : ""}`, { signal });
};

/* ---------------- Deals (Pipeline) ---------------- */

export const createDeal = (data) => request("/pipeline/deals", { method: "POST", body: data });

export const updateDeal = (dealId, data) =>
  request(`/pipeline/deals/${dealId}`, { method: "PATCH", body: data });

export const moveDeal = (dealId, { stage, position, lostReason }) =>
  request(`/pipeline/deals/${dealId}/move`, {
    method: "PATCH",
    body: { stage, ...(position !== undefined ? { position } : {}), ...(lostReason ? { lostReason } : {}) },
  });

export const archiveDeal = (dealId) =>
  request(`/pipeline/deals/${dealId}`, { method: "DELETE" });

/* ---------------- Deal Details (from dealRoutes) ---------------- */

export const getDealById = (dealId, signal) => 
  request(`/deals/${dealId}`, { signal });

export const getDealActivities = (dealId, signal) => 
  request(`/deals/${dealId}/activities`, { signal });

export const addDealActivity = (dealId, { type = "note", content }) => 
  request(`/deals/${dealId}/activities`, { method: "POST", body: { type, content } });

/* ---------------- Export request for custom calls ---------------- */
export { request };

export default { 
  getStages, getPipeline, createDeal, updateDeal, moveDeal, archiveDeal,
  getDealById, getDealActivities, addDealActivity, request 
};