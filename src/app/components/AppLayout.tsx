import { Outlet, useNavigate, useLocation } from "react-router";
import { useApp } from "../context/AppContext";
import {
  Home, Search, Map, MessageCircle, User,
  LayoutDashboard, Briefcase, ShoppingBag, Calendar,
  Package, ClipboardList, Store, ChevronLeft, Bell
} from "lucide-react";

function CustomerNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = [
    { icon: Home, label: "Home", path: "/customer/home" },
    { icon: Search, label: "Discover", path: "/customer/discover" },
    { icon: Map, label: "Map", path: "/customer/map" },
    { icon: MessageCircle, label: "Messages", path: "/messages" },
    { icon: User, label: "Profile", path: "/profile" },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 max-w-lg mx-auto">
      <div className="flex justify-around py-2">
        {tabs.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path || (path !== "/customer/home" && location.pathname.startsWith(path));
          return (
            <button key={path} onClick={() => navigate(path)} className="flex flex-col items-center gap-0.5 px-3 py-1">
              <Icon size={22} className={active ? "text-[#E2725B]" : "text-gray-400"} />
              <span className={`text-xs ${active ? "text-[#E2725B] font-medium" : "text-gray-400"}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function TailorNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/tailor/dashboard" },
    { icon: Briefcase, label: "Jobs", path: "/tailor/jobs" },
    { icon: ShoppingBag, label: "Fabrics", path: "/tailor/marketplace" },
    { icon: Calendar, label: "Schedule", path: "/tailor/schedule" },
    { icon: User, label: "Profile", path: "/profile" },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 max-w-lg mx-auto">
      <div className="flex justify-around py-2">
        {tabs.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <button key={path} onClick={() => navigate(path)} className="flex flex-col items-center gap-0.5 px-3 py-1">
              <Icon size={22} className={active ? "text-[#2A9D8F]" : "text-gray-400"} />
              <span className={`text-xs ${active ? "text-[#2A9D8F] font-medium" : "text-gray-400"}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function SellerNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/seller/dashboard" },
    { icon: ClipboardList, label: "Orders", path: "/seller/orders" },
    { icon: Package, label: "Inventory", path: "/seller/inventory" },
    { icon: Store, label: "Shop", path: "/seller/shop" },
    { icon: User, label: "Profile", path: "/profile" },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 max-w-lg mx-auto">
      <div className="flex justify-around py-2">
        {tabs.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <button key={path} onClick={() => navigate(path)} className="flex flex-col items-center gap-0.5 px-3 py-1">
              <Icon size={22} className={active ? "text-[#E2725B]" : "text-gray-400"} />
              <span className={`text-xs ${active ? "text-[#E2725B] font-medium" : "text-gray-400"}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function AppLayout() {
  const { role } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const showBack = [
    "/customer/tailor/", "/customer/fabric/", "/customer/booking", "/customer/projects",
    "/tailor/portfolio", "/tailor/schedule",
  ].some(p => location.pathname.startsWith(p));

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("/customer/home")) return "SewsEra";
    if (path.includes("/customer/discover")) return "Discover";
    if (path.includes("/customer/map")) return "Find Nearby";
    if (path.includes("/customer/booking")) return "Book a Tailor";
    if (path.includes("/customer/projects")) return "My Projects";
    if (path.includes("/customer/tailor/")) return "Tailor Profile";
    if (path.includes("/customer/fabric/")) return "Product Details";
    if (path.includes("/tailor/dashboard")) return "Dashboard";
    if (path.includes("/tailor/jobs")) return "My Jobs";
    if (path.includes("/tailor/marketplace")) return "Fabric Store";
    if (path.includes("/tailor/schedule")) return "Schedule";
    if (path.includes("/tailor/portfolio")) return "My Portfolio";
    if (path.includes("/seller/dashboard")) return "Sales Dashboard";
    if (path.includes("/seller/orders")) return "Orders";
    if (path.includes("/seller/inventory")) return "Inventory";
    if (path.includes("/seller/shop")) return "Shop Settings";
    if (path.includes("/messages")) return "Messages";
    if (path.includes("/profile")) return "Profile";
    if (path.includes("/map")) return "Map View";
    return "SewsEra";
  };

  const primaryColor = role === "tailor" ? "#2A9D8F" : "#E2725B";

  return (
    <div className="min-h-screen bg-[#FAF3E0] max-w-lg mx-auto relative">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            {showBack && (
              <button onClick={() => navigate(-1)} className="p-1 -ml-1 rounded-full">
                <ChevronLeft size={24} style={{ color: primaryColor }} />
              </button>
            )}
            <div>
              <span className="font-bold text-lg" style={{ color: primaryColor }}>
                {getTitle() === "SewsEra" ? (
                  <span>
                    <span style={{ color: "#E2725B" }}>Sews</span>
                    <span style={{ color: "#2A9D8F" }}>Era</span>
                  </span>
                ) : getTitle()}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#E2725B] rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="pb-24">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      {role === "customer" && <CustomerNav />}
      {role === "tailor" && <TailorNav />}
      {role === "seller" && <SellerNav />}
    </div>
  );
}