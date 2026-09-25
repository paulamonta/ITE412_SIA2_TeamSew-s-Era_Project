import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { TAILORS, FABRIC_SELLERS } from "../data/mockData";
import { MapPin, Star, Navigation, Filter, X, Scissors, ShoppingBag } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "motion/react";

// Fix Leaflet default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom icons
function createIcon(color: string, emoji: string) {
  return L.divIcon({
    html: `<div style="
      background: ${color};
      width: 36px;
      height: 36px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    "><span style="transform: rotate(45deg); display: block; font-size: 16px; line-height: 28px; text-align: center;">${emoji}</span></div>`,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
}

const tailorIcon = createIcon("#E2725B", "✂️");
const sellerIcon = createIcon("#2A9D8F", "🧵");

function MapCenterButton() {
  const map = useMap();
  return (
    <button
      onClick={() => map.setView([14.5995, 120.9842], 12)}
      className="absolute bottom-32 right-4 z-[1000] w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center"
    >
      <Navigation size={18} className="text-[#E2725B]" />
    </button>
  );
}

export function MapView() {
  const { role } = useApp();
  const navigate = useNavigate();
  const [showTailors, setShowTailors] = useState(true);
  const [showSellers, setShowSellers] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);

  const primaryColor = role === "tailor" ? "#2A9D8F" : "#E2725B";

  const navigateToProfile = (item: any, type: string) => {
    if (type === "tailor" && role === "customer") {
      navigate(`/customer/tailor/${item.id}`);
    }
  };

  return (
    <div className="relative h-[calc(100vh-140px)]">
      {/* Filter Bar */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex gap-2">
        <button
          onClick={() => setShowTailors(!showTailors)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium shadow-md transition-all ${
            showTailors ? "text-white" : "bg-white text-gray-500"
          }`}
          style={showTailors ? { background: "#E2725B" } : {}}
        >
          <Scissors size={14} /> Tailors
        </button>
        <button
          onClick={() => setShowSellers(!showSellers)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium shadow-md transition-all ${
            showSellers ? "text-white" : "bg-white text-gray-500"
          }`}
          style={showSellers ? { background: "#2A9D8F" } : {}}
        >
          <ShoppingBag size={14} /> Fabric Sellers
        </button>
      </div>

      {/* Map */}
      <MapContainer
        center={[14.5995, 120.9842]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        className="z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Tailor Markers */}
        {showTailors && TAILORS.map(tailor => (
          <Marker
            key={tailor.id}
            position={[tailor.lat, tailor.lng]}
            icon={tailorIcon}
            eventHandlers={{
              click: () => setSelectedItem({ ...tailor, type: "tailor" }),
            }}
          >
            <Popup>
              <div className="p-1 min-w-[140px]">
                <div className="flex items-center gap-2 mb-1">
                  <img src={tailor.avatar} alt={tailor.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-xs text-gray-800">{tailor.name}</p>
                    <p className="text-xs text-gray-500">{tailor.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={10} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs">{tailor.rating}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Seller Markers */}
        {showSellers && FABRIC_SELLERS.map(seller => (
          <Marker
            key={seller.id}
            position={[seller.lat, seller.lng]}
            icon={sellerIcon}
            eventHandlers={{
              click: () => setSelectedItem({ ...seller, type: "seller" }),
            }}
          >
            <Popup>
              <div className="p-1 min-w-[140px]">
                <div className="flex items-center gap-2 mb-1">
                  <img src={seller.avatar} alt={seller.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-xs text-gray-800">{seller.name}</p>
                    <p className="text-xs text-gray-500">{seller.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={10} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs">{seller.rating}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapCenterButton />
      </MapContainer>

      {/* Selected Item Panel */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-4 left-3 right-3 z-[1000] bg-white rounded-3xl shadow-xl p-4"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <X size={16} className="text-gray-500" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <img
                src={selectedItem.avatar}
                alt={selectedItem.name}
                className="w-14 h-14 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    selectedItem.type === "tailor" ? "bg-[#FEF0ED] text-[#E2725B]" : "bg-[#E8F5F4] text-[#2A9D8F]"
                  }`}>
                    {selectedItem.type === "tailor" ? "✂️ Tailor" : "🧵 Fabric Seller"}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mt-0.5">{selectedItem.name}</h3>
                <p className="text-xs text-gray-500">{selectedItem.specialty || selectedItem.location}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-medium">{selectedItem.rating}</span>
                  <span className="text-xs text-gray-400">({selectedItem.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <MapPin size={12} className="text-[#E2725B]" />
              <span>{selectedItem.location}</span>
            </div>

            {selectedItem.type === "tailor" && (
              <div className="flex gap-1 flex-wrap mb-3">
                {selectedItem.tags?.map((tag: string) => (
                  <span key={tag} className="text-xs bg-[#FEF0ED] text-[#E2725B] px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => navigate("/messages")}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 font-medium"
              >
                Message
              </button>
              <button
                onClick={() => navigateToProfile(selectedItem, selectedItem.type)}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium"
                style={{ background: selectedItem.type === "tailor" ? "#E2725B" : "#2A9D8F" }}
              >
                View Profile
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      {!selectedItem && (
        <div className="absolute bottom-4 left-3 z-[1000] bg-white rounded-2xl shadow-md px-3 py-2 flex gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#E2725B]" />
            <span className="text-xs text-gray-600">Tailors</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#2A9D8F]" />
            <span className="text-xs text-gray-600">Sellers</span>
          </div>
        </div>
      )}
    </div>
  );
}
