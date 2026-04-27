import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Eye } from 'lucide-react';
import { DashboardLayout } from '../admin/DashboardLayout';
import { mockOrders } from '../../mockData';
import { Order, OrderStatus } from '../../types';
import { StatusBadge } from '../../components/StatusBadge';

export function SalesOrderList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(mockOrders.filter(o => !o.deleted));
  const [filters, setFilters] = useState({
    invoiceNumber: '',
    customerNumber: '',
    date: '',
    status: '' as OrderStatus | '',
  });

  const filteredOrders = orders.filter((order) => {
    if (filters.invoiceNumber && !order.invoiceNumber.toLowerCase().includes(filters.invoiceNumber.toLowerCase())) return false;
    if (filters.customerNumber && !order.customerNumber.toLowerCase().includes(filters.customerNumber.toLowerCase())) return false;
    if (filters.date && !order.date.startsWith(filters.date)) return false;
    if (filters.status && order.status !== filters.status) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl">Sales Orders</h1>
          <button
            onClick={() => navigate('/sales/orders/new')}
            className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Order
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm mb-1 text-gray-700">Invoice Number</label>
              <input
                type="text"
                value={filters.invoiceNumber}
                onChange={(e) => setFilters({ ...filters, invoiceNumber: e.target.value })}
                placeholder="Search..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Customer Number</label>
              <input
                type="text"
                value={filters.customerNumber}
                onChange={(e) => setFilters({ ...filters, customerNumber: e.target.value })}
                placeholder="Search..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Date</label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value as OrderStatus | '' })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">All</option>
                <option value="Ordered">Ordered</option>
                <option value="In Process">In Process</option>
                <option value="In Route">In Route</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm">Invoice</th>
                  <th className="px-4 py-3 text-left text-sm">Customer</th>
                  <th className="px-4 py-3 text-left text-sm">Date</th>
                  <th className="px-4 py-3 text-left text-sm">Delivery Address</th>
                  <th className="px-4 py-3 text-left text-sm">Status</th>
                  <th className="px-4 py-3 text-left text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{order.invoiceNumber}</td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-sm">{order.customerName}</p>
                          <p className="text-xs text-gray-500">{order.customerNumber}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(order.date).toLocaleDateString('es-MX')}
                      </td>
                      <td className="px-4 py-3 text-sm max-w-xs truncate">
                        {order.deliveryAddress}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => navigate(`/sales/orders/${order.id}`)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
        </div>
      </div>
    </DashboardLayout>
  );
}
