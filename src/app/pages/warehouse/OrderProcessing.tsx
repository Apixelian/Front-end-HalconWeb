import { useState } from 'react';
import { Package, AlertTriangle, Eye } from 'lucide-react';
import { DashboardLayout } from '../admin/DashboardLayout';
import { mockOrders } from '../../mockData';
import { StatusBadge } from '../../components/StatusBadge';
import { Order } from '../../types';

export function OrderProcessing() {
  const [orders, setOrders] = useState(mockOrders.filter(o => !o.deleted));
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  const handleStatusChange = (orderId: string, newStatus: 'In Process' | 'In Route') => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    alert(`Order status updated to ${newStatus}! (Frontend demo)`);
  };

  const handleFlagMissing = (orderId: string) => {
    const items = prompt('Enter missing items (comma separated):');
    if (items) {
      setOrders(orders.map(o =>
        o.id === orderId ? { ...o, missingItems: items.split(',').map(i => i.trim()) } : o
      ));
      alert('Purchasing team notified! (Frontend demo)');
    }
  };

  const orderedOrders = orders.filter(o => o.status === 'Ordered');
  const inProcessOrders = orders.filter(o => o.status === 'In Process');

  return (
    <DashboardLayout>
      <div className="max-w-7xl space-y-6">
        <h1 className="text-2xl">Order Processing</h1>

        <div>
          <h2 className="text-lg mb-4">New Orders (Ordered)</h2>
          {orderedOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              No new orders
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">Invoice</th>
                    <th className="px-4 py-3 text-left text-sm">Customer</th>
                    <th className="px-4 py-3 text-left text-sm">Items</th>
                    <th className="px-4 py-3 text-left text-sm">Status</th>
                    <th className="px-4 py-3 text-left text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orderedOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{order.invoiceNumber}</td>
                      <td className="px-4 py-3 text-sm">{order.customerName}</td>
                      <td className="px-4 py-3 text-sm">{order.items.length} item(s)</td>
                      <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setViewingOrder(order)}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                          >
                            <Eye className="w-3 h-3" />
                            View
                          </button>
                          <button
                            onClick={() => handleStatusChange(order.id, 'In Process')}
                            className="px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
                          >
                            Start
                          </button>
                          <button
                            onClick={() => handleFlagMissing(order.id)}
                            className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                          >
                            <AlertTriangle className="w-3 h-3" />
                            Flag
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg mb-4">In Process Orders</h2>
          {inProcessOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              No orders in process
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">Invoice</th>
                    <th className="px-4 py-3 text-left text-sm">Customer</th>
                    <th className="px-4 py-3 text-left text-sm">Status</th>
                    <th className="px-4 py-3 text-left text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inProcessOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{order.invoiceNumber}</td>
                      <td className="px-4 py-3 text-sm">{order.customerName}</td>
                      <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleStatusChange(order.id, 'In Route')}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        >
                          <Package className="w-3 h-3" />
                          Send to Route
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {viewingOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl mb-4">Order Details - {viewingOrder.invoiceNumber}</h2>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{viewingOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Delivery Address</p>
                  <p className="font-medium">{viewingOrder.deliveryAddress}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Items to Gather</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm">Material</th>
                        <th className="px-4 py-3 text-right text-sm">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewingOrder.items.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200">
                          <td className="px-4 py-3 text-sm">{item.materialName}</td>
                          <td className="px-4 py-3 text-sm text-right font-medium">{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setViewingOrder(null)}
                  className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
