
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
    if (!loading && !user) {
      reloadUser();
    }
  }, [loading, user, reloadUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified and the user doesn't have the required role
  if (roles && user.role && !roles.includes(user.role)) {
    // Redirect to the appropriate dashboard based on role
    if (user.role === "Admin") return <Navigate to="/dashboard/admin" replace />;
    if (user.role === "Salesman") return <Navigate to="/dashboard/salesman" replace />;
    if (user.role === "Accountant") return <Navigate to="/dashboard/accountant" replace />;
    if (user.role === "Warehouse") return <Navigate to="/dashboard/warehouse" replace />;
    
    // Fallback to main dashboard if role doesn't match any specific dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
