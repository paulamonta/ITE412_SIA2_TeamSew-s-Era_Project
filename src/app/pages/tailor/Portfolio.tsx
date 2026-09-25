import { useState } from "react";
import { TAILORS } from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import { Plus, Edit2, Trash2, Star, Award, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const PORTFOLIO_ITEMS = [
  { id: "pi1", title: "Bridal Gown - A-Line", category: "Bridal", image: "https://images.unsplash.com/photo-1706857753012-0a11e409ff5d?w=400&h=400&fit=crop", likes: 24, date: "March 2026" },
  { id: "pi2", title: "Filipiniana Terno", category: "Traditional", image: "https://images.unsplash.com/photo-1742497359527-209679267627?w=400&h=400&fit=crop", likes: 18, date: "Feb 2026" },
  { id: "pi3", title: "Wedding Entourage", category: "Bridal", image: "https://images.unsplash.com/photo-1628816411877-da2b1d846cf6?w=400&h=400&fit=crop", likes: 31, date: "Jan 2026" },
  { id: "pi4", title: "Barong Tagalog Set", category: "Formal", image: "https://images.unsplash.com/photo-1694872780969-570e465890e9?w=400&h=400&fit=crop", likes: 15, date: "Dec 2025" },
  { id: "pi5", title: "Evening Gown", category: "Formal", image: "https://images.unsplash.com/photo-1600091106645-2e76e1787372?w=400&h=400&fit=crop", likes: 22, date: "Nov 2025" },
  { id: "pi6", title: "Kids Party Dress", category: "Kids", image: "https://images.unsplash.com/photo-1628816411877-da2b1d846cf6?w=400&h=400&fit=crop", likes: 9, date: "Oct 2025" },
];

const CATEGORIES = ["All", "Bridal", "Traditional", "Formal", "Kids"];

export function Portfolio() {
  const { user } = useApp();
  const tailor = TAILORS[0];
  const [filter, setFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [items, setItems] = useState(PORTFOLIO_ITEMS);

  const filtered = items.filter(item => filter === "All" || item.category === filter);

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="px-4 py-4">
      {/* Profile Summary */}
      <div className="bg-white rounded-3xl shadow-sm p-4 mb-4">
        <div className="flex items-center gap-4">
          <img src={user?.avatar || tailor.avatar} alt="Profile" className="w-16 h-16 rounded-2xl object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg text-gray-800">{user?.name || tailor.name}</h2>
              <CheckCircle size={16} className="text-[#2A9D8F]" />
            </div>
            <p className="text-sm text-[#2A9D8F]">{tailor.specialty}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold">{tailor.rating}</span>
              <span className="text-xs text-gray-400">({tailor.reviews} reviews)</span>
            </div>
          </div>
          <button className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
            <Edit2 size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-gray-100">
          {[
            { value: items.length.toString(), label: "Works" },
            { value: tailor.completedOrders.toString(), label: "Orders" },
            { value: "12 yrs", label: "Experience" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="font-bold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Specialties */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm text-gray-800">Specialties</h3>
          <button className="text-xs text-[#2A9D8F]">Edit</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tailor.tags.map(tag => (
            <span key={tag} className="px-3 py-1.5 rounded-full text-sm bg-[#E8F5F4] text-[#2A9D8F] font-medium">{tag}</span>
          ))}
          <button className="px-3 py-1.5 rounded-full text-sm border-2 border-dashed border-gray-300 text-gray-400">+ Add</button>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">My Works ({filtered.length})</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1 text-sm font-medium text-white px-3 py-1.5 rounded-xl"
          style={{ background: "#2A9D8F" }}
        >
          <Plus size={14} /> Add
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-3">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === cat ? "text-white" : "bg-white text-gray-600 shadow-sm"
            }`}
            style={filter === cat ? { background: "#2A9D8F" } : {}}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="relative aspect-square">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <button
                onClick={() => deleteItem(item.id)}
                className="absolute top-2 right-2 w-7 h-7 bg-red-500/90 rounded-full flex items-center justify-center"
              >
                <Trash2 size={13} className="text-white" />
              </button>
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.title}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-[#2A9D8F] bg-[#E8F5F4] px-2 py-0.5 rounded-full">{item.category}</span>
                <span className="text-xs text-gray-500">♥ {item.likes}</span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add New Item */}
        <button
          onClick={() => setShowAddModal(true)}
          className="aspect-square bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400"
        >
          <Plus size={28} />
          <span className="text-xs">Add Work</span>
        </button>
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
            <h3 className="font-bold text-lg text-gray-800 mb-4">Add Portfolio Item</h3>
            <div className="space-y-3">
              <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center cursor-pointer">
                <div className="text-center">
                  <p className="text-3xl mb-2">📷</p>
                  <p className="text-sm text-gray-500">Tap to upload photo</p>
                </div>
              </div>
              <input type="text" placeholder="Title (e.g., 'Bridal Gown - A-Line')" className="w-full p-3 rounded-xl bg-gray-50 text-sm focus:outline-none" />
              <select className="w-full p-3 rounded-xl bg-gray-50 text-sm focus:outline-none">
                <option>Select Category</option>
                <option>Bridal</option>
                <option>Traditional</option>
                <option>Formal</option>
                <option>Kids</option>
                <option>Casual</option>
              </select>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-full py-3.5 rounded-2xl text-white font-semibold"
                style={{ background: "#2A9D8F" }}
              >
                Add to Portfolio
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
