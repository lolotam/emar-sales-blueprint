
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "@/components/Navbar";
import SignupForm from "@/components/auth/SignupForm";
import LoginForm from "@/components/auth/LoginForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Dashboard from "@/pages/Dashboard";
import { AuthProvider } from "@/hooks/useAuth";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import SalesmanDashboard from "@/pages/dashboard/SalesmanDashboard";
import AccountantDashboard from "@/pages/dashboard/AccountantDashboard";
import WarehouseDashboard from "@/pages/dashboard/WarehouseDashboard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            
            {/* Main dashboard route - handles redirects based on user role */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Role-specific dashboard routes */}
            <Route path="/dashboard/admin" element={
              <ProtectedRoute roles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/salesman" element={
              <ProtectedRoute roles={["Salesman", "Admin"]}>
                <SalesmanDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/accountant" element={
              <ProtectedRoute roles={["Accountant", "Admin"]}>
                <AccountantDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/warehouse" element={
              <ProtectedRoute roles={["Warehouse", "Admin"]}>
                <WarehouseDashboard />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
