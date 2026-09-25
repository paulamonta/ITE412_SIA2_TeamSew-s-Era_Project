import { useNavigate } from "react-router";
import { useApp } from "../../context/AppContext";
import { SELLER_ORDERS, SELLER_INVENTORY } from "../../data/mockData";
import { TrendingUp, Package, ShoppingCart, AlertCircle, ChevronRight, DollarSign } from "lucide-react";
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "motion/react";

const SALES_DATA = [
  { month: "Nov", sales: 28000 },
  { month: "Dec", sales: 45000 },
  { month: "Jan", sales: 38000 },
  { month: "Feb", sales: 52000 },
  { month: "Mar", sales: 61000 },
  { month: "Apr", sales: 43000 },
];

const STATUS_COLORS: Record<string, { color: string; bg: string }> = {
  Processing: { color: "#E2725B", bg: "#FEF0ED" },
  Shipped: { color: "#2A9D8F", bg: "#E8F5F4" },
  Delivered: { color: "#16A34A", bg: "#F0FDF4" },
  Pending: { color: "#F4A261", bg: "#FFF3E8" },
};

export function SellerDashboard() {
  const navigate = useNavigate();
  const { user } = useApp();
  const pendingOrders = SELLER_ORDERS.filter(o => o.status === "Processing" || o.status === "Pending");
  const lowStockItems = SELLER_INVENTORY.filter(i => i.status === "Low Stock" || i.status === "Out of Stock");
  const monthlyRevenue = 43000;
  const totalOrders = SELLER_ORDERS.length;

  return (
    <div className="px-4 py-4 space-y-5">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Hello,</p>
            <h1 className="font-bold text-xl text-gray-800">{user?.name || "Gloria"}'s Shop 🏪</h1>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#E2725B]">
            <img src={user?.avatar} alt="avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </motion.div>

      {/* Revenue Banner */}
      <div className="rounded-3xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #E2725B 0%, #C4566E 100%)" }}>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign size={16} className="text-white/80" />
            <span className="text-white/80 text-sm">This Month's Revenue</span>
          </div>
          <p className="text-white font-black text-4xl">₱{monthlyRevenue.toLocaleString()}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-white/80 text-sm">vs last month</span>
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp size={10} /> +12.5%
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Orders", value: totalOrders.toString(), color: "#E2725B", bg: "#FEF0ED" },
          { label: "Pending", value: pendingOrders.length.toString(), color: "#F4A261", bg: "#FFF3E8" },
          { label: "Low Stock", value: lowStockItems.length.toString(), color: "#2A9D8F", bg: "#E8F5F4" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-3 shadow-sm text-center"
          >
            <p className="font-bold text-2xl" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Sales Trend</h3>
          <span className="text-xs text-gray-400">Last 6 months</span>
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={SALES_DATA}>
            <defs>
              <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E2725B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#E2725B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v: number) => [`₱${v.toLocaleString()}`, "Sales"]} contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
            <Area type="monotone" dataKey="sales" stroke="#E2725B" strokeWidth={2} fill="url(#salesGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Recent Orders</h3>
          <button onClick={() => navigate("/seller/orders")} className="text-sm text-[#E2725B] flex items-center gap-1">
            View all <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-3">
          {SELLER_ORDERS.slice(0, 3).map((order, i) => {
            const conf = STATUS_COLORS[order.status];
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate("/seller/orders")}
                className="bg-white rounded-2xl p-3 shadow-sm flex items-center gap-3 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100 flex-shrink-0">
                  <ShoppingCart size={18} className="text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-800">{order.buyerName}</p>
                  <p className="text-xs text-gray-500">{order.items[0].name} × {order.items[0].qty}{order.items[0].unit}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm text-gray-800">₱{order.total.toLocaleString()}</p>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ color: conf.color, background: conf.bg }}>
                    {order.status}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-sm text-amber-800">Low Stock Alert</p>
              <p className="text-xs text-amber-700 mt-1">
                {lowStockItems.map(i => i.name).join(", ")} {lowStockItems.length > 1 ? "are" : "is"} running low.
              </p>
              <button onClick={() => navigate("/seller/inventory")} className="text-xs text-amber-700 font-semibold underline mt-1">
                Update Inventory →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
