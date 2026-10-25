// src/pages/SalesPipeline.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  AlertTriangle,
  X,
  TrendingUp,
  Briefcase,
  Trophy,
  Wallet,
  RefreshCw,
  Trash2,
  Loader2,
  Lock,
} from "lucide-react";
import * as pipelineApi from "../../lib/pipelineApi.js";

/* ---------------- VARIANTS ---------------- */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

/* ---------------- STAGE META ---------------- */
const STAGE_META = {
  lead: { label: "Prospecting", accent: "#f97316" },
  qualified: { label: "Qualification", accent: "#f59e0b" },
  proposal: { label: "Proposal", accent: "#3b82f6" },
  negotiation: { label: "Negotiation", accent: "#8b5cf6" },
  won: { label: "Closed Won", accent: "#22c55e" },
  lost: { label: "Closed Lost", accent: "#ef4444" },
};
const FALLBACK_PROB = { lead: 10, qualified: 25, proposal: 50, negotiation: 75, won: 100, lost: 0 };

/* ---------------- HELPERS ---------------- */
const initialsOf = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("") || "?";

const hashStr = (s = "") => {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const AVATAR_COLORS = [
  "bg-orange-500/20 text-orange-400",
  "bg-blue-500/20 text-blue-400",
  "bg-purple-500/20 text-purple-400",
  "bg-green-500/20 text-green-400",
  "bg-amber-500/20 text-amber-400",
  "bg-pink-500/20 text-pink-400",
  "bg-teal-500/20 text-teal-400",
];

const fmtMoney = (value, currency = "USD", compact = false) => {
  const n = Number(value) || 0;
  const cur = /^[A-Za-z]{3}$/.test(currency || "") ? currency.toUpperCase() : "USD";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cur,
      notation: compact ? "compact" : "standard",
      maximumFractionDigits: compact ? 1 : 0,
    }).format(n);
  } catch {
    return `${cur} ${n.toLocaleString()}`;
  }
};

const isAtRisk = (deal) => {
  if (!deal || deal.stage === "won" || deal.stage === "lost") return false;
  if (deal.expectedCloseDate && new Date(deal.expectedCloseDate).getTime() < Date.now()) return true;
  if (deal.updatedAt) {
    const days = (Date.now() - new Date(deal.updatedAt).getTime()) / 86400000;
    if (days > 14) return true;
  }
  return false;
};

