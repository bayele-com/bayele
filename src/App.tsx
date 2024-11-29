import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Classifieds from "./pages/Classifieds";
import PostClassified from "./pages/PostClassified";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Order from "./pages/Order";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import Links from "./pages/Links";
import Earnings from "./pages/Earnings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error: any) => {
        console.error('Mutation error:', error);
      },
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <CurrencyProvider>
            <ErrorBoundary>
              <TooltipProvider>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Navigate to="/signup" replace />} />
                  <Route path="/classifieds" element={<Classifieds />} />
                  <Route path="/post-classified" element={<PostClassified />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/order/:productId" element={<Order />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/links" element={<Links />} />
                  <Route path="/earnings" element={<Earnings />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </ErrorBoundary>
          </CurrencyProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
