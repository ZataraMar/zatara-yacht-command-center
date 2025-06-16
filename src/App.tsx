
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SecureAuthProvider } from "@/contexts/SecureAuthContext";
import { SecureProtectedRoute } from "@/components/auth/SecureProtectedRoute";
import { OfflineIndicator } from "@/components/common/OfflineIndicator";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Homepage from "./pages/public/Homepage";
import Charter from "./pages/public/Charter";
import BoatClub from "./pages/public/BoatClub";
import Sales from "./pages/public/Sales";
import Management from "./pages/public/Management";
import Guides from "./pages/public/Guides";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SecureAuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/charter" element={<Charter />} />
            <Route path="/boat-club" element={<BoatClub />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/management" element={<Management />} />
            <Route path="/guides" element={<Guides />} />
            
            {/* Protected Auth & Dashboard Routes */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <SecureProtectedRoute>
                <Index />
              </SecureProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <OfflineIndicator />
        </BrowserRouter>
      </SecureAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