const Avatar = ({ name }) => (
  <div
    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
      AVATAR_COLORS[hashStr(name) % AVATAR_COLORS.length]
    }`}
  >
    {initialsOf(name)}
  </div>
);

/* ---------------- DEAL CARD ---------------- */
const DealCard = ({ deal, isDragging, onDragStart, onDragEnd, onClick }) => {
  const risk = isAtRisk(deal);
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, deal)}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={`group cursor-grab rounded-xl border border-black/50 bg-[#1A1A1A]/80 p-3 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/20 hover:shadow-lg hover:shadow-orange-500/5 active:cursor-grabbing ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{deal.title}</p>
          {deal.company ? (
            <p className="mt-0.5 truncate text-[11px] text-gray-500">{deal.company}</p>
          ) : null}
        </div>
        <Avatar name={deal.company || deal.title || "?"} />
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-sm font-bold text-white">
          {fmtMoney(deal.value, deal.currency, true)}
        </span>
        <div className="flex items-center gap-1.5">
          {deal.probability != null && (
            <span className="rounded-md bg-orange-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-orange-400">
              {deal.probability}%
            </span>
          )}
          {risk && (
            <span title="Deal at risk">
              <AlertTriangle size={14} className="text-amber-400" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------------- STAGE COLUMN ---------------- */
const StageColumn = ({
  col,
  currency,
  draggingId,
  isOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragStart,
  onDragEnd,
  onCardClick,
  onAdd,
}) => {
  const total = col.deals.reduce((s, d) => s + (Number(d.value) || 0), 0);

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`flex w-full flex-col rounded-2xl border bg-[#1A1A1A]/80 backdrop-blur-xl transition-colors duration-200 ${
        isOver ? "border-orange-500/40 bg-orange-500/4" : "border-black/50"
      }`}
    >
      <div className="h-1.5 w-full rounded-t-2xl" style={{ background: col.accent }} />

      <div className="px-4 pt-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-bold text-white">{col.label}</h3>
          <button
            type="button"
            onClick={onAdd}
            aria-label={`Add deal to ${col.label}`}
            className="flex h-6 w-6 items-center justify-center rounded-md border border-black/50 text-gray-400 transition-colors hover:border-orange-500/40 hover:text-orange-500"
          >
            <Plus size={14} />
          </button>
        </div>
        <div className="mt-1 text-lg font-bold text-white">
          {fmtMoney(total, currency, true)}
        </div>
        <div className="mt-0.5 text-[11px] text-gray-500">
          {col.deals.length} {col.deals.length === 1 ? "Deal" : "Deals"}
        </div>
      </div>

      {/* Deal List */}
      <div className="flex max-h-[60vh] min-h-30 flex-col gap-2.5 overflow-y-auto p-3 scrollbar-thin">
        {col.deals.map((deal) => (
          <DealCard
            key={deal._id}
            deal={deal}
            isDragging={draggingId === deal._id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={() => onCardClick(deal)}
          />
        ))}

        {col.deals.length === 0 && (
          <div className="rounded-xl border border-dashed border-black/50 py-7 text-center text-[11px] text-gray-600">
            {isOver ? "Drop here" : "No deals"}
          </div>
        )}
      </div>

      {/* Bottom Add Button */}
      <div className="p-3 mt-auto">
        <button
          type="button"
          onClick={onAdd}
          className="flex w-full items-center justify-center rounded-xl border border-dashed border-black/50 py-1.5 text-gray-500 transition-colors hover:border-orange-500/40 hover:bg-[#2A2A2A]/50 hover:text-orange-500"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

/* ---------------- STAT CARD ---------------- */
const StatCard = ({ icon, label, value, hint }) => (
  <motion.div
    variants={item}
    className="bg-[#1A1A1A]/80 backdrop-blur-xl border border-black/50 rounded-xl p-4 sm:p-5 flex flex-col gap-2 group hover:border-orange-500/20 transition-all duration-300"
  >
    <div className="flex items-center justify-between">
      <span className="text-xs sm:text-sm text-gray-500">{label}</span>
      <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/20">
        {icon}
      </span>
    </div>
    <div className="text-xl font-bold text-white sm:text-2xl">{value}</div>
    {hint ? (
      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-medium text-emerald-400">
        <TrendingUp size={14} />
        {hint}
      </div>
    ) : null}
  </motion.div>
);

/* ---------------- DEAL FORM MODAL ---------------- */
const inputCls =
  "w-full rounded-lg border border-black/50 bg-[#111] px-3 py-2 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-orange-500/50";
const labelCls = "mb-1.5 block text-xs font-semibold text-gray-500";

const DealFormModal = ({ mode, deal, defaultStage, stageOptions, defaultProbability, onClose, onSaved }) => {
  const [form, setForm] = useState(() => {
    const stage = deal?.stage || defaultStage || "lead";
    return {
      title: deal?.title || "",
      company: deal?.company || "",
      contactName: deal?.contactName || "",
      email: deal?.email || "",
      phone: deal?.phone || "",
      value: deal?.value ?? "",
      currency: deal?.currency || "USD",
      stage,
      probability: deal?.probability ?? defaultProbability(stage),
      expectedCloseDate: deal?.expectedCloseDate
        ? String(deal.expectedCloseDate).slice(0, 10)
        : "",
      description: deal?.description || "",
    };
  });
  const [saving, setSaving] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [errors, setErrors] = useState([]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const changeStage = (e) => {
    const stage = e.target.value;
    setForm((f) => ({ ...f, stage, probability: defaultProbability(stage) }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const local = [];
    if (!form.title.trim()) local.push("title is required");
    if (form.value !== "" && (!Number.isFinite(Number(form.value)) || Number(form.value) < 0))
      local.push("value must be a non-negative number");
    if (local.length) {
      setErrors(local);
      return;
    }

    setSaving(true);
    setErrors([]);

    const payload = {
      title: form.title.trim(),
      company: form.company.trim(),
      contactName: form.contactName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      value: Number(form.value) || 0,
      currency: (form.currency || "USD").toUpperCase(),
      stage: form.stage,
      probability: Number(form.probability),
      expectedCloseDate: form.expectedCloseDate || null,
      description: form.description,
    };

    try {
      if (mode === "edit" && deal?._id) {
        await pipelineApi.updateDeal(deal._id, payload);
        onSaved("Deal updated");
      } else {
        await pipelineApi.createDeal(payload);
        onSaved("Deal created");
      }
    } catch (err) {
      setErrors(err.errors?.length ? err.errors : [err.message || "Something went wrong"]);
    } finally {
      setSaving(false);
    }
  };

  const archive = async () => {
    if (!deal?._id) return;
    if (!window.confirm(`Archive "${deal.title}"?`)) return;
    setArchiving(true);
    try {
      await pipelineApi.archiveDeal(deal._id);
      onSaved("Deal archived");
    } catch (err) {
      setErrors([err.message || "Could not archive deal"]);
    } finally {
      setArchiving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-black/70 p-0 backdrop-blur-sm sm:p-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="my-0 w-full max-w-2xl rounded-none border border-black/50 bg-[#1A1A1A]/95 p-5 shadow-[0_0_40px_rgba(249,115,22,0.12)] backdrop-blur-xl sm:my-8 sm:rounded-2xl sm:p-6"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">
              {mode === "edit" ? "Edit Deal" : "New Deal"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {mode === "edit" ? "Update the deal details." : "Add a deal to your pipeline."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/50 text-gray-400 transition-colors hover:border-orange-500/40 hover:text-orange-500"
          >
            <X size={16} />
          </button>
        </div>

        {errors.length > 0 && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
            {errors.map((msg, i) => (
              <p key={i} className="text-xs text-red-400">
                • {msg}
              </p>
            ))}
          </div>
        )}

        <form onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls}>Title *</label>
            <input className={inputCls} value={form.title} onChange={set("title")} placeholder="e.g. FreelancerCRM Industries renewal" />
          </div>

          <div>
            <label className={labelCls}>Company</label>
            <input className={inputCls} value={form.company} onChange={set("company")} placeholder="FreelancerCRM Industries" />
          </div>

          <div>
            <label className={labelCls}>Contact name</label>
            <input className={inputCls} value={form.contactName} onChange={set("contactName")} placeholder="John Doe" />
          </div>

          <div>
            <label className={labelCls}>Email</label>
            <input className={inputCls} type="email" value={form.email} onChange={set("email")} placeholder="john@company.com" />
          </div>

          <div>
            <label className={labelCls}>Phone</label>
            <input className={inputCls} value={form.phone} onChange={set("phone")} placeholder="+1 555 000 0000" />
          </div>

          <div>
            <label className={labelCls}>Value</label>
            <input className={inputCls} type="number" min="0" step="any" value={form.value} onChange={set("value")} placeholder="0" />
          </div>

          <div>
            <label className={labelCls}>Currency</label>
            <input className={inputCls} maxLength={3} value={form.currency} onChange={set("currency")} placeholder="USD" />
          </div>

          <div>
            <label className={labelCls}>Stage</label>
            <select className={inputCls} value={form.stage} onChange={changeStage}>
              {stageOptions.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Probability (%)</label>
            <input
              className={inputCls}
              type="number"
              min="0"
              max="100"
              value={form.probability}
              onChange={set("probability")}
            />
          </div>

          <div>
            <label className={labelCls}>Expected close date</label>
            <input className={inputCls} type="date" value={form.expectedCloseDate} onChange={set("expectedCloseDate")} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Description</label>
            <textarea
              className={`${inputCls} min-h-22.5 resize-y`}
              value={form.description}
              onChange={set("description")}
              placeholder="Notes about this deal..."
            />
          </div>

          <div className="mt-2 flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            {mode === "edit" ? (
              <button
                type="button"
                onClick={archive}
                disabled={archiving}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/40 px-4 py-2.5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-60"
              >
                {archiving ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                Archive
              </button>
            ) : (
              <span />
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-black/50 px-5 py-2.5 text-sm font-semibold text-gray-300 transition-colors hover:border-orange-500/40 hover:text-orange-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-colors hover:bg-orange-600 disabled:opacity-60"
              >
                {saving && <Loader2 size={16} className="animate-spin" />}
                {mode === "edit" ? "Save changes" : "Create deal"}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

/* ================= MAIN PAGE ================= */
const SalesPipeline = () => {
  const navigate = useNavigate();

  const [columns, setColumns] = useState(null);
  const [stageConfig, setStageConfig] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [dragId, setDragId] = useState(null);
  const [overStage, setOverStage] = useState(null);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let alive = true;
    pipelineApi
      .getStages()
      .then((res) => {
        if (alive && Array.isArray(res?.data)) setStageConfig(res.data);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setQuery(search.trim()), 350);
    return () => clearTimeout(id);
  }, [search]);

  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(id);
  }, [toast]);

  const load = useCallback(async (searchTerm) => {
    setLoading(true);
    setError("");
    try {
      const res = await pipelineApi.getPipeline({ search: searchTerm || undefined, limit: 250 });
      const list = Array.isArray(res?.data?.stages) ? res.data.stages : [];
      setColumns(
        list.map((s) => ({
          key: s.key,
          label: STAGE_META[s.key]?.label || s.label || s.key,
          accent: STAGE_META[s.key]?.accent || "#f97316",
          deals: Array.isArray(s.deals) ? s.deals : [],
        })),
      );
    } catch (err) {
      setError(
        err.status === 401
          ? "Your session expired. Please sign in again."
          : err.message || "Could not load the pipeline.",
      );
      setColumns([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(query);
  }, [load, query]);

  const stats = useMemo(() => {
    const cols = columns || [];
    const currency =
      (() => {
        const counts = {};
        cols.forEach((c) =>
          c.deals.forEach((d) => {
            const k = (d.currency || "USD").toUpperCase();
            counts[k] = (counts[k] || 0) + 1;
          }),
        );
        const best = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
        return best ? best[0] : "USD";
      })();

    const activeCols = cols.filter((c) => c.key !== "lost");
    const dealCount = activeCols.reduce((s, c) => s + c.deals.length, 0);
    const totalValue = activeCols.reduce(
      (s, c) => s + c.deals.reduce((a, d) => a + (Number(d.value) || 0), 0),
      0,
    );
    const weightedValue = activeCols.reduce(
      (s, c) =>
        s +
        c.deals.reduce(
          (a, d) => a + (Number(d.value) || 0) * ((Number(d.probability) || 0) / 100),
          0,
        ),
      0,
    );
    const wonCol = cols.find((c) => c.key === "won");
    const wonDeals = wonCol?.deals.length || 0;
    const wonValue = wonCol?.deals.reduce((a, d) => a + (Number(d.value) || 0), 0) || 0;
    const avgDeal = dealCount ? totalValue / dealCount : 0;
    const atRisk = cols
      .filter((c) => c.key !== "won" && c.key !== "lost")
      .reduce((s, c) => s + c.deals.filter(isAtRisk).length, 0);

    return { currency, dealCount, totalValue, weightedValue, wonDeals, wonValue, avgDeal, atRisk };
  }, [columns]);

  const stageOptions = useMemo(() => {
    if (stageConfig.length) {
      return stageConfig.map((s) => ({
        key: s.key,
        label: STAGE_META[s.key]?.label || s.label || s.key,
      }));
    }
    return Object.keys(STAGE_META).map((k) => ({ key: k, label: STAGE_META[k].label }));
  }, [stageConfig]);

  const defaultProbability = useCallback(
    (stage) => {
      const found = stageConfig.find((s) => s.key === stage);
      if (found && Number.isFinite(found.defaultProbability)) return found.defaultProbability;
      return FALLBACK_PROB[stage] ?? 10;
    },
    [stageConfig],
  );

  const handleDragStart = (e, deal) => {
    setDragId(deal._id);
    e.dataTransfer.effectAllowed = "move";
    try {
      e.dataTransfer.setData("text/plain", deal._id);
    } catch {
      /* noop */
    }
  };

  const handleDragEnd = () => {
    setDragId(null);
    setOverStage(null);
  };

  const handleDragOver = (e, stageKey) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (overStage !== stageKey) setOverStage(stageKey);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setOverStage(null);
  };

  const handleDrop = async (e, targetStage) => {
    e.preventDefault();
    setOverStage(null);

    const id = dragId;
    setDragId(null);
    if (!id) return;

    let deal = null;
    let fromStage = null;
    for (const col of columns || []) {
      const found = col.deals.find((d) => d._id === id);
      if (found) {
        deal = found;
        fromStage = col.key;
        break;
      }
    }
    if (!deal || fromStage === targetStage) return;

    setColumns((prev) =>
      (prev || []).map((col) => {
        if (col.key === fromStage) return { ...col, deals: col.deals.filter((d) => d._id !== id) };
        if (col.key === targetStage)
          return { ...col, deals: [{ ...deal, stage: targetStage }, ...col.deals] };
        return col;
      }),
    );

    try {
      const res = await pipelineApi.moveDeal(id, { stage: targetStage });
      const updated = res?.data;
      if (updated) {
        setColumns((prev) =>
          (prev || []).map((col) => ({
            ...col,
            deals: col.deals.map((d) => (d._id === id ? { ...d, ...updated } : d)),
          })),
        );
      }
      setToast({ type: "success", message: `Moved to ${STAGE_META[targetStage]?.label || targetStage}` });
    } catch (err) {
      setColumns((prev) =>
        (prev || []).map((col) => {
          if (col.key === targetStage) return { ...col, deals: col.deals.filter((d) => d._id !== id) };
          if (col.key === fromStage) return { ...col, deals: [deal, ...col.deals] };
          return col;
        }),
      );
      setToast({ type: "error", message: err.message || "Could not move deal" });
    }
  };

  const openCreate = (stage = "lead") => setModal({ mode: "create", deal: null, stage });

  // 👇 YAHAN CHANGE KIYA HAI: Edit Modal ki jagah Admin Route par navigate kar rahe hain
  const handleCardClick = (deal) => {
    navigate(`/admin/deals/${deal._id}`);
  };

  const handleSaved = (message) => {
    setModal(null);
    setToast({ type: "success", message });
    load(query);
  };

  const firstLoad = loading && columns === null;

  // Filter out 'lost' stage to only display 5 columns matching the reference image
  const displayCols = (columns || []).filter((c) => c.key !== "lost");

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* HEADER + STATS */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="mt-2 text-3xl font-bold tracking-wide text-white sm:text-4xl">
              Deals <span className="text-orange-500">Pipeline</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm text-gray-500 sm:text-base">
              Drag deals between stages to move them. Values update live from your pipeline.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search deals..."
                className="w-full rounded-lg border border-black/50 bg-[#1A1A1A]/80 py-2.5 pl-9 pr-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-orange-500/50"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => load(query)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/50 bg-[#1A1A1A]/80 text-gray-400 transition-colors hover:border-orange-500/20 hover:text-orange-500"
                title="Refresh"
              >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              </button>

              <button
                onClick={() => openCreate("lead")}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-colors hover:bg-orange-600 sm:flex-none"
              >
                <Plus size={16} /> New Deal
              </button>
            </div>
          </div>
        </div>

        {/* 4 STAT CARDS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Wallet size={18} />}
            label="Total Pipeline Value"
            value={fmtMoney(stats.totalValue, stats.currency, true)}
            hint={`Weighted ${fmtMoney(stats.weightedValue, stats.currency, true)}`}
          />
          <StatCard
            icon={<Briefcase size={18} />}
            label="Total Deals"
            value={stats.dealCount.toLocaleString()}
            hint={`${stats.wonDeals} closed won`}
          />
          <StatCard
            icon={<Trophy size={18} />}
            label="Won Deals"
            value={stats.wonDeals.toLocaleString()}
            hint={`Value ${fmtMoney(stats.wonValue, stats.currency, true)}`}
          />
          <StatCard
            icon={<TrendingUp size={18} />}
            label="Avg. Deal Size"
            value={fmtMoney(stats.avgDeal, stats.currency, true)}
            hint={`${stats.atRisk} deals at risk`}
          />
        </div>
      </div>

      {/* BOARD (CSS Grid - 5 Columns, No Overflow) */}
      <div>
        {error && (
          <div className="mb-5 flex flex-col gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-red-400">{error}</p>
            <div className="flex gap-3">
              <button
                onClick={() => load(query)}
                className="rounded-lg border border-red-500/40 px-4 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/10"
              >
                Retry
              </button>
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-600"
              >
                <Lock size={14} /> Sign in
              </button>
            </div>
          </div>
        )}

        {firstLoad ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-100 animate-pulse rounded-2xl border border-black/50 bg-[#1A1A1A]/80"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {displayCols.map((col) => (
              <StageColumn
                key={col.key}
                col={col}
                currency={stats.currency}
                draggingId={dragId}
                isOver={overStage === col.key}
                onDragOver={(e) => handleDragOver(e, col.key)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, col.key)}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                // 👇 YAHAN CHANGE KIYA HAI
                onCardClick={handleCardClick}
                onAdd={() => openCreate(col.key)}
              />
            ))}
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-black/50 py-4 text-sm text-gray-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded border border-dashed border-gray-500" />
            Drop to move deal
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-400" />
            {stats.atRisk} {stats.atRisk === 1 ? "deal" : "deals"} at risk
          </div>
        </div>
      </div>

      {/* MODAL (Sirf New Deal create karne ke liye) */}
      {modal && (
        <DealFormModal
          mode={modal.mode}
          deal={modal.deal}
          defaultStage={modal.stage}
          stageOptions={stageOptions}
          defaultProbability={defaultProbability}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className={`fixed bottom-6 left-1/2 z-110 -translate-x-1/2 rounded-xl border px-5 py-3 text-sm font-semibold shadow-xl backdrop-blur-xl ${
              toast.type === "error"
                ? "border-red-500/40 bg-red-500/15 text-red-300"
                : "border-orange-500/40 bg-orange-500/15 text-orange-300"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SalesPipeline;