import { useState } from "react";
import { TAILOR_JOBS } from "../../data/mockData";
import { useNavigate } from "react-router";
import { MessageCircle, Clock, AlertCircle, CheckCircle, ChevronRight, Plus } from "lucide-react";
import { motion } from "motion/react";

const STATUS_COLORS: Record<string, { bg: string; color: string; icon: any }> = {
  Active: { bg: "#FEF0ED", color: "#E2725B", icon: Clock },
  Measuring: { bg: "#E8F5F4", color: "#2A9D8F", icon: AlertCircle },
  "Quote Sent": { bg: "#FFF3E8", color: "#F4A261", icon: ChevronRight },
  Completed: { bg: "#F0FDF4", color: "#16A34A", icon: CheckCircle },
};

const FILTERS = ["All", "Active", "Measuring", "Quote Sent", "Completed"];

export function Jobs() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = TAILOR_JOBS.filter(j => filter === "All" || j.status === filter);

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-xl text-gray-800">My Jobs</h2>
          <p className="text-sm text-gray-500">{TAILOR_JOBS.length} total orders</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === f ? "text-white" : "bg-white text-gray-600 shadow-sm"
            }`}
            style={filter === f ? { background: "#2A9D8F" } : {}}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-3">📋</p>
            <p>No jobs in this category</p>
          </div>
        ) : (
          filtered.map((job, i) => {
            const conf = STATUS_COLORS[job.status] || STATUS_COLORS.Active;
            const StatusIcon = conf.icon;
            const isExpanded = expandedId === job.id;

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : job.id)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-start gap-3">
                    <img src={job.customerAvatar} alt={job.customerName} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">{job.type}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">{job.customerName}</p>
                        </div>
                        <span
                          className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0"
                          style={{ color: conf.color, background: conf.bg }}
                        >
                          <StatusIcon size={11} />
                          {job.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={11} /> {new Date(job.deadline).toLocaleDateString("en-PH", { month: "short", day: "numeric" })}
                        </span>
                        <span className="text-xs font-semibold text-[#2A9D8F]">₱{job.budget.toLocaleString()}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${job.priority === "High" ? "bg-red-50 text-red-600" : job.priority === "Medium" ? "bg-yellow-50 text-yellow-600" : "bg-gray-50 text-gray-500"}`}>
                          {job.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="border-t border-gray-100 px-4 pb-4"
                  >
                    <div className="pt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-20">Fabric:</span>
                        <span className="text-xs text-gray-700 font-medium">{job.fabric}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-gray-400 w-20">Notes:</span>
                        <span className="text-xs text-gray-700">{job.notes}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => navigate("/messages")}
                        className="flex-1 py-2.5 rounded-xl border border-[#2A9D8F] text-[#2A9D8F] text-sm font-medium flex items-center justify-center gap-1"
                      >
                        <MessageCircle size={15} /> Message
                      </button>
                      <button className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium" style={{ background: "#2A9D8F" }}>
                        Update Status
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })
        )}
      </div>

      {/* New Job Banner */}
      <div className="mt-5 rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #E2725B, #C4566E)" }}>
        <div className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Plus size={24} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold">Get More Clients</p>
            <p className="text-white/70 text-sm">Update your portfolio to attract more bookings</p>
          </div>
        </div>
      </div>
    </div>
  );
}
