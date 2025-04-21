
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();
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
        <p>Role-based dashboards/content goes here.</p>
        {/* You can further expand dashboards for each role here */}
      </div>
    </div>
  );
}
