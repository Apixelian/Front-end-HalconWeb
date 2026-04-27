import { useState } from 'react';
import { RotateCcw, Edit2 } from 'lucide-react';
import { DashboardLayout } from './DashboardLayout';
import { mockOrders } from '../../mockData';
import { Order } from '../../types';
import { StatusBadge } from '../../components/StatusBadge';

export function DeletedOrders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders.filter(o => o.deleted));

  const handleRestore = (orderId: string) => {
    if (confirm('Are you sure you want to restore this order?')) {
      setOrders(orders.filter(o => o.id !== orderId));
      alert('Order restored successfully. It will now appear in the Orders list.');
    }
  };

  const handleEdit = (order: Order) => {
    alert(`Edit functionality would open a modal to edit order ${order.invoiceNumber}. For the full demo, use the Orders page.`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl mb-2">Deleted Orders</h1>
          <p className="text-gray-600">
            Orders that have been logically deleted. You can restore or edit them here.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500">No deleted orders found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">Invoice</th>
                    <th className="px-4 py-3 text-left text-sm">Customer</th>
                    <th className="px-4 py-3 text-left text-sm">Date</th>
                    <th className="px-4 py-3 text-left text-sm">Address</th>
                    <th className="px-4 py-3 text-left text-sm">Status</th>
                    <th className="px-4 py-3 text-left text-sm">Notes</th>
                    <th className="px-4 py-3 text-left text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
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
                      <td className="px-4 py-3 text-sm max-w-xs truncate">
                        {order.notes}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleEdit(order)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRestore(order.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded"
                            title="Restore"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
