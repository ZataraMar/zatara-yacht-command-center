
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SecureAuthProvider } from "@/contexts/SecureAuthContext";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { SecureProtectedRoute } from "@/components/auth/SecureProtectedRoute";
import { OfflineIndicator } from "@/components/common/OfflineIndicator";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Homepage from "./pages/public/Homepage";
import Charter from "./pages/public/Charter";
import BoatClub from "./pages/public/BoatClub";
import Sales from "./pages/public/Sales";
import Management from "./pages/public/Management";
import Guides from "./pages/public/Guides";
import TestBookingIframe from "./pages/public/TestBookingIframe";
import MallorcanSailing from "./pages/public/experiences/MallorcanSailing";
import AccessControlDemo from "./pages/AccessControlDemo";
import { ClientAuth } from "./components/client/ClientAuth";
import { CustomerPortal } from "./components/client/CustomerPortal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TranslationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SecureAuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/charter" element={<Charter />} />
            
            {/* Charter Experience Routes */}
            <Route path="/charter/experiences/mallorcan-sailing" element={<MallorcanSailing />} />
            
            <Route path="/boat-club" element={<BoatClub />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/management" element={<Management />} />
            <Route path="/guides" element={<Guides />} />
            
            {/* Hidden test page - obscure URL */}
            <Route path="/test-booking-iframe-zatara-75212" element={<TestBookingIframe />} />
            
            {/* Authentication Route */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Client Authentication & Portal Routes */}
            <Route path="/client-login" element={<ClientAuth />} />
            <Route path="/customer-portal" element={<CustomerPortal />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard/*" element={
              <SecureProtectedRoute>
                <Dashboard />
              </SecureProtectedRoute>
            } />
            
            {/* Access Control Demo - Protected by Enhanced Access Control */}
            <Route path="/demo/access-control" element={<AccessControlDemo />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <OfflineIndicator />
        </BrowserRouter>
      </SecureAuthProvider>
    </TooltipProvider>
    </TranslationProvider>
  </QueryClientProvider>
);

export default App;

