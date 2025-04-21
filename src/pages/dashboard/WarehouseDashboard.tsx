
import { useAuth } from "@/hooks/useAuth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Warehouse, Package, TrendingUp, AlertTriangle, 
  Truck, ArrowDownUp, FileText, BarChart 
} from "lucide-react";

export default function WarehouseDashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-start justify-between mb-6 gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Warehouse Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || user?.email}</p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          Warehouse Access
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard 
          title="Total Stock Items" 
          value="1,245" 
          description="Unique products"
          icon={<Package className="h-5 w-5 text-blue-600" />}
        />
        <DashboardCard 
          title="Low Stock Items" 
          value="18" 
          description="Below threshold"
          icon={<AlertTriangle className="h-5 w-5 text-amber-600" />}
        />
        <DashboardCard 
          title="This Month" 
          value="157" 
          description="Product movements"
          icon={<ArrowDownUp className="h-5 w-5 text-green-600" />}
        />
        <DashboardCard 
          title="Warehouse Value" 
          value="$289,450" 
          description="Total inventory value"
          icon={<TrendingUp className="h-5 w-5 text-purple-600" />}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Inventory Movements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium">Date</th>
                    <th className="text-left py-3 px-2 font-medium">Product</th>
                    <th className="text-left py-3 px-2 font-medium">Type</th>
                    <th className="text-right py-3 px-2 font-medium">Quantity</th>
                    <th className="text-left py-3 px-2 font-medium">Reference</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">2025-04-21</td>
                    <td className="py-3 px-2">Wireless Keyboard</td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Outbound
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">12</td>
                    <td className="py-3 px-2">INV-001</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">2025-04-21</td>
                    <td className="py-3 px-2">USB-C Cable</td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Inbound
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">50</td>
                    <td className="py-3 px-2">PO-028</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">2025-04-20</td>
                    <td className="py-3 px-2">Laptop Stand</td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Outbound
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">5</td>
                    <td className="py-3 px-2">INV-003</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">2025-04-19</td>
                    <td className="py-3 px-2">External SSD</td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Transfer
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">8</td>
                    <td className="py-3 px-2">TRN-014</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button className="text-sm text-blue-600 hover:underline flex items-center">
                <FileText className="h-4 w-4 mr-1" /> View all movements
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Wireless Mouse", stock: 5, min: 10, percentage: 50 },
                { name: "Laptop Charger", stock: 3, min: 15, percentage: 20 },
                { name: "HDMI Cable", stock: 4, min: 10, percentage: 40 },
                { name: "Printer Ink", stock: 2, min: 10, percentage: 20 },
              ].map((item, index) => (
                <div key={index} className="border-b pb-3">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-red-600 text-sm font-medium">{item.stock}/{item.min}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-4 w-full py-2 bg-red-50 text-red-700 rounded-md flex items-center justify-center hover:bg-red-100">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Generate Reorder List
            </button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <QuickAccessCard title="Stock Movement" icon={<ArrowDownUp className="h-5 w-5" />} color="bg-blue-100 text-blue-700" />
          <QuickAccessCard title="Stock Count" icon={<Package className="h-5 w-5" />} color="bg-green-100 text-green-700" />
          <QuickAccessCard title="Stock Reports" icon={<BarChart className="h-5 w-5" />} color="bg-amber-100 text-amber-700" />
          <QuickAccessCard title="Shipping" icon={<Truck className="h-5 w-5" />} color="bg-purple-100 text-purple-700" />
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
