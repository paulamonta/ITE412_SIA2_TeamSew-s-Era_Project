import { useState } from "react";
import { SELLER_INVENTORY } from "../../data/mockData";
import { Plus, Edit2, Trash2, Search, AlertCircle, Package } from "lucide-react";
import { motion } from "motion/react";

const STATUS_STYLES: Record<string, { color: string; bg: string }> = {
  "In Stock": { color: "#16A34A", bg: "#F0FDF4" },
  "Low Stock": { color: "#F4A261", bg: "#FFF3E8" },
  "Out of Stock": { color: "#EF4444", bg: "#FEF2F2" },
};

export function Inventory() {
  const [items, setItems] = useState(SELLER_INVENTORY);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState<Record<string, number>>({});
  const [filter, setFilter] = useState("All");

  const filtered = items.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || item.status === filter;
    return matchSearch && matchFilter;
  });

  const updateStock = (id: string, newStock: number) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      let status = "In Stock";
      if (newStock === 0) status = "Out of Stock";
      else if (newStock <= 15) status = "Low Stock";
      return { ...item, stock: newStock, status };
    }));
    setEditingId(null);
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const totalValue = items.reduce((sum, i) => sum + (i.price * i.stock), 0);

  return (
    <div className="px-4 py-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Total SKUs", value: items.length.toString() },
          { label: "Low Stock", value: items.filter(i => i.status === "Low Stock").length.toString() },
          { label: "Est. Value", value: `₱${(totalValue / 1000).toFixed(0)}K` },
        ].map((s, i) => (
          <div key={s.label} className="bg-white rounded-2xl p-3 shadow-sm text-center">
            <p className="font-bold text-xl text-[#E2725B]">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Add */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search inventory..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl shadow-sm text-sm focus:outline-none"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-3 rounded-2xl text-white font-medium flex items-center gap-1"
          style={{ background: "#E2725B" }}
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4">
        {["All", "In Stock", "Low Stock", "Out of Stock"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              filter === f ? "text-white" : "bg-white text-gray-600 shadow-sm"
            }`}
            style={filter === f ? { background: "#E2725B" } : {}}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Inventory List */}
      <div className="space-y-2">
        {filtered.map((item, i) => {
          const conf = STATUS_STYLES[item.status];
          const isEditing = editingId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow-sm p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Package size={18} className="text-gray-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ color: conf.color, background: conf.bg }}
                      >
                        {item.status}
                      </span>
                      <button onClick={() => setEditingId(isEditing ? null : item.id)} className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Edit2 size={13} className="text-gray-600" />
                      </button>
                      <button onClick={() => deleteItem(item.id)} className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                        <Trash2 size={13} className="text-red-500" />
                      </button>
                    </div>
                  </div>

                  {!isEditing ? (
                    <div className="flex items-center gap-4 mt-2">
                      <div>
                        <p className="text-xs text-gray-400">Stock</p>
                        <p className="font-semibold text-sm" style={{ color: conf.color }}>{item.stock} {item.unit}s</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Price</p>
                        <p className="font-semibold text-sm text-gray-800">₱{item.price}/{item.unit}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Value</p>
                        <p className="font-semibold text-sm text-[#E2725B]">₱{(item.price * item.stock).toLocaleString()}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1">
                        <label className="text-xs text-gray-500 mb-1 block">Update Stock (meters)</label>
                        <input
                          type="number"
                          defaultValue={item.stock}
                          onChange={e => setEditStock({ ...editStock, [item.id]: Number(e.target.value) })}
                          className="w-full p-2 rounded-xl bg-gray-50 text-sm focus:outline-none border border-gray-200"
                        />
                      </div>
                      <button
                        onClick={() => updateStock(item.id, editStock[item.id] ?? item.stock)}
                        className="px-3 py-2 rounded-xl text-white text-sm font-medium"
                        style={{ background: "#E2725B" }}
                      >
                        Save
                      </button>
                    </div>
                  )}

                  {/* Stock Bar */}
                  <div className="mt-2">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min((item.stock / 100) * 100, 100)}%`,
                          background: conf.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowAddModal(false)}>
          <motion.div
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            className="bg-white rounded-t-3xl p-6 w-full max-w-lg mx-auto"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg text-gray-800 mb-4">Add New Fabric</h3>
            <div className="space-y-3">
              <input type="text" placeholder="Fabric Name" className="w-full p-3 rounded-xl bg-gray-50 text-sm focus:outline-none" />
              <div className="grid grid-cols-2 gap-3">
                <select className="w-full p-3 rounded-xl bg-gray-50 text-sm focus:outline-none">
                  <option>Category</option>
                  <option>Silk</option><option>Cotton</option><option>Piña</option>
                  <option>Jusi</option><option>Organza</option><option>Denim</option>
                </select>
                <input type="number" placeholder="Price (₱/meter)" className="w-full p-3 rounded-xl bg-gray-50 text-sm focus:outline-none" />
              </div>
              <input type="number" placeholder="Initial Stock (meters)" className="w-full p-3 rounded-xl bg-gray-50 text-sm focus:outline-none" />
              <button
                onClick={() => setShowAddModal(false)}
                className="w-full py-3.5 rounded-2xl text-white font-semibold"
                style={{ background: "#E2725B" }}
              >
                Add to Inventory
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
