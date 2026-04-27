import { DashboardLayout } from './DashboardLayout';
import { mockOrders, mockUsers, mockProviders } from '../../mockData';
import { Users, Package, Trash2, Building2 } from 'lucide-react';

export function AdminDashboard() {
  const activeOrders = mockOrders.filter(o => !o.deleted).length;
  const deletedOrders = mockOrders.filter(o => o.deleted).length;
  const totalUsers = mockUsers.length;
  const activeProviders = mockProviders.filter(p => p.activo).length;

  const stats = [
    { label: 'Total Users', value: totalUsers, icon: Users, color: 'bg-blue-500' },
    { label: 'Active Orders', value: activeOrders, icon: Package, color: 'bg-green-500' },
    { label: 'Deleted Orders', value: deletedOrders, icon: Trash2, color: 'bg-red-500' },
    { label: 'Active Providers', value: activeProviders, icon: Building2, color: 'bg-orange-500' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl">
        <h1 className="text-2xl mb-6">Admin Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} text-white p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => window.location.href = '/admin/users'}
              className="p-4 border border-gray-300 rounded hover:bg-gray-50 text-left"
            >
              <Users className="w-6 h-6 mb-2 text-blue-600" />
              <p className="font-medium">Manage Users</p>
              <p className="text-sm text-gray-600">Add or edit user accounts</p>
            </button>
            <button
              onClick={() => window.location.href = '/admin/providers'}
              className="p-4 border border-gray-300 rounded hover:bg-gray-50 text-left"
            >
              <Building2 className="w-6 h-6 mb-2 text-orange-600" />
              <p className="font-medium">Manage Providers</p>
              <p className="text-sm text-gray-600">View and manage provider catalog</p>
            </button>
            <button
              onClick={() => window.location.href = '/admin/deleted'}
              className="p-4 border border-gray-300 rounded hover:bg-gray-50 text-left"
            >
              <Trash2 className="w-6 h-6 mb-2 text-red-600" />
              <p className="font-medium">Deleted Orders</p>
              <p className="text-sm text-gray-600">Restore or manage deleted orders</p>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
