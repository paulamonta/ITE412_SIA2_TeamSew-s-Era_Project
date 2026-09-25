import { useState } from "react";
import { useNavigate } from "react-router";
import { CUSTOMER_PROJECTS } from "../../data/mockData";
import { Plus, MessageCircle, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

const STATUS_CONFIG = {
  "In Progress": { color: "#E2725B", bg: "#FEF0ED", icon: Clock },
  "Completed": { color: "#2A9D8F", bg: "#E8F5F4", icon: CheckCircle },
  "Pending": { color: "#F4A261", bg: "#FFF3E8", icon: AlertCircle },
};

export function Projects() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filtered = CUSTOMER_PROJECTS.filter(p => {
    if (filter === "active") return p.status !== "Completed";
    if (filter === "completed") return p.status === "Completed";
    return true;
  });

  return (
    <div className="px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-xl text-gray-800">My Projects</h2>
          <p className="text-sm text-gray-500">{CUSTOMER_PROJECTS.length} active orders</p>
        </div>
        <button
          onClick={() => navigate("/customer/booking")}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg"
          style={{ background: "linear-gradient(135deg, #E2725B, #C4566E)" }}
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-white rounded-2xl p-1 shadow-sm mb-5">
        {(["all", "active", "completed"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
              filter === f ? "text-white" : "text-gray-500"
            }`}
            style={filter === f ? { background: "#E2725B" } : {}}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Projects */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-gray-400">No projects found</p>
            <button
              onClick={() => navigate("/customer/booking")}
              className="mt-4 px-6 py-3 rounded-2xl text-white text-sm font-medium"
              style={{ background: "#E2725B" }}
            >
              Book a Tailor
            </button>
          </div>
        ) : (
          filtered.map((project, i) => {
            const statusConf = STATUS_CONFIG[project.status as keyof typeof STATUS_CONFIG];
            const StatusIcon = statusConf?.icon || Clock;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl shadow-sm overflow-hidden"
              >
                <div className="p-4">
                  {/* Tailor Info */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img src={project.tailorAvatar} alt={project.tailorName} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{project.tailorName}</p>
                        <p className="text-xs text-gray-500">Tailor</p>
                      </div>
                    </div>
                    <span
                      className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ color: statusConf?.color, background: statusConf?.bg }}
                    >
                      <StatusIcon size={12} />
                      {project.status}
                    </span>
                  </div>

                  {/* Project Type */}
                  <h3 className="font-bold text-gray-800 mb-1">{project.type}</h3>
                  <p className="text-xs text-gray-500 mb-3">{project.notes}</p>

                  {/* Progress Bar */}
                  {project.status === "In Progress" && (
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">Progress</span>
                        <span className="text-xs font-semibold text-[#E2725B]">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                          className="h-full rounded-full"
                          style={{ background: "linear-gradient(135deg, #E2725B, #C4566E)" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Details */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400">Started</p>
                      <p className="text-xs font-medium text-gray-700">
                        {new Date(project.startDate).toLocaleDateString("en-PH", { month: "short", day: "numeric" })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Est. Done</p>
                      <p className="text-xs font-medium text-gray-700">
                        {new Date(project.estimatedDate).toLocaleDateString("en-PH", { month: "short", day: "numeric" })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Total</p>
                      <p className="text-xs font-bold text-[#E2725B]">₱{project.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="flex border-t border-gray-100">
                  <button
                    onClick={() => navigate("/messages")}
                    className="flex-1 py-3 flex items-center justify-center gap-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <MessageCircle size={16} className="text-[#E2725B]" /> Message Tailor
                  </button>
                  <div className="w-px bg-gray-100" />
                  <button
                    onClick={() => navigate(`/customer/tailor/${project.tailorId}`)}
                    className="flex-1 py-3 flex items-center justify-center gap-2 text-sm text-[#E2725B] font-medium hover:bg-[#FEF0ED] transition-colors"
                  >
                    View Profile
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Book More Banner */}
      <div
        onClick={() => navigate("/customer/booking")}
        className="mt-5 rounded-3xl p-5 flex items-center gap-4 cursor-pointer"
        style={{ background: "linear-gradient(135deg, #2A9D8F, #1B7A6F)" }}
      >
        <div className="text-4xl">✂️</div>
        <div>
          <p className="text-white font-bold">Need more tailoring work?</p>
          <p className="text-white/70 text-sm">Book a new tailor now</p>
        </div>
      </div>
    </div>
  );
}
