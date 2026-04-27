import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { mockOrders } from '../../mockData';
import { StatusBadge } from '../../components/StatusBadge';
import { OrderStatus } from '../../types';

export function OrderList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const customerNumber = searchParams.get('customer') || '';

  const [filters, setFilters] = useState({
    invoiceNumber: '',
    date: '',
    status: '' as OrderStatus | '',
  });

  const filteredOrders = mockOrders.filter((order) => {
    if (order.deleted) return false;
    // Security: Only show orders for the current customer
    if (order.customerNumber !== customerNumber) return false;
    if (filters.invoiceNumber && !order.invoiceNumber.toLowerCase().includes(filters.invoiceNumber.toLowerCase())) return false;
    if (filters.date && !order.date.startsWith(filters.date)) return false;
    if (filters.status && order.status !== filters.status) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Search
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl mb-6">Order History</h1>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              Viewing orders for Customer Number: <span className="font-mono font-semibold">{customerNumber}</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
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

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm">Invoice Number</th>
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
                      <td className="px-4 py-3">{order.invoiceNumber}</td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-sm text-gray-500">{order.customerNumber}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(order.date).toLocaleDateString('es-MX')}
                      </td>
                      <td className="px-4 py-3 text-sm">{order.deliveryAddress}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() =>
                            navigate(`/customer/order/${order.invoiceNumber}?customer=${order.customerNumber}`)
                          }
                          className="text-orange-600 hover:text-orange-700 text-sm flex items-center gap-1"
                        >
                          <Search className="w-4 h-4" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </div>
  );
}
