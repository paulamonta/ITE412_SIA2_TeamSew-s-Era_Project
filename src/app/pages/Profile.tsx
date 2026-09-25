import { useState } from "react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { Edit2, Camera, MapPin, Phone, Mail, LogOut, ChevronRight, Star, Bell, Shield, HelpCircle, Moon } from "lucide-react";
import { motion } from "motion/react";

export function Profile() {
  const navigate = useNavigate();
  const { user, role, setIsAuthenticated, setRole } = useApp();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole(null);
    navigate("/");
  };

  const roleLabel = role === "customer" ? "Customer" : role === "tailor" ? "Tailor / Dressmaker" : "Fabric Seller";
  const primaryColor = role === "tailor" ? "#2A9D8F" : "#E2725B";

  const menuItems = [
    { icon: Bell, label: "Notifications", toggle: true, value: notifications, onToggle: () => setNotifications(!notifications) },
    { icon: Moon, label: "Dark Mode", toggle: true, value: darkMode, onToggle: () => setDarkMode(!darkMode) },
    { icon: Shield, label: "Privacy & Security", toggle: false, onPress: () => {} },
    { icon: HelpCircle, label: "Help & Support", toggle: false, onPress: () => {} },
  ];

  return (
    <div className="px-4 py-4">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-sm p-6 mb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1694872780969-570e465890e9?w=100&h=100&fit=crop"}
              alt="Profile"
              className="w-20 h-20 rounded-2xl object-cover"
              style={{ border: `3px solid ${primaryColor}` }}
            />
            <button
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white"
              style={{ background: primaryColor }}
            >
              <Camera size={14} />
            </button>
          </div>
          <button className="p-2 rounded-xl bg-gray-100">
            <Edit2 size={18} className="text-gray-600" />
          </button>
        </div>

        <h2 className="font-bold text-xl text-gray-800">{user?.name || "Sofia Reyes"}</h2>
        <p className="text-sm font-medium mt-0.5" style={{ color: primaryColor }}>{roleLabel}</p>

        <div className="space-y-2 mt-3">
          {user?.location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-gray-400" />
              <span className="text-sm text-gray-600">{user.location}</span>
            </div>
          )}
          {user?.phone && (
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-gray-400" />
              <span className="text-sm text-gray-600">{user.phone}</span>
            </div>
          )}
          {user?.email && (
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-gray-400" />
              <span className="text-sm text-gray-600">{user.email}</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
          {role === "customer" ? (
            <>
              <div className="text-center"><p className="font-bold text-gray-800">3</p><p className="text-xs text-gray-500">Projects</p></div>
              <div className="text-center"><p className="font-bold text-gray-800">12</p><p className="text-xs text-gray-500">Orders</p></div>
              <div className="text-center"><p className="font-bold text-gray-800">5</p><p className="text-xs text-gray-500">Reviews</p></div>
            </>
          ) : role === "tailor" ? (
            <>
              <div className="text-center"><p className="font-bold text-gray-800">342</p><p className="text-xs text-gray-500">Completed</p></div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-0.5">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <p className="font-bold text-gray-800">4.9</p>
                </div>
                <p className="text-xs text-gray-500">Rating</p>
              </div>
              <div className="text-center"><p className="font-bold text-gray-800">6</p><p className="text-xs text-gray-500">Portfolio</p></div>
            </>
          ) : (
            <>
              <div className="text-center"><p className="font-bold text-gray-800">₱284K</p><p className="text-xs text-gray-500">Revenue</p></div>
              <div className="text-center"><p className="font-bold text-gray-800">1,203</p><p className="text-xs text-gray-500">Orders</p></div>
              <div className="text-center"><p className="font-bold text-gray-800">4.8 ⭐</p><p className="text-xs text-gray-500">Rating</p></div>
            </>
          )}
        </div>
      </div>

      {/* Role Badge */}
      <div
        className="rounded-2xl p-4 mb-4 flex items-center gap-3"
        style={{ background: `${primaryColor}15` }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: primaryColor }}>
          <span className="text-white text-xl">{role === "customer" ? "👤" : role === "tailor" ? "✂️" : "🧵"}</span>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Verified {roleLabel}</p>
          <p className="text-xs text-gray-500">Member since January 2025</p>
        </div>
      </div>

      {/* Settings Menu */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={item.label}>
              <button
                onClick={item.toggle ? item.onToggle : item.onPress}
                className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Icon size={16} className="text-gray-600" />
                </div>
                <span className="flex-1 text-sm text-gray-700 text-left">{item.label}</span>
                {item.toggle ? (
                  <div
                    className={`w-10 h-6 rounded-full transition-all relative ${item.value ? "bg-opacity-100" : "bg-gray-200"}`}
                    style={item.value ? { background: primaryColor } : {}}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${item.value ? "right-1" : "left-1"}`} />
                  </div>
                ) : (
                  <ChevronRight size={16} className="text-gray-400" />
                )}
              </button>
              {i < menuItems.length - 1 && <div className="h-px bg-gray-50 ml-16" />}
            </div>
          );
        })}
      </div>

      {/* Switch Role */}
      <button
        onClick={() => { setRole(null); navigate("/"); }}
        className="w-full py-3.5 rounded-2xl border-2 border-gray-200 text-gray-600 font-medium mb-3 flex items-center justify-center gap-2"
      >
        🔄 Switch Role
      </button>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full py-3.5 rounded-2xl bg-red-50 border-2 border-red-100 text-red-600 font-medium flex items-center justify-center gap-2"
      >
        <LogOut size={18} /> Sign Out
      </button>

      {/* App Info */}
      <div className="text-center mt-6 pb-4">
        <p className="font-bold text-gray-600">
          <span className="text-[#E2725B]">Sews</span><span className="text-[#2A9D8F]">Era</span>
        </p>
        <p className="text-xs text-gray-400 mt-0.5">v1.0.0 • The Filipino Fashion Marketplace</p>
      </div>
    </div>
  );
}
