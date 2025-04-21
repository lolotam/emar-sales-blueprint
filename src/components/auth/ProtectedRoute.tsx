
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/integrations/supabase/schema";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: Role[];
}

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { user, loading, reloadUser } = useAuth();
  const location = useLocation();

  // Force reload user data when entering protected routes
  useEffect(() => {
    // Always reload user data when entering a protected route
    if (!loading) {
      reloadUser();
    }
  }, [loading, reloadUser]);

  // Add debugging logs
  console.log("ProtectedRoute state:", { 
    loading, 
    user: user ? { ...user, id: "redacted" } : null,
    roles,
    path: location.pathname
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If no user, redirect to login
  if (!user) {
    console.log("No user found, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified and user doesn't have the required role
  if (roles && user.role && !roles.includes(user.role)) {
    console.log(`User role ${user.role} not in required roles [${roles.join(", ")}]`);
    
    // Redirect to the appropriate dashboard based on role
    if (user.role === "Admin") {
      console.log("Redirecting to Admin dashboard");
      return <Navigate to="/dashboard/admin" replace />;
    }
    if (user.role === "Salesman") {
      console.log("Redirecting to Salesman dashboard");
      return <Navigate to="/dashboard/salesman" replace />;
    }
    if (user.role === "Accountant") {
      console.log("Redirecting to Accountant dashboard");
      return <Navigate to="/dashboard/accountant" replace />;
    }
    if (user.role === "Warehouse") {
      console.log("Redirecting to Warehouse dashboard");
      return <Navigate to="/dashboard/warehouse" replace />;
    }
    
    // Fallback to main dashboard if role doesn't match any specific dashboard
    console.log("Role doesn't match specific dashboard, redirecting to main dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  // If we get here, user is authenticated and has required role (if specified)
  console.log("User authorized, rendering protected content");
  return <>{children}</>;
}
