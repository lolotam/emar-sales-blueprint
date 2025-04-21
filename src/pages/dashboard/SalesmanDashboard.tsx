
import { useAuth } from "@/hooks/useAuth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Users, ShoppingCart, CreditCard, TrendingUp,
  FileText, Check, AlertTriangle
} from "lucide-react";

export default function SalesmanDashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-start justify-between mb-6 gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || user?.email}</p>
        </div>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          Salesman Access
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard 
          title="Today's Sales" 
          value="$1,245" 
          description="12 invoices"
          icon={<ShoppingCart className="h-5 w-5 text-green-600" />}
        />
        <DashboardCard 
          title="Active Customers" 
          value="28" 
          description="This week"
          icon={<Users className="h-5 w-5 text-blue-600" />}
        />
        <DashboardCard 
          title="Pending Orders" 
          value="5" 
          description="Needs processing"
          icon={<AlertTriangle className="h-5 w-5 text-amber-600" />}
        />
        <DashboardCard 
          title="Total Sales" 
          value="$8,749" 
          description="This month"
          icon={<TrendingUp className="h-5 w-5 text-purple-600" />}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium">Invoice #</th>
                    <th className="text-left py-3 px-2 font-medium">Customer</th>
                    <th className="text-left py-3 px-2 font-medium">Date</th>
                    <th className="text-right py-3 px-2 font-medium">Amount</th>
                    <th className="text-center py-3 px-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">INV-001</td>
                    <td className="py-3 px-2">Acme Corp</td>
                    <td className="py-3 px-2">April 21, 2025</td>
                    <td className="py-3 px-2 text-right">$524.00</td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Check className="h-3 w-3 mr-1" /> Paid
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">INV-002</td>
                    <td className="py-3 px-2">Widget Co.</td>
                    <td className="py-3 px-2">April 21, 2025</td>
                    <td className="py-3 px-2 text-right">$192.00</td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        <AlertTriangle className="h-3 w-3 mr-1" /> Pending
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">INV-003</td>
                    <td className="py-3 px-2">Globex Corp</td>
                    <td className="py-3 px-2">April 20, 2025</td>
                    <td className="py-3 px-2 text-right">$629.00</td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Check className="h-3 w-3 mr-1" /> Paid
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button className="text-sm text-blue-600 hover:underline flex items-center">
                <FileText className="h-4 w-4 mr-1" /> View all invoices
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <QuickActionButton 
              label="New Sale" 
              description="Create a new sales invoice" 
              icon={<ShoppingCart className="h-5 w-5" />} 
              color="bg-green-100 text-green-700" 
            />
            
            <QuickActionButton 
              label="Add Customer" 
              description="Register a new customer" 
              icon={<Users className="h-5 w-5" />} 
              color="bg-blue-100 text-blue-700" 
            />
            
            <QuickActionButton 
              label="Record Payment" 
              description="Record a customer payment" 
              icon={<CreditCard className="h-5 w-5" />} 
              color="bg-purple-100 text-purple-700" 
            />
            
            <QuickActionButton 
              label="Sales Report" 
              description="View your sales statistics" 
              icon={<TrendingUp className="h-5 w-5" />} 
              color="bg-amber-100 text-amber-700" 
            />
          </CardContent>
        </Card>
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

interface QuickActionButtonProps {
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

function QuickActionButton({ label, description, icon, color }: QuickActionButtonProps) {
  return (
    <button className="w-full p-3 border rounded-lg hover:bg-gray-50 text-left flex items-center transition-colors">
      <div className={`p-2 rounded-full mr-3 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </button>
  );
}
