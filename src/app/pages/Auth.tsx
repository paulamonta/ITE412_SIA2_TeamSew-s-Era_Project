import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useApp } from "../context/AppContext";
import { motion } from "motion/react";
import { Eye, EyeOff, Scissors, ChevronLeft, Phone, Lock, User, Mail } from "lucide-react";

const DEMO_USERS: Record<string, { name: string; avatar: string; location: string; phone: string }> = {
  customer: {
    name: "Sofia Reyes",
    avatar: "https://images.unsplash.com/photo-1694872780969-570e465890e9?w=100&h=100&fit=crop",
    location: "Quezon City",
    phone: "+63 912 345 6789",
  },
  tailor: {
    name: "Maria Santos",
    avatar: "https://images.unsplash.com/photo-1742497359527-209679267627?w=100&h=100&fit=crop",
    location: "Makati City",
    phone: "+63 917 234 5678",
  },
  seller: {
    name: "Gloria Tan",
    avatar: "https://images.unsplash.com/photo-1771098206711-b138a4ee835d?w=100&h=100&fit=crop",
    location: "Manila",
    phone: "+63 918 345 6789",
  },
};

export function Auth() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const { role, setUser, setIsAuthenticated } = useApp();
  const [mode, setMode] = useState<"login" | "signup">(type === "signup" ? "signup" : "login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  const primaryColor = role === "tailor" ? "#2A9D8F" : "#E2725B";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const userData = DEMO_USERS[role || "customer"];
      setUser({
        id: "u1",
        name: mode === "signup" ? form.name || userData.name : userData.name,
        email: form.email || `${role}@sewsera.ph`,
        phone: form.phone || userData.phone,
        avatar: userData.avatar,
        role: role,
        location: userData.location,
      });
      setIsAuthenticated(true);
      setLoading(false);
      if (role === "customer") navigate("/customer/home");
      else if (role === "tailor") navigate("/tailor/dashboard");
      else navigate("/seller/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FAF3E0] max-w-lg mx-auto flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <button onClick={() => navigate("/")} className="p-2 -ml-2 rounded-full hover:bg-gray-100 mb-4">
          <ChevronLeft size={24} style={{ color: primaryColor }} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-white shadow flex items-center justify-center">
            <Scissors size={24} style={{ color: primaryColor }} />
          </div>
          <div>
            <h1 className="font-bold text-2xl">
              <span style={{ color: "#E2725B" }}>Sews</span>
              <span style={{ color: "#2A9D8F" }}>Era</span>
            </h1>
            <p className="text-xs text-gray-500 capitalize">
              {role} {mode === "login" ? "Sign In" : "Registration"}
            </p>
          </div>
        </div>

        <h2 className="font-bold text-2xl text-gray-800">
          {mode === "login" ? "Welcome back! 👋" : "Create Account ✨"}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {mode === "login" ? "Sign in to continue to your account" : "Join the SewsEra community today"}
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6">
        {/* Tab Toggle */}
        <div className="flex bg-white rounded-2xl p-1 mb-6 shadow-sm">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              mode === "login" ? "text-white shadow-sm" : "text-gray-500"
            }`}
            style={mode === "login" ? { background: primaryColor } : {}}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              mode === "signup" ? "text-white shadow-sm" : "text-gray-500"
            }`}
            style={mode === "signup" ? { background: primaryColor } : {}}
          >
            Sign Up
          </button>
        </div>

        <motion.form
          key={mode}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {mode === "signup" && (
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 bg-white rounded-2xl border border-gray-100 shadow-sm text-sm focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": primaryColor } as React.CSSProperties}
              />
            </div>
          )}

          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 bg-white rounded-2xl border border-gray-100 shadow-sm text-sm focus:outline-none"
            />
          </div>

          {mode === "signup" && (
            <div className="relative">
              <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 bg-white rounded-2xl border border-gray-100 shadow-sm text-sm focus:outline-none"
              />
            </div>
          )}

          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full pl-11 pr-12 py-3.5 bg-white rounded-2xl border border-gray-100 shadow-sm text-sm focus:outline-none"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {mode === "login" && (
            <div className="text-right">
              <button type="button" className="text-sm" style={{ color: primaryColor }}>Forgot password?</button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl text-white font-semibold mt-2 flex items-center justify-center gap-2 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${primaryColor}, #C4566E)` }}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </motion.form>

        {/* Social Login */}
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["Google", "Facebook"].map(provider => (
              <button
                key={provider}
                onClick={() => {
                  const e = { preventDefault: () => {} } as React.FormEvent;
                  handleSubmit(e);
                }}
                className="py-3 bg-white rounded-2xl shadow-sm text-sm text-gray-600 font-medium border border-gray-100 hover:shadow-md transition-shadow"
              >
                {provider}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Note */}
        <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-200">
          <p className="text-xs text-amber-700 text-center">
            💡 <strong>Demo Mode:</strong> Click any sign in button to explore the platform as a <span className="capitalize">{role}</span>.
          </p>
        </div>
      </div>
    </div>
  );
}