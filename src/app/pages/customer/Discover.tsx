import { useState } from "react";
import { useNavigate } from "react-router";
import { TAILORS, FABRICS } from "../../data/mockData";
import { Search, Star, MapPin, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const TAGS = ["All", "Bridal", "Formal", "Barong", "Casual", "Terno", "Kids", "Suits"];
const FABRIC_CATS = ["All", "Silk", "Piña", "Jusi", "Cotton", "Organza", "Denim", "Lace"];

export function Discover() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"tailors" | "fabrics">("tailors");
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("rating");

  const filteredTailors = TAILORS
    .filter(t => {
      const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.specialty.toLowerCase().includes(search.toLowerCase());
      const matchTag = selectedTag === "All" || t.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase()));
      return matchSearch && matchTag;
    })
    .sort((a, b) => sortBy === "rating" ? b.rating - a.rating : b.completedOrders - a.completedOrders);

  const filteredFabrics = FABRICS
    .filter(f => {
      const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedTag === "All" || f.category === selectedTag;
      return matchSearch && matchCat;
    })
    .sort((a, b) => sortBy === "price" ? a.price - b.price : b.price - a.price);

  return (
    <div className="px-4 py-4">
      {/* Search */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={tab === "tailors" ? "Search tailors..." : "Search fabrics..."}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-sm focus:outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X size={16} className="text-gray-400" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-3 rounded-2xl shadow-sm flex items-center gap-2 ${showFilters ? "bg-[#E2725B] text-white" : "bg-white text-gray-600"}`}
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-2xl p-1 shadow-sm mb-4">
        {(["tailors", "fabrics"] as const).map(t => (
          <button
            key={t}
            onClick={() => { setTab(t); setSelectedTag("All"); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
              tab === t ? "text-white" : "text-gray-500"
            }`}
            style={tab === t ? { background: "#E2725B" } : {}}
          >
            {t === "tailors" ? "✂️ Tailors" : "🧵 Fabrics"}
          </button>
        ))}
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl shadow-sm p-4 mb-4 overflow-hidden"
          >
            <p className="text-sm font-semibold text-gray-700 mb-2">Sort by</p>
            <div className="flex gap-2">
              {(tab === "tailors" ? ["rating", "orders"] : ["price", "price_desc"]).map(s => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${sortBy === s ? "bg-[#E2725B] text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  {s === "rating" ? "Top Rated" : s === "orders" ? "Most Orders" : s === "price" ? "Price: Low" : "Price: High"}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4">
        {(tab === "tailors" ? TAGS : FABRIC_CATS).map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedTag === tag ? "text-white" : "bg-white text-gray-600 shadow-sm"
            }`}
            style={selectedTag === tag ? { background: "#E2725B" } : {}}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results */}
      {tab === "tailors" ? (
        <div className="space-y-3">
          {filteredTailors.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-4xl mb-3">✂️</p>
              <p>No tailors found</p>
            </div>
          ) : (
            filteredTailors.map((tailor, i) => (
              <motion.button
                key={tailor.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/customer/tailor/${tailor.id}`)}
                className="w-full bg-white rounded-2xl shadow-sm overflow-hidden flex text-left"
              >
                <div className="w-28 h-28 flex-shrink-0 overflow-hidden">
                  <img src={tailor.avatar} alt={tailor.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">{tailor.name}</h3>
                      <p className="text-xs text-gray-500">{tailor.specialty}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${tailor.available ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {tailor.available ? "Available" : "Busy"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium">{tailor.rating}</span>
                    <span className="text-xs text-gray-400">({tailor.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={11} className="text-gray-400" />
                    <span className="text-xs text-gray-500">{tailor.location}</span>
                  </div>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {tailor.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs bg-[#FEF0ED] text-[#E2725B] px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-[#E2725B] mt-1">{tailor.price}</p>
                </div>
              </motion.button>
            ))
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredFabrics.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-gray-400">
              <p className="text-4xl mb-3">🧵</p>
              <p>No fabrics found</p>
            </div>
          ) : (
            filteredFabrics.map((fabric, i) => (
              <motion.button
                key={fabric.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/customer/fabric/${fabric.id}`)}
                className="bg-white rounded-2xl shadow-sm overflow-hidden text-left"
              >
                <div className="h-36 overflow-hidden relative">
                  <img src={fabric.image} alt={fabric.name} className="w-full h-full object-cover" />
                  {!fabric.inStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white text-xs font-medium bg-black/60 px-2 py-1 rounded-full">Out of Stock</span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">{fabric.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{fabric.category}</p>
                  <p className="text-[#2A9D8F] font-bold text-sm mt-1">₱{fabric.price}<span className="text-gray-400 font-normal text-xs">/{fabric.unit}</span></p>
                </div>
              </motion.button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
