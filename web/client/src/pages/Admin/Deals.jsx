
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as pipelineApi from "../../lib/pipelineApi";
import DealFinancials from "../../components/DealFinancials";
import { 
  Building2, Mail, Phone, Calendar, 
  User, Clock, MessageSquare, Plus, ChevronLeft, 
  MoreHorizontal, CheckCircle2, TrendingUp
} from "lucide-react";

export default function DealDetailsPage() {
  const { id: dealId } = useParams(); 
  const navigate = useNavigate();

  const [deal, setDeal] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Activities fetch karne ka helper (baad mein reuse hoga)
  const refreshActivities = useCallback(async () => {
    try {
      const res = await pipelineApi.getDealActivities(dealId);
      setActivities(res.data || []);
    } catch (err) {
      console.error("Activities fetch error:", err);
    }
  }, [dealId]);

  // 1. Initial Data Fetch
  useEffect(() => {
    const fetchDealData = async () => {
      try {
        setLoading(true);
        const [dealRes, actRes] = await Promise.all([
          pipelineApi.getDealById(dealId),
          pipelineApi.getDealActivities(dealId),
        ]);
        setDeal(dealRes.data);
        setActivities(actRes.data || []);
      } catch (error) {
        console.error("Error fetching deal:", error);
        if (error.status === 401) {
          alert("Session expired. Please login again.");
          navigate("/login");
        } else {
          alert(`Error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };
    if (dealId) fetchDealData();
  }, [dealId, navigate]);

  // 2. Update Deal (PATCH via pipelineApi)
  const handleUpdateDeal = async (field, value) => {
    const previousDeal = { ...deal };
    setDeal(prev => ({ ...prev, [field]: value }));

    try {
      await pipelineApi.updateDeal(dealId, { [field]: value });
      // Server se activities refresh karein (stage change log backend se aayega)
      await refreshActivities();
    } catch (error) {
      console.error("Update failed:", error);
      setDeal(previousDeal);
      alert(`Update fail: ${error.message}`);
    }
  };

  // 3. Add Note (POST via pipelineApi)
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setIsSubmitting(true);
    try {
      await pipelineApi.addDealActivity(dealId, { type: "note", content: newNote });
      setNewNote("");
      await refreshActivities();
    } catch (error) {
      console.error("Note add error:", error);
      alert(`Note add nahi hua: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount, currency) => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: currency || "USD" }).format(amount || 0);

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  if (loading) return <div className="min-h-screen bg-[#0F0F0F] p-10 text-center text-gray-400 font-medium">Loading Deal Details...</div>;
  if (!deal) return <div className="min-h-screen bg-[#0F0F0F] p-10 text-center text-red-500 font-medium">Deal not found!</div>;

  return (
    <div className="min-h-screen bg-[#0F0F0F] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
        <button onClick={() => navigate("/admin/sales-pipeline")} className="flex items-center text-gray-400 hover:text-white transition">
          <ChevronLeft size={20} /> <span className="ml-1 font-medium">Back to Pipeline</span>
        </button>
        <button className="text-gray-500 hover:text-white"><MoreHorizontal size={24} /></button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#1A1A1A]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">{deal.title}</h1>
              <div className="flex items-center text-3xl font-semibold text-orange-500">
                {formatCurrency(deal.value, deal.currency)}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <Building2 size={18} className="text-gray-500 mt-0.5 mr-3 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">{deal.company || "N/A"}</p>
                  <p className="text-xs text-gray-500">Company</p>
                </div>
              </div>
              <div className="flex items-start">
                <User size={18} className="text-gray-500 mt-0.5 mr-3 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">{deal.contactName || "N/A"}</p>
                  <p className="text-xs text-gray-500">Primary Contact</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="text-gray-500 mr-3 shrink-0" />
                <p className="text-sm text-gray-300">{deal.email || "N/A"}</p>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="text-gray-500 mr-3 shrink-0" />
                <p className="text-sm text-gray-300">{deal.phone || "N/A"}</p>
              </div>
            </div>

            <hr className="my-5 border-white/10" />

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Pipeline Stage</label>
                <select 
                  value={deal.stage} 
                  onChange={(e) => handleUpdateDeal("stage", e.target.value)}
                  className="w-full bg-[#111] border border-white/10 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5 outline-none font-medium"
                >
                  <option value="lead">Prospection (Lead)</option>
                  <option value="qualified">Request Received (Qualified)</option>
                  <option value="proposal">Proposal Sent</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="won">Proposal Accepted (Won)</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Expected Close Date</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-3 text-gray-500" />
                  <input 
                    type="date" 
                    value={deal.expectedCloseDate ? deal.expectedCloseDate.split("T")[0] : ""} 
                    onChange={(e) => handleUpdateDeal("expectedCloseDate", e.target.value)}
                    className="w-full bg-[#111] border border-white/10 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5 pl-10 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                  Probability <span className="text-orange-500 font-bold">{deal.probability}%</span>
                </label>
                <input 
                  type="range" min="0" max="100" 
                  value={deal.probability || 0} 
                  onChange={(e) => setDeal(prev => ({ ...prev, probability: parseInt(e.target.value) }))}
                  onMouseUp={(e) => handleUpdateDeal("probability", parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>
            </div>

            <hr className="my-5 border-white/10" />

            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Description</label>
              <textarea 
                value={deal.description || ""}
                onChange={(e) => setDeal(prev => ({ ...prev, description: e.target.value }))}
                onBlur={(e) => handleUpdateDeal("description", e.target.value)}
                rows="3"
                className="w-full text-sm text-gray-300 bg-[#111] border border-white/10 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
                placeholder="Add a description..."
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1A1A1A]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 min-h-150 shadow-lg">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center">
              <TrendingUp size={20} className="mr-2 text-orange-500" /> Activity Timeline
            </h2>

            <form onSubmit={handleAddNote} className="mb-8 relative">
              <div className="flex space-x-3">
                <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-10 h-10 rounded-full border border-white/10" />
                <div className="flex-1">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Write a note, log a call, or add a task..."
                    className="w-full text-sm text-gray-300 bg-[#111] border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none min-h-20"
                  />
                  <div className="mt-2 flex justify-end">
                    <button 
                      type="submit" 
                      disabled={isSubmitting || !newNote.trim()}
                      className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center transition shadow-lg shadow-orange-500/20"
                    >
                      <Plus size={16} className="mr-1" /> {isSubmitting ? "Adding..." : "Add Activity"}
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <div className="relative border-l border-white/10 ml-5 space-y-8">
              {activities.length === 0 ? (
                <p className="text-sm text-gray-500 pl-6">No activities yet. Add a note to get started.</p>
              ) : (
                activities.map((activity) => (
                  <div key={activity._id} className="relative pl-6">
                    <div className="absolute -left-4.25 top-1 bg-[#1A1A1A] rounded-full p-1 border border-white/10">
                      {activity.type === "note" && <MessageSquare size={14} className="text-blue-400" />}
                      {activity.type === "stage_change" && <CheckCircle2 size={14} className="text-green-400" />}
                      {activity.type === "call" && <Phone size={14} className="text-orange-400" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-semibold text-white">{activity.createdBy?.name || "System"}</span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock size={12} className="mr-1" /> 
                          {formatDate(activity.createdAt)} at {new Date(activity.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <div className="bg-[#111] rounded-lg p-3 text-sm text-gray-300 border border-white/5">
                        {activity.content}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6">
        <DealFinancials dealId={dealId} />
      </div>

    </div>
  );
}