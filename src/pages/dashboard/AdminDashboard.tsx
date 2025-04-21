
import { useAuth } from "@/hooks/useAuth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Users, Package, FileText, BarChart, ShieldCheck, 
  TrendingUp, Truck, CreditCard 
} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-start justify-between mb-6 gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || user?.email}</p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          Admin Access
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard 
          title="Users" 
          value="4" 
          description="Total system users"
          icon={<Users className="h-5 w-5 text-blue-600" />}
        />
        <DashboardCard 
          title="Products" 
          value="158" 
          description="Total products"
          icon={<Package className="h-5 w-5 text-green-600" />}
        />
        <DashboardCard 
          title="Invoices" 
          value="27" 
          description="This month"
          icon={<FileText className="h-5 w-5 text-amber-600" />}
        />
        <DashboardCard 
          title="Revenue" 
          value="$9,458" 
          description="Monthly revenue"
          icon={<BarChart className="h-5 w-5 text-purple-600" />}
        />
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-l-4 border-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-blue-500" />
              System Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Manage user roles and system settings</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-blue-600 hover:underline cursor-pointer">User Roles</li>
              <li className="flex items-center text-blue-600 hover:underline cursor-pointer">System Config</li>
              <li className="flex items-center text-blue-600 hover:underline cursor-pointer">Audit Logs</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              Sales Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Monitor sales performance and trends</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-blue-600 hover:underline cursor-pointer">Sales Reports</li>
              <li className="flex items-center text-blue-600 hover:underline cursor-pointer">Sales Team Performance</li>
              <li className="flex items-center text-blue-600 hover:underline cursor-pointer">Customer Analysis</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-amber-500" />
              Financial Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Track financial performance</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-blue-600 hover:underline cursor-pointer">Financial Reports</li>
              <li className="flex items-center text-blue-600 hover:underline cursor-pointer">Budget Management</li>
              <li className="flex items-center text-blue-600 hover:underline cursor-pointer">Expense Tracking</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <QuickAccessCard title="Customers" icon={<Users className="h-5 w-5" />} color="bg-blue-100 text-blue-700" />
          <QuickAccessCard title="Products" icon={<Package className="h-5 w-5" />} color="bg-green-100 text-green-700" />
          <QuickAccessCard title="Invoicing" icon={<FileText className="h-5 w-5" />} color="bg-amber-100 text-amber-700" />
          <QuickAccessCard title="Inventory" icon={<Truck className="h-5 w-5" />} color="bg-purple-100 text-purple-700" />
        </div>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function DashboardCard({ title, value, description, icon }: DashboardCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          <div className="p-2 bg-gray-50 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface QuickAccessCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
}

function QuickAccessCard({ title, icon, color }: QuickAccessCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4 flex items-center">
        <div className={`p-2 rounded-full mr-3 ${color}`}>
          {icon}
        </div>
        <p className="font-medium">{title}</p>
      </CardContent>
    </Card>
  );
}
