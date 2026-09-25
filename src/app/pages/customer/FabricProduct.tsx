import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FABRICS, FABRIC_SELLERS } from "../../data/mockData";
import { Star, MapPin, ShoppingCart, Heart, MessageCircle, ChevronRight, Minus, Plus, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function FabricProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fabric = FABRICS.find(f => f.id === id);
  const seller = fabric ? FABRIC_SELLERS.find(s => s.id === fabric.sellerId) : null;

  const [selectedColor, setSelectedColor] = useState(fabric?.colors[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  if (!fabric) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <div className="text-center"><p className="text-4xl mb-2">🧵</p><p>Fabric not found</p></div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const totalPrice = fabric.price * quantity;

  return (
    <div className="pb-6">
      {/* Image */}
      <div className="relative h-72">
        <img src={fabric.image} alt={fabric.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow"
        >
          <Heart size={18} className={liked ? "text-[#E2725B] fill-[#E2725B]" : "text-gray-400"} />
        </button>
        {!fabric.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-800 font-semibold px-4 py-2 rounded-2xl">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="px-4 -mt-6 relative z-10">
        {/* Product Card */}
        <div className="bg-white rounded-3xl shadow-md p-4 mb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <span className="text-xs bg-[#E8F5F4] text-[#2A9D8F] px-3 py-1 rounded-full font-medium">{fabric.category}</span>
              <h1 className="font-bold text-xl text-gray-800 mt-2">{fabric.name}</h1>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="text-3xl font-black text-[#2A9D8F]">₱{fabric.price}</span>
              <span className="text-gray-400 text-sm">/{fabric.unit}</span>
            </div>
            <div>
              {fabric.inStock ? (
                <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <CheckCircle size={16} /> In Stock ({fabric.stockQty}m)
                </span>
              ) : (
                <span className="text-red-500 text-sm font-medium">Out of Stock</span>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-3 leading-relaxed">{fabric.description}</p>
        </div>

        {/* Color Selection */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-3">
          <h3 className="font-semibold text-gray-800 mb-3">Available Colors</h3>
          <div className="flex flex-wrap gap-2">
            {fabric.colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  selectedColor === color
                    ? "bg-[#E2725B] text-white font-medium"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-3">
          <h3 className="font-semibold text-gray-800 mb-3">Quantity (meters)</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <Minus size={18} className="text-gray-600" />
              </button>
              <span className="font-bold text-xl text-gray-800 min-w-[40px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => Math.min(fabric.stockQty || 99, q + 1))}
                className="w-10 h-10 rounded-full bg-[#E2725B] flex items-center justify-center"
              >
                <Plus size={18} className="text-white" />
              </button>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Total</p>
              <p className="font-bold text-xl text-[#2A9D8F]">₱{totalPrice.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Seller Info */}
        {seller && (
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-3">Sold by</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={seller.avatar} alt={seller.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-gray-800">{seller.name}</p>
                    {seller.verified && <CheckCircle size={14} className="text-[#2A9D8F]" />}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium">{seller.rating}</span>
                    <span className="text-xs text-gray-400">({seller.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={11} className="text-gray-400" />
                    <span className="text-xs text-gray-500">{seller.location}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate("/messages")}
                className="p-2 rounded-xl bg-gray-100"
              >
                <MessageCircle size={18} className="text-[#E2725B]" />
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/messages")}
            className="flex-1 py-3.5 rounded-2xl border-2 border-[#2A9D8F] text-[#2A9D8F] font-semibold flex items-center justify-center gap-2"
          >
            <MessageCircle size={18} /> Message
          </button>
          <button
            onClick={handleAddToCart}
            disabled={!fabric.inStock}
            className="flex-1 py-3.5 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #2A9D8F, #1B7A6F)" }}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span key="added" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <CheckCircle size={18} /> Added!
                </motion.span>
              ) : (
                <motion.span key="cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <ShoppingCart size={18} /> Add to Cart
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
}
