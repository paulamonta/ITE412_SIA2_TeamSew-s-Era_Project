import { useState } from "react";
import { useNavigate } from "react-router";
import { FABRICS, FABRIC_SELLERS } from "../../data/mockData";
import { Search, Star, MapPin, ShoppingCart, CheckCircle, Filter } from "lucide-react";
import { motion } from "motion/react";

const CATEGORIES = ["All", "Silk", "Piña", "Jusi", "Cotton", "Organza", "Denim", "Lace", "Chiffon"];

export function FabricMarketplace() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [cart, setCart] = useState<string[]>([]);

  const filtered = FABRICS.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === "All" || f.category === selectedCat;
    return matchSearch && matchCat;
  });

  const addToCart = (id: string) => {
    setCart(c => c.includes(id) ? c.filter(i => i !== id) : [...c, id]);
  };

  return (
    <div className="px-4 py-4">
      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search fabrics..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl shadow-sm text-sm focus:outline-none"
        />
        {cart.length > 0 && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#2A9D8F] rounded-full flex items-center justify-center">
            <span className="text-white text-xs">{cart.length}</span>
          </div>
        )}
      </div>

      {/* Featured Sellers */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 mb-2">Trusted Sellers</h3>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {FABRIC_SELLERS.map(seller => (
            <div key={seller.id} className="flex-shrink-0 bg-white rounded-2xl shadow-sm p-3 flex flex-col items-center gap-1 w-28">
              <img src={seller.avatar} alt={seller.name} className="w-14 h-14 rounded-xl object-cover" />
              <p className="text-xs font-semibold text-gray-800 text-center leading-tight">{seller.name}</p>
              <div className="flex items-center gap-0.5">
                <Star size={10} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-gray-600">{seller.rating}</span>
              </div>
              {seller.verified && (
                <span className="flex items-center gap-0.5 text-xs text-[#2A9D8F]">
                  <CheckCircle size={10} /> Verified
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedCat === cat ? "text-white" : "bg-white text-gray-600 shadow-sm"
            }`}
            style={selectedCat === cat ? { background: "#2A9D8F" } : {}}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Fabric Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((fabric, i) => {
          const inCart = cart.includes(fabric.id);
          const seller = FABRIC_SELLERS.find(s => s.id === fabric.sellerId);
          return (
            <motion.div
              key={fabric.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="relative h-36 overflow-hidden">
                <img src={fabric.image} alt={fabric.name} className="w-full h-full object-cover" />
                {!fabric.inStock && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-xs bg-black/60 px-2 py-1 rounded-full">Out of Stock</span>
                  </div>
                )}
                <button
                  onClick={() => addToCart(fabric.id)}
                  disabled={!fabric.inStock}
                  className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow transition-all ${
                    inCart ? "bg-[#2A9D8F]" : "bg-white"
                  }`}
                >
                  <ShoppingCart size={14} className={inCart ? "text-white" : "text-gray-600"} />
                </button>
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">{fabric.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{seller?.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <div>
                    <p className="font-bold text-[#2A9D8F]">₱{fabric.price}</p>
                    <p className="text-xs text-gray-400">per {fabric.unit}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    fabric.inStock ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-400"
                  }`}>
                    {fabric.inStock ? `${fabric.stockQty}m` : "OOS"}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 left-3 right-3 bg-[#2A9D8F] rounded-2xl shadow-xl p-4 flex items-center justify-between z-50 max-w-lg mx-auto"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <ShoppingCart size={16} className="text-white" />
            </div>
            <span className="text-white font-semibold">{cart.length} item{cart.length > 1 ? "s" : ""} in cart</span>
          </div>
          <button className="bg-white text-[#2A9D8F] text-sm font-bold px-4 py-2 rounded-xl">
            Checkout
          </button>
        </motion.div>
      )}
    </div>
  );
}
