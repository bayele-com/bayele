import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
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
import { StrictMode } from "react";

const queryClient = new QueryClient();

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Navigate to="/signup" />} />
              <Route path="/classifieds" element={<Classifieds />} />
              <Route path="/post-classified" element={<PostClassified />} />
              <Route path="/features" element={<Features />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/order/:productId" element={<Order />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster />
            <Sonner />
          </AuthProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

export default App;