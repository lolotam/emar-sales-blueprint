
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function DashboardPage() {
  const { user, loading, reloadUser } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !user) {
      navigate("/login");
    } else if (user?.role) {
      // Redirect to role-specific dashboard if available
      if (user.role === 'Admin') navigate("/dashboard/admin");
      else if (user.role === 'Salesman') navigate("/dashboard/salesman");
      else if (user.role === 'Accountant') navigate("/dashboard/accountant");
      else if (user.role === 'Warehouse') navigate("/dashboard/warehouse");
    }
  }, [user, loading, navigate]);

  const handleRefreshUser = async () => {
    await reloadUser();
    toast({ title: "User data refreshed", description: "Your profile data has been updated." });
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!user) return <div className="text-center py-12">Unauthorized</div>;
  
  return (
    <div className="max-w-2xl mx-auto py-12 text-center">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <div className="text-lg mb-6">Welcome, {user.name || user.email}!</div>
      <div className="mb-4">
        <span className="font-semibold">Your role: </span>
        <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 rounded font-semibold">
          {user.role || "Unknown"}
        </span>
      </div>
      
      <div className="mt-8 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Your Dashboard</h2>
        <p className="mb-4">You will be redirected to your role-specific dashboard shortly.</p>
        <p className="mb-6">If you're not automatically redirected, please visit your dashboard using the links below:</p>
        
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          {user.role === 'Admin' && (
            <Button onClick={() => navigate("/dashboard/admin")} className="w-full">
              Admin Dashboard
            </Button>
          )}
          
          {(user.role === 'Admin' || user.role === 'Salesman') && (
            <Button onClick={() => navigate("/dashboard/salesman")} className="w-full">
              Sales Dashboard
            </Button>
          )}
          
          {(user.role === 'Admin' || user.role === 'Accountant') && (
            <Button onClick={() => navigate("/dashboard/accountant")} className="w-full">
              Accounting Dashboard
            </Button>
          )}
          
          {(user.role === 'Admin' || user.role === 'Warehouse') && (
            <Button onClick={() => navigate("/dashboard/warehouse")} className="w-full">
              Warehouse Dashboard
            </Button>
          )}
          
          <Button onClick={handleRefreshUser} variant="outline" className="mt-4">
            Refresh User Data
          </Button>
        </div>
      </div>
    </div>
  );
}
