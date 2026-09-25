import { useNavigate } from "react-router";
import { useApp } from "../../context/AppContext";
import { TAILOR_JOBS, SCHEDULE_EVENTS } from "../../data/mockData";
import { TrendingUp, Star, Briefcase, Calendar, ChevronRight, Clock, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "motion/react";

const EARNINGS_DATA = [
  { day: "Mon", amount: 3500 },
  { day: "Tue", amount: 5200 },
  { day: "Wed", amount: 2800 },
  { day: "Thu", amount: 7100 },
  { day: "Fri", amount: 6400 },
  { day: "Sat", amount: 9200 },
  { day: "Sun", amount: 4100 },
];

const STATUS_COLORS: Record<string, string> = {
  Active: "#E2725B",
  Measuring: "#2A9D8F",
  "Quote Sent": "#F4A261",
  Completed: "#4CAF50",
};

export function TailorDashboard() {
  const navigate = useNavigate();
  const { user } = useApp();
  const activeJobs = TAILOR_JOBS.filter(j => j.status !== "Completed");
  const todayEvents = SCHEDULE_EVENTS.slice(0, 2);
  const weeklyEarnings = EARNINGS_DATA.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="px-4 py-4 space-y-5">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Welcome back,</p>
            <h1 className="font-bold text-xl text-gray-800">{user?.name || "Maria"} ✂️</h1>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#2A9D8F]">
            <img src={user?.avatar} alt="avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Active Jobs", value: activeJobs.length.toString(), icon: Briefcase, color: "#E2725B", bg: "#FEF0ED" },
          { label: "Rating", value: "4.9 ⭐", icon: Star, color: "#2A9D8F", bg: "#E8F5F4" },
          { label: "This Week", value: `₱${(weeklyEarnings / 1000).toFixed(1)}K`, icon: TrendingUp, color: "#E2725B", bg: "#FEF0ED" },
          { label: "Completed", value: "342", icon: Briefcase, color: "#2A9D8F", bg: "#E8F5F4" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-sm p-4"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: stat.bg }}>
                <Icon size={18} style={{ color: stat.color }} />
              </div>
              <p className="font-bold text-xl text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Earnings Chart */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-800">Weekly Earnings</h3>
            <p className="text-2xl font-black text-[#2A9D8F]">₱{weeklyEarnings.toLocaleString()}</p>
          </div>
          <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <TrendingUp size={12} /> +18%
          </span>
        </div>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={EARNINGS_DATA} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(v: number) => [`₱${v.toLocaleString()}`, "Earnings"]}
              contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
            />
            <Bar dataKey="amount" fill="#2A9D8F" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Today's Schedule */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Today's Schedule</h3>
          <button onClick={() => navigate("/tailor/schedule")} className="text-sm text-[#2A9D8F] flex items-center gap-1">
            Full Schedule <ChevronRight size={14} />
          </button>
        </div>
        {todayEvents.length === 0 ? (
          <div className="bg-white rounded-2xl p-4 text-center text-gray-400 text-sm">No appointments today</div>
        ) : (
          <div className="space-y-2">
            {todayEvents.map(event => (
              <div key={event.id} className="bg-white rounded-2xl p-3 flex items-center gap-3 shadow-sm">
                <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center bg-[#E8F5F4] flex-shrink-0">
                  <Clock size={14} className="text-[#2A9D8F]" />
                  <span className="text-xs text-[#2A9D8F] font-medium">{event.time.split(":")[0]}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-800">{event.client}</p>
                  <p className="text-xs text-gray-500">{event.type} • {event.duration}</p>
                </div>
                <div className="w-2 h-2 bg-[#2A9D8F] rounded-full" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Jobs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Active Jobs</h3>
          <button onClick={() => navigate("/tailor/jobs")} className="text-sm text-[#E2725B] flex items-center gap-1">
            View all <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-3">
          {activeJobs.slice(0, 3).map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate("/tailor/jobs")}
              className="bg-white rounded-2xl p-3 shadow-sm flex items-center gap-3 cursor-pointer"
            >
              <img src={job.customerAvatar} alt={job.customerName} className="w-10 h-10 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-800">{job.type}</p>
                <p className="text-xs text-gray-500">{job.customerName}</p>
                <p className="text-xs text-gray-400">Due: {new Date(job.deadline).toLocaleDateString("en-PH", { month: "short", day: "numeric" })}</p>
              </div>
              <div>
                <span
                  className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{ background: `${STATUS_COLORS[job.status]}20`, color: STATUS_COLORS[job.status] }}
                >
                  {job.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Urgent Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
        <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-sm text-amber-800">Deadline Approaching!</p>
          <p className="text-xs text-amber-700 mt-0.5">Mark Villanueva's 3-Piece Suit is due in 2 weeks. Don't forget the fitting session!</p>
        </div>
      </div>
    </div>
  );
}
