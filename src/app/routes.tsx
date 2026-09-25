import { createBrowserRouter } from "react-router";
import { AppLayout } from "./components/AppLayout";
import { Onboarding } from "./pages/Onboarding";
import { Auth } from "./pages/Auth";
import { CustomerHome } from "./pages/customer/CustomerHome";
import { Discover } from "./pages/customer/Discover";
import { TailorProfile } from "./pages/customer/TailorProfile";
import { FabricProduct } from "./pages/customer/FabricProduct";
import { Booking } from "./pages/customer/Booking";
import { Projects } from "./pages/customer/Projects";
import { TailorDashboard } from "./pages/tailor/TailorDashboard";
import { Jobs } from "./pages/tailor/Jobs";
import { FabricMarketplace } from "./pages/tailor/FabricMarketplace";
import { Schedule } from "./pages/tailor/Schedule";
import { Portfolio } from "./pages/tailor/Portfolio";
import { SellerDashboard } from "./pages/seller/SellerDashboard";
import { Orders } from "./pages/seller/Orders";
import { Inventory } from "./pages/seller/Inventory";
import { ShopProfile } from "./pages/seller/ShopProfile";
import { Messages } from "./pages/Messages";
import { Profile } from "./pages/Profile";
import { MapView } from "./pages/MapView";

export const router = createBrowserRouter([
  // Public routes (no AppLayout)
  { path: "/", Component: Onboarding },
  { path: "/auth", Component: Auth },
  { path: "/auth/:type", Component: Auth },

  // App routes (with AppLayout - pathless layout route)
  {
    Component: AppLayout,
    children: [
      // Customer Routes
      { path: "/customer/home", Component: CustomerHome },
      { path: "/customer/discover", Component: Discover },
      { path: "/customer/tailor/:id", Component: TailorProfile },
      { path: "/customer/fabric/:id", Component: FabricProduct },
      { path: "/customer/booking", Component: Booking },
      { path: "/customer/projects", Component: Projects },
      { path: "/customer/map", Component: MapView },

      // Tailor Routes
      { path: "/tailor/dashboard", Component: TailorDashboard },
      { path: "/tailor/jobs", Component: Jobs },
      { path: "/tailor/marketplace", Component: FabricMarketplace },
      { path: "/tailor/schedule", Component: Schedule },
      { path: "/tailor/portfolio", Component: Portfolio },

      // Seller Routes
      { path: "/seller/dashboard", Component: SellerDashboard },
      { path: "/seller/orders", Component: Orders },
      { path: "/seller/inventory", Component: Inventory },
      { path: "/seller/shop", Component: ShopProfile },

      // Shared Routes
      { path: "/messages", Component: Messages },
      { path: "/profile", Component: Profile },
      { path: "/map", Component: MapView },
    ],
  },
]);
