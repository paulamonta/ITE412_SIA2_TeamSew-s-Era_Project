import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Edit2, Camera, MapPin, Phone, Mail, Clock, CheckCircle, Star, Globe, Save } from "lucide-react";
import { motion } from "motion/react";

export function ShopProfile() {
  const { user } = useApp();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shopData, setShopData] = useState({
    name: "Textile Hub PH",
    tagline: "Premium Fabrics for Every Creation",
    location: "Divisoria, Manila, Metro Manila",
    phone: "+63 917 123 4567",
    email: "textilehubph@sewsera.ph",
    website: "www.textilehubph.com",
    hours: "Mon–Sat: 8:00 AM – 6:00 PM",
    description: "Your trusted source for premium Philippine fabrics since 2010. We carry a wide selection of traditional piña, jusi, silk, and modern fabrics for tailors and designers.",
    categories: ["Silk", "Piña", "Jusi", "Cotton", "Organza", "Lace"],
    verified: true,
  });

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="px-4 py-4">
      {/* Shop Cover */}
      <div className="relative rounded-3xl overflow-hidden h-44 mb-12">
        <img
          src="https://images.unsplash.com/photo-1771098206711-b138a4ee835d?w=600&h=300&fit=crop"
          alt="Shop Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
          <Camera size={15} className="text-gray-700" />
        </button>

        {/* Shop Logo */}
        <div className="absolute -bottom-10 left-4">
          <div className="relative">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1771098206711-b138a4ee835d?w=100&h=100&fit=crop"}
              alt="Shop"
              className="w-20 h-20 rounded-2xl border-4 border-white object-cover shadow-lg"
            />
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#E2725B] rounded-full flex items-center justify-center">
              <Camera size={12} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Shop Info */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-xl text-gray-800">{shopData.name}</h2>
            {shopData.verified && <CheckCircle size={18} className="text-[#2A9D8F]" />}
          </div>
          <p className="text-sm text-gray-500">{shopData.tagline}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold">4.8</span>
            <span className="text-xs text-gray-400">(203 reviews)</span>
          </div>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className={`p-2 rounded-xl ${editing ? "bg-gray-100" : "bg-[#FEF0ED]"}`}
        >
          <Edit2 size={18} className="text-[#E2725B]" />
        </button>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-2xl p-3 mb-4 flex items-center gap-2"
        >
          <CheckCircle size={16} className="text-green-600" />
          <p className="text-sm text-green-700 font-medium">Shop profile saved successfully!</p>
        </motion.div>
      )}

      {/* Edit Form or Display */}
      {editing ? (
        <div className="space-y-3 mb-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Shop Name</label>
            <input
              value={shopData.name}
              onChange={e => setShopData({ ...shopData, name: e.target.value })}
              className="w-full p-3 rounded-xl bg-gray-50 text-sm focus:outline-none border border-gray-100"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Tagline</label>
            <input
              value={shopData.tagline}
              onChange={e => setShopData({ ...shopData, tagline: e.target.value })}
              className="w-full p-3 rounded-xl bg-gray-50 text-sm focus:outline-none border border-gray-100"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Description</label>
            <textarea
              value={shopData.description}
              onChange={e => setShopData({ ...shopData, description: e.target.value })}
              rows={3}
              className="w-full p-3 rounded-xl bg-gray-50 text-sm focus:outline-none border border-gray-100 resize-none"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Location</label>
            <input value={shopData.location} onChange={e => setShopData({ ...shopData, location: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 text-sm focus:outline-none border border-gray-100" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Phone</label>
              <input value={shopData.phone} onChange={e => setShopData({ ...shopData, phone: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 text-sm focus:outline-none border border-gray-100" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Email</label>
              <input value={shopData.email} onChange={e => setShopData({ ...shopData, email: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 text-sm focus:outline-none border border-gray-100" />
            </div>
          </div>
          <button
            onClick={handleSave}
            className="w-full py-3.5 rounded-2xl text-white font-semibold flex items-center justify-center gap-2"
            style={{ background: "#E2725B" }}
          >
            <Save size={18} /> Save Changes
          </button>
        </div>
      ) : (
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <h3 className="font-semibold text-sm text-gray-800 mb-2">About the Shop</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{shopData.description}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
            <h3 className="font-semibold text-sm text-gray-800">Contact Info</h3>
            {[
              { icon: MapPin, label: shopData.location },
              { icon: Phone, label: shopData.phone },
              { icon: Mail, label: shopData.email },
              { icon: Globe, label: shopData.website },
              { icon: Clock, label: shopData.hours },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FEF0ED] flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className="text-[#E2725B]" />
                </div>
                <span className="text-sm text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
        <h3 className="font-semibold text-sm text-gray-800 mb-3">Fabric Categories</h3>
        <div className="flex flex-wrap gap-2">
          {shopData.categories.map(cat => (
            <span key={cat} className="px-3 py-1.5 rounded-full text-sm bg-[#FEF0ED] text-[#E2725B] font-medium">{cat}</span>
          ))}
          <button className="px-3 py-1.5 rounded-full text-sm border-2 border-dashed border-gray-300 text-gray-400">+ Add</button>
        </div>
      </div>

      {/* Shop Stats */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <h3 className="font-semibold text-sm text-gray-800 mb-3">Shop Performance</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Total Sales", value: "₱284K" },
            { label: "Orders Completed", value: "1,203" },
            { label: "Repeat Customers", value: "68%" },
            { label: "Avg. Response Time", value: "< 2 hrs" },
          ].map(s => (
            <div key={s.label}>
              <p className="font-bold text-[#E2725B]">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
