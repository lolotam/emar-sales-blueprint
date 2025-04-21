
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!user) return <div className="text-center py-12">Unauthorized</div>;
  
  return (
    <div className="max-w-2xl mx-auto py-12 text-center">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <div className="text-lg mb-6">Welcome, {user.name || user.email}!</div>
      <div className="mb-4">
        <span className="font-semibold">Your role: </span>
        <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 rounded font-semibold">{user.role}</span>
      </div>
      <div className="mt-8">
        {user.role === 'Admin' && (
          <div className="p-4 bg-blue-50 rounded-lg mb-4">
            <h2 className="font-bold text-xl mb-2">Admin Dashboard</h2>
            <p>Here you can manage users, roles, and system settings.</p>
          </div>
        )}
        
        {user.role === 'Salesman' && (
          <div className="p-4 bg-green-50 rounded-lg mb-4">
            <h2 className="font-bold text-xl mb-2">Sales Dashboard</h2>
            <p>Here you can manage customers, orders, and sales reports.</p>
          </div>
        )}
        
        {user.role === 'Accountant' && (
          <div className="p-4 bg-yellow-50 rounded-lg mb-4">
            <h2 className="font-bold text-xl mb-2">Accounting Dashboard</h2>
            <p>Here you can manage invoices, payments, and financial reports.</p>
          </div>
        )}
        
        {user.role === 'Warehouse' && (
          <div className="p-4 bg-purple-50 rounded-lg mb-4">
            <h2 className="font-bold text-xl mb-2">Warehouse Dashboard</h2>
            <p>Here you can manage inventory, stock levels, and shipments.</p>
          </div>
        )}
      </div>
    </div>
  );
}
