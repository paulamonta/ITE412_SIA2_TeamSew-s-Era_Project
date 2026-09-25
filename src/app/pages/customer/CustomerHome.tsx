import { useState } from "react";
import { useNavigate } from "react-router";
import { useApp } from "../../context/AppContext";
import { TAILORS, FABRICS } from "../../data/mockData";
import { Search, Star, MapPin, TrendingUp, ChevronRight, Scissors } from "lucide-react";
import { motion } from "motion/react";

const CATEGORIES = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "bridal", label: "Bridal", emoji: "👰" },
  { id: "formal", label: "Formal", emoji: "🎩" },
  { id: "barong", label: "Barong", emoji: "🇵🇭" },
  { id: "casual", label: "Casual", emoji: "👗" },
  { id: "terno", label: "Terno", emoji: "🌸" },
];

export function CustomerHome() {
  const { user } = useApp();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  const featuredTailors = TAILORS.filter(t => t.available).slice(0, 4);
  const featuredFabrics = FABRICS.filter(f => f.inStock).slice(0, 4);

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">{greeting()},</p>
            <h1 className="font-bold text-xl text-gray-800">{user?.name || "Sofia"} 👋</h1>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#E2725B]">
            <img src={user?.avatar} alt="avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </motion.div>

      {/* Search Bar */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search tailors, fabrics..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onClick={() => navigate("/customer/discover")}
          className="w-full pl-11 pr-4 py-3.5 bg-white rounded-2xl shadow-sm border border-gray-100 text-sm focus:outline-none"
        />
      </div>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl overflow-hidden relative h-44"
        style={{ background: "linear-gradient(135deg, #E2725B 0%, #C4566E 100%)" }}
      >
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1628816411877-da2b1d846cf6?w=600&h=300&fit=crop"
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 p-5 flex flex-col justify-between h-full">
          <div>
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">✨ Featured</span>
            <h3 className="text-white font-bold text-xl mt-2">Find Your Perfect Tailor</h3>
            <p className="text-white/80 text-sm mt-1">500+ skilled tailors across the Philippines</p>
          </div>
          <button
            onClick={() => navigate("/customer/discover")}
            className="bg-white text-[#E2725B] text-sm font-semibold px-4 py-2 rounded-xl self-start flex items-center gap-1"
          >
            Explore Now <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Book Tailor", emoji: "✂️", path: "/customer/booking", color: "#E2725B" },
            { label: "Buy Fabric", emoji: "🧵", path: "/customer/discover", color: "#2A9D8F" },
            { label: "My Projects", emoji: "📋", path: "/customer/projects", color: "#E2725B" },
            { label: "Near Me", emoji: "📍", path: "/customer/map", color: "#2A9D8F" },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1.5 bg-white rounded-2xl p-3 shadow-sm"
            >
              <div className="text-2xl">{item.emoji}</div>
              <span className="text-xs text-gray-600 text-center leading-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? "text-white shadow-sm"
                  : "bg-white text-gray-600 shadow-sm"
              }`}
              style={activeCategory === cat.id ? { background: "#E2725B" } : {}}
            >
              <span>{cat.emoji}</span> {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Tailors */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-800">Top Tailors</h2>
          <button onClick={() => navigate("/customer/discover")} className="text-sm text-[#E2725B] flex items-center gap-1">
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featuredTailors.map((tailor, i) => (
            <motion.button
              key={tailor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/customer/tailor/${tailor.id}`)}
              className="bg-white rounded-2xl shadow-sm overflow-hidden text-left"
            >
              <div className="h-28 overflow-hidden relative">
                <img src={tailor.coverImage} alt={tailor.name} className="w-full h-full object-cover" />
                {tailor.available && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">Available</span>
                )}
              </div>
              <div className="p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <img src={tailor.avatar} alt={tailor.name} className="w-6 h-6 rounded-full object-cover" />
                  <p className="text-sm font-semibold text-gray-800 truncate">{tailor.name}</p>
                </div>
                <p className="text-xs text-gray-500 truncate">{tailor.specialty}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium">{tailor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={11} />
                    <span className="truncate max-w-[70px]">{tailor.location.split(",")[0]}</span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Featured Fabrics */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-800">Trending Fabrics</h2>
          <button onClick={() => navigate("/customer/discover")} className="text-sm text-[#2A9D8F] flex items-center gap-1">
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {featuredFabrics.map((fabric, i) => (
            <motion.button
              key={fabric.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/customer/fabric/${fabric.id}`)}
              className="flex-shrink-0 w-40 bg-white rounded-2xl shadow-sm overflow-hidden text-left"
            >
              <div className="h-32 overflow-hidden">
                <img src={fabric.image} alt={fabric.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">{fabric.name}</p>
                <p className="text-[#2A9D8F] font-bold text-sm mt-1">₱{fabric.price}<span className="text-gray-400 font-normal text-xs">/{fabric.unit}</span></p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stats Banner */}
      <div className="rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #2A9D8F, #1B7A6F)" }}>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={20} className="text-white" />
            <span className="text-white font-semibold">SewsEra Stats</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "500+", label: "Tailors" },
              { value: "1,200+", label: "Fabrics" },
              { value: "10K+", label: "Orders" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-white font-bold text-xl">{s.value}</p>
                <p className="text-white/70 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
