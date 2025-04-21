
import { useAuth } from "@/hooks/useAuth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  CreditCard, FileText, ArrowUp, ArrowDown, 
  Coins, TrendingUp, BarChart, File
} from "lucide-react";

export default function AccountantDashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-start justify-between mb-6 gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accounting Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || user?.email}</p>
        </div>
        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
          Accountant Access
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard 
          title="Revenue" 
          value="$24,325" 
          description="This month"
          icon={<ArrowUp className="h-5 w-5 text-green-600" />}
        />
        <DashboardCard 
          title="Expenses" 
          value="$15,789" 
          description="This month"
          icon={<ArrowDown className="h-5 w-5 text-red-600" />}
        />
        <DashboardCard 
          title="Outstanding" 
          value="$6,240" 
          description="Customer dues"
          icon={<CreditCard className="h-5 w-5 text-amber-600" />}
        />
        <DashboardCard 
          title="Profit" 
          value="$8,536" 
          description="This month"
          icon={<Coins className="h-5 w-5 text-blue-600" />}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <FinancialItem 
                label="Total Revenue" 
                value="$24,325.00" 
                change="+12.5%" 
                isPositive={true} 
              />
              <FinancialItem 
                label="Total Expenses" 
                value="$15,789.00" 
                change="+7.2%" 
                isPositive={false} 
              />
              <FinancialItem 
                label="Gross Profit" 
                value="$8,536.00" 
                change="+14.3%" 
                isPositive={true} 
              />
              <FinancialItem 
                label="Tax Liability" 
                value="$1,962.00" 
                change="+6.8%" 
                isPositive={false} 
              />
              <FinancialItem 
                label="Net Profit" 
                value="$6,574.00" 
                change="+15.7%" 
                isPositive={true} 
              />
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">
                  Monthly Budget Usage
                </span>
                <span className="text-sm text-blue-600 font-medium">
                  68%
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "68%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <QuickAccessCard 
              title="Journal Entry" 
              icon={<FileText className="h-5 w-5" />} 
              color="bg-blue-100 text-blue-700" 
            />
            <QuickAccessCard 
              title="Financial Report" 
              icon={<BarChart className="h-5 w-5" />} 
              color="bg-green-100 text-green-700" 
            />
            <QuickAccessCard 
              title="Balance Sheet" 
              icon={<File className="h-5 w-5" />} 
              color="bg-amber-100 text-amber-700" 
            />
            <QuickAccessCard 
              title="Profit & Loss" 
              icon={<TrendingUp className="h-5 w-5" />} 
              color="bg-purple-100 text-purple-700" 
            />
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium">Date</th>
                    <th className="text-left py-3 px-2 font-medium">Description</th>
                    <th className="text-left py-3 px-2 font-medium">Reference</th>
                    <th className="text-right py-3 px-2 font-medium">Debit</th>
                    <th className="text-right py-3 px-2 font-medium">Credit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">2025-04-21</td>
                    <td className="py-3 px-2">Sales Invoice #INV-001</td>
                    <td className="py-3 px-2">Acme Corp</td>
                    <td className="py-3 px-2 text-right">$524.00</td>
                    <td className="py-3 px-2 text-right">-</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">2025-04-20</td>
                    <td className="py-3 px-2">Office Supplies</td>
                    <td className="py-3 px-2">EXP-032</td>
                    <td className="py-3 px-2 text-right">-</td>
                    <td className="py-3 px-2 text-right">$84.50</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">2025-04-20</td>
                    <td className="py-3 px-2">Utility Payment</td>
                    <td className="py-3 px-2">EXP-031</td>
                    <td className="py-3 px-2 text-right">-</td>
                    <td className="py-3 px-2 text-right">$215.75</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">2025-04-19</td>
                    <td className="py-3 px-2">Sales Invoice #INV-003</td>
                    <td className="py-3 px-2">Globex Corp</td>
                    <td className="py-3 px-2 text-right">$629.00</td>
                    <td className="py-3 px-2 text-right">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button className="text-sm text-blue-600 hover:underline flex items-center">
                <FileText className="h-4 w-4 mr-1" /> View all transactions
              </button>
            </div>
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

interface FinancialItemProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

function FinancialItem({ label, value, change, isPositive }: FinancialItemProps) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-gray-600">{label}</span>
      <div className="flex flex-col items-end">
        <span className="font-medium">{value}</span>
        <span className={`text-xs flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
          {change} vs last month
        </span>
      </div>
    </div>
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
