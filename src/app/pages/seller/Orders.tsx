import { useState } from "react";
import { SELLER_ORDERS } from "../../data/mockData";
import { Package, Truck, CheckCircle, Clock, Search, Eye } from "lucide-react";
import { motion } from "motion/react";

const STATUS_CONFIG: Record<string, { icon: any; color: string; bg: string; label: string }> = {
  Pending: { icon: Clock, color: "#F4A261", bg: "#FFF3E8", label: "Pending" },
  Processing: { icon: Package, color: "#E2725B", bg: "#FEF0ED", label: "Processing" },
  Shipped: { icon: Truck, color: "#2A9D8F", bg: "#E8F5F4", label: "Shipped" },
  Delivered: { icon: CheckCircle, color: "#16A34A", bg: "#F0FDF4", label: "Delivered" },
};

const FILTERS = ["All", "Pending", "Processing", "Shipped", "Delivered"];

export function Orders() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [orders, setOrders] = useState(SELLER_ORDERS);

  const filtered = orders.filter(o => {
    const matchFilter = filter === "All" || o.status === filter;
    const matchSearch = o.buyerName.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const nextStatus = (current: string) => {
    const flow = ["Pending", "Processing", "Shipped", "Delivered"];
    const idx = flow.indexOf(current);
    return idx < flow.length - 1 ? flow[idx + 1] : null;
  };

  return (
    <div className="px-4 py-4">
      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl shadow-sm text-sm focus:outline-none"
        />
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === f ? "text-white" : "bg-white text-gray-600 shadow-sm"
            }`}
            style={filter === f ? { background: "#E2725B" } : {}}
          >
            {f}
            {f !== "All" && (
              <span className="ml-1 text-xs">
                ({orders.filter(o => o.status === f).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Package size={40} className="mx-auto mb-3 text-gray-300" />
            <p>No orders found</p>
          </div>
        ) : (
          filtered.map((order, i) => {
            const conf = STATUS_CONFIG[order.status];
            const StatusIcon = conf.icon;
            const isExpanded = expandedId === order.id;
            const next = nextStatus(order.status);

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : order.id)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">{order.buyerName}</p>
                      <p className="text-xs text-gray-400">{order.buyerType} • #{order.id.toUpperCase()}</p>
                    </div>
                    <span
                      className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ color: conf.color, background: conf.bg }}
                    >
                      <StatusIcon size={11} />
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {order.items.map((item, j) => (
                      <p key={j} className="text-sm text-gray-600">
                        {item.name} — {item.qty} {item.unit}
                      </p>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="text-xs text-gray-400">Order Date: {order.orderDate}</p>
                      <p className="text-xs text-gray-400">Delivery: {order.deliveryDate}</p>
                    </div>
                    <p className="font-bold text-[#E2725B] text-lg">₱{order.total.toLocaleString()}</p>
                  </div>
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="border-t border-gray-100 p-4"
                  >
                    {/* Progress Steps */}
                    <div className="flex items-center gap-2 mb-4">
                      {["Pending", "Processing", "Shipped", "Delivered"].map((step, si) => {
                        const isCompleted = ["Pending", "Processing", "Shipped", "Delivered"].indexOf(order.status) >= si;
                        const conf2 = STATUS_CONFIG[step];
                        return (
                          <div key={step} className="flex items-center gap-1 flex-1">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isCompleted ? "text-white" : "bg-gray-100 text-gray-400"}`}
                              style={isCompleted ? { background: conf2.color } : {}}
                            >
                              {si + 1}
                            </div>
                            {si < 3 && <div className={`flex-1 h-0.5 ${isCompleted && ["Pending", "Processing", "Shipped", "Delivered"].indexOf(order.status) > si ? "bg-[#E2725B]" : "bg-gray-200"}`} />}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 flex items-center justify-center gap-1">
                        <Eye size={14} /> View Details
                      </button>
                      {next && (
                        <button
                          onClick={() => updateStatus(order.id, next)}
                          className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium"
                          style={{ background: "#E2725B" }}
                        >
                          Mark as {next}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
