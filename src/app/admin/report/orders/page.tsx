"use client";


import { useState } from 'react';
import { 
  FileText, Users, ShoppingCart, TrendingUp, Download, 
  Calendar, Filter, BarChart3, PieChart, Activity,
  ArrowUpRight, ArrowDownRight, Eye, DollarSign
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Types
interface ReportCard {
  id: string;
  href: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  stats: {
    label: string;
    value: string | number;
  }[];
  buttonText: string;
}

interface MetricCard {
  label: string;
  value: string | number;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// Sample data
const salesOverview = [
  { month: 'Jan', sales: 45000, orders: 120, customers: 89 },
  { month: 'Feb', sales: 52000, orders: 145, customers: 102 },
  { month: 'Mar', sales: 48000, orders: 130, customers: 95 },
  { month: 'Apr', sales: 61000, orders: 165, customers: 118 },
  { month: 'May', sales: 55000, orders: 150, customers: 108 },
  { month: 'Jun', sales: 67000, orders: 180, customers: 135 }
];

const categoryData = [
  { name: 'Electronics', value: 45, color: '#8b5cf6' },
  { name: 'Accessories', value: 30, color: '#ec4899' },
  { name: 'Clothing', value: 15, color: '#3b82f6' },
  { name: 'Others', value: 10, color: '#10b981' }
];

const topProducts = [
  { name: 'Premium Headphones', revenue: 124000, units: 1240 },
  { name: 'Wireless Mouse', revenue: 49000, units: 980 },
  { name: 'Keyboard', revenue: 113400, units: 756 },
  { name: 'USB-C Hub', revenue: 32500, units: 650 }
];

const ReportPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('6M');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const metrics: MetricCard[] = [
    {
      label: 'Total Revenue',
      value: '₦2,450,300',
      change: 15.3,
      icon: DollarSign,
      color: 'bg-green-100 text-green-700'
    },
    {
      label: 'Total Orders',
      value: '1,500',
      change: 8.2,
      icon: ShoppingCart,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      label: 'Total Customers',
      value: '800',
      change: 12.5,
      icon: Users,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      label: 'Avg Order Value',
      value: '₦163,353',
      change: -2.4,
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-700'
    }
  ];

  const reportCards: ReportCard[] = [

    {
      id: 'sales',
      href: '/admin/report/sales',
      title: 'Sales Report',
      description: 'Comprehensive sales analytics with revenue trends, top products, and performance metrics',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-white',
      stats: [
        { label: 'Total Sales', value: '₦2.45M' },
        { label: 'Growth', value: '+15.3%' },
        { label: 'Orders', value: '1,500' }
      ],
      buttonText: 'View Sales Report'
    },
    {
      id: 'orders',
      href: '/admin/report/orders',
      title: 'Order Report',
      description: 'Detailed order insights including status distribution, fulfillment rates, and delivery metrics',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-white',
      stats: [
        { label: 'Completed', value: '1,245' },
        { label: 'Pending', value: '125' },
        { label: 'Cancelled', value: '45' }
      ],
      buttonText: 'View Order Report'
    },
    {
      id: 'customers',
      href: '/admin/report/customers',
      title: 'Customer Report',
      description: 'Customer behavior analysis with lifetime value, retention rates, and demographic insights',
      icon: Users,
      color: 'text-pink-600',
      bgColor: 'bg-gradient-to-br from-pink-50 to-white',
      stats: [
        { label: 'Active', value: '800' },
        { label: 'New', value: '156' },
        { label: 'Retention', value: '87%' }
      ],
      buttonText: 'View Customer Report'
    }
  ];

  return (
    <div className='bg-gradient-to-t from-blue-100 via-white to-purple-200 min-h-screen w-full mt-4 p-3 rounded-lg shadow-md'>
      <section className='bg-white min-h-screen rounded-lg shadow-md p-5'>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports</h1>
          <p className="text-gray-600 text-sm">Generate and view comprehensive business reports</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => {
            const MetricIcon = metric.icon;
            const isPositive = metric.change >= 0;
            return (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-5 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-3 rounded-lg ${metric.color}`}>
                    <MetricIcon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                    isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(metric.change)}%
                  </div>
                </div>
                <h3 className="text-sm text-gray-600 mb-1">{metric.label}</h3>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
            );
          })}
        </div>

        {/* Report Cards */}
        {/* <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Available Reports</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Last 6 Months
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {reportCards.map((report) => {
              const ReportIcon = report.icon;
              return (
                <a key={report.id} href={report.href} className={`${report.bgColor} rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 block`}>
                  <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${report.color} bg-white shadow-sm`}>
                    <ReportIcon className="w-7 h-7" />
                  </div>
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    <Eye className="w-5 h-5 text-gray-400" />
                  </button>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{report.title}</h3>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">{report.description}</p>

                  <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-gray-200">
                  {report.stats.map((stat, idx) => (
                    <div key={idx}>
                    <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                    </div>
                  ))}
                  </div>

                  <button 
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    report.id === 'sales' ? 'bg-purple-600 hover:bg-purple-700 text-white' :
                    report.id === 'orders' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                    'bg-pink-600 hover:bg-pink-700 text-white'
                  }`}
                  >
                  {report.buttonText}
                  <ArrowUpRight className="w-4 h-4" />
                  </button>
                </a>
              );
            })}
          </div>
        </div> */}

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Trend */}
          <div className="lg:col-span-2 bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Report Performance</h2>
                <p className="text-sm text-gray-500 mt-1">Report trends over time</p>
              </div>
              <div className="flex gap-2">
                {['1M', '3M', '6M', '1Y'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      selectedPeriod === period
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={salesOverview}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  fill="url(#colorSales)" 
                  name="Sales (₦)"
                />
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="url(#colorOrders)" 
                  name="Orders"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Category Split</h2>
            <ResponsiveContainer width="100%" height={200}>
              <RePieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RePieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-3">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{category.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Top Performing Products</h2>
              <p className="text-sm text-gray-500 mt-1">Highest revenue generators</p>
            </div>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              View Details
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{product.name}</h4>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Revenue</span>
                    <span className="font-bold text-gray-900">₦{product.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Units Sold</span>
                    <span className="font-semibold text-purple-600">{product.units}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-purple-200 transition-all">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Generate Custom Report</div>
                <div className="text-xs text-gray-500">Create tailored analytics</div>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Schedule Reports</div>
                <div className="text-xs text-gray-500">Automate report delivery</div>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-green-200 transition-all">
              <div className="p-2 bg-green-100 rounded-lg">
                <Download className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Export Data</div>
                <div className="text-xs text-gray-500">Download in CSV/PDF</div>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReportPage;