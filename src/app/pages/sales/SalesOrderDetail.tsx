import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Calendar, MapPin, FileText } from 'lucide-react';
import { DashboardLayout } from '../admin/DashboardLayout';
import { mockOrders } from '../../mockData';
import { StatusBadge } from '../../components/StatusBadge';

export function SalesOrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = mockOrders.find(o => o.id === orderId && !o.deleted);

  const handleEdit = () => {
    alert(`Edit functionality would allow modifying order ${order?.invoiceNumber}. (Frontend demo)`);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this order? It will be moved to Deleted Orders.')) {
      alert(`Order ${order?.invoiceNumber} deleted successfully! (Frontend demo)`);
      navigate('/sales/orders');
    }
  };

  if (!order) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">Order not found</p>
            <button
              onClick={() => navigate('/sales/orders')}
              className="text-orange-600 hover:text-orange-700"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <button
          onClick={() => navigate('/sales/orders')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Orders
        </button>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl mb-1">Order Details</h1>
              <p className="text-gray-500">Invoice: {order.invoiceNumber}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>

          <div className="mb-6">
            <StatusBadge status={order.status} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Customer Name</label>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Customer Number</label>
                <p className="font-medium">{order.customerNumber}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Fiscal Data</label>
                <p className="font-medium">{order.fiscalData}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <label className="text-sm text-gray-500">Order Date & Time</label>
                  <p className="font-medium">
                    {new Date(order.date).toLocaleString('es-MX')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <label className="text-sm text-gray-500">Delivery Address</label>
                  <p className="font-medium">{order.deliveryAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <label className="text-sm text-gray-500">Notes</label>
                  <p className="font-medium">{order.notes}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h2 className="text-lg mb-4">Order Items</h2>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">Material</th>
                    <th className="px-4 py-3 text-right text-sm">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="px-4 py-3 text-sm">{item.materialName}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h2 className="text-lg mb-4">Order Progress</h2>
            <div className="flex items-center justify-between relative">
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10" />
              {['Ordered', 'In Process', 'In Route', 'Delivered'].map((status, idx) => {
                const isCurrentStep = status === order.status;

                return (
                  <div key={status} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        isCurrentStep
                          ? 'bg-orange-600 border-orange-600 text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <p className={`text-xs mt-2 text-center max-w-[80px] ${isCurrentStep ? 'font-semibold text-orange-600' : 'text-gray-600'}`}>{status}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {order.missingItems && order.missingItems.length > 0 && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
              <h3 className="font-medium text-red-800 mb-2">Missing Items Flagged by Warehouse</h3>
              <ul className="list-disc list-inside text-sm text-red-700">
                {order.missingItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
