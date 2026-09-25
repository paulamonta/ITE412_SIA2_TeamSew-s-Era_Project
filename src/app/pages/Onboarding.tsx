import { useState } from "react";
import { useNavigate } from "react-router";
import { useApp, UserRole } from "../context/AppContext";
import { motion } from "motion/react";
import { Scissors, ShoppingBag, User, ArrowRight, ChevronRight } from "lucide-react";

const ROLES = [
  {
    id: "customer" as UserRole,
    icon: User,
    title: "Customer",
    subtitle: "Find tailors & buy fabrics",
    description: "Browse skilled tailors, book fittings, and shop quality fabrics for your projects.",
    color: "#E2725B",
    bg: "#FEF0ED",
  },
  {
    id: "tailor" as UserRole,
    icon: Scissors,
    title: "Tailor / Dressmaker",
    subtitle: "Showcase your craft & get clients",
    description: "Display your portfolio, accept orders, manage your schedule, and grow your business.",
    color: "#2A9D8F",
    bg: "#E8F5F4",
  },
  {
    id: "seller" as UserRole,
    icon: ShoppingBag,
    title: "Fabric Seller",
    subtitle: "Sell fabrics to tailors & crafters",
    description: "List your fabrics, manage inventory, and reach tailors and customers across the Philippines.",
    color: "#E2725B",
    bg: "#FEF0ED",
  },
];

export function Onboarding() {
  const navigate = useNavigate();
  const { setRole } = useApp();
  const [step, setStep] = useState<"welcome" | "role">("welcome");
  const [selected, setSelected] = useState<UserRole>(null);

  const handleContinue = () => {
    if (selected) {
      setRole(selected);
      navigate("/auth/login");
    }
  };

  if (step === "welcome") {
    return (
      <div className="min-h-screen bg-[#FAF3E0] flex flex-col max-w-lg mx-auto">
        {/* Hero */}
        <div className="relative flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8 text-center overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#E2725B] opacity-10 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#2A9D8F] opacity-10 rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            {/* Logo */}
            <div className="w-24 h-24 rounded-3xl bg-white shadow-lg flex items-center justify-center mx-auto mb-6">
              <div className="text-center">
                <Scissors size={36} className="text-[#E2725B] mx-auto" />
              </div>
            </div>

            <h1 className="text-5xl mb-2">
              <span className="font-black text-[#E2725B]">Sews</span>
              <span className="font-black text-[#2A9D8F]">Era</span>
            </h1>
            <p className="text-gray-600 text-lg mb-2">The Filipino Fashion Marketplace</p>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
              Connecting customers, talented tailors, and premium fabric sellers across the Philippines.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative z-10 grid grid-cols-3 gap-3 mt-10 w-full max-w-xs"
          >
            {[
              { emoji: "✂️", label: "Expert Tailors" },
              { emoji: "🧵", label: "Quality Fabrics" },
              { emoji: "📍", label: "Near You" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-3 shadow-sm text-center">
                <div className="text-2xl mb-1">{item.emoji}</div>
                <p className="text-xs text-gray-600">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="px-6 pb-10 space-y-3"
        >
          <button
            onClick={() => setStep("role")}
            className="w-full py-4 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 shadow-lg"
            style={{ background: "linear-gradient(135deg, #E2725B, #C4566E)" }}
          >
            Get Started <ArrowRight size={20} />
          </button>
          <button
            onClick={() => { setStep("role"); }}
            className="w-full py-3 rounded-2xl text-gray-500 text-sm"
          >
            Already have an account? <span className="text-[#E2725B] font-medium">Sign In</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF3E0] flex flex-col max-w-lg mx-auto px-6 pt-10 pb-8">
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="font-bold text-2xl text-gray-800 mb-1">I am a...</h2>
        <p className="text-gray-500 text-sm mb-6">Choose your role to get the best experience</p>

        <div className="space-y-4">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isSelected = selected === role.id;
            return (
              <motion.button
                key={role.id}
                onClick={() => setSelected(role.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                  isSelected ? "shadow-md" : "bg-white border-transparent shadow-sm"
                }`}
                style={isSelected ? { borderColor: role.color, background: role.bg } : {}}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: role.bg, color: role.color }}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800">{role.title}</h3>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? "border-transparent" : "border-gray-300"
                        }`}
                        style={isSelected ? { background: role.color } : {}}
                      >
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </div>
                    <p className="text-sm font-medium mt-0.5" style={{ color: role.color }}>{role.subtitle}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{role.description}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`w-full mt-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all ${
            selected ? "text-white shadow-lg" : "bg-gray-200 text-gray-400"
          }`}
          style={selected ? { background: "linear-gradient(135deg, #E2725B, #C4566E)" } : {}}
        >
          Continue <ChevronRight size={20} />
        </button>
      </motion.div>
    </div>
  );
}