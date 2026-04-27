import { useState } from 'react';
import { Upload, Camera, MapPin, Eye } from 'lucide-react';
import { DashboardLayout } from '../admin/DashboardLayout';
import { mockOrders } from '../../mockData';
import { StatusBadge } from '../../components/StatusBadge';
import { PhotoModal } from '../../components/PhotoModal';
import { Order } from '../../types';

export function RouteOrders() {
  const [orders, setOrders] = useState(mockOrders.filter(o => !o.deleted));
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; title: string } | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleFileSelect = (orderId: string, type: 'loaded' | 'delivered', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, etc.)');
      return;
    }

    // Validate file size (max 20MB)
    const maxSize = 20 * 1024 * 1024; // 20MB in bytes
    if (file.size > maxSize) {
      alert(`File size must be less than 20MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`);
      return;
    }

    // For demo, use a placeholder URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const photoUrl = reader.result as string;
      const timestamp = new Date().toISOString();
      if (type === 'loaded') {
        setOrders(orders.map(o =>
          o.id === orderId ? { ...o, loadedUnitPhoto: photoUrl, loadedPhotoTimestamp: timestamp } : o
        ));
      } else {
        setOrders(orders.map(o =>
          o.id === orderId ? { ...o, deliveryEvidencePhoto: photoUrl, deliveredPhotoTimestamp: timestamp, status: 'Delivered' } : o
        ));
      }
      alert(`${type === 'loaded' ? 'Loaded unit' : 'Delivery'} photo uploaded successfully!`);
    };
    reader.readAsDataURL(file);
  };

  const inRouteOrders = orders.filter(o => o.status === 'In Route' || o.status === 'In Process');
  const deliveredOrders = orders.filter(o => o.status === 'Delivered');

  return (
    <DashboardLayout>
      <div className="max-w-7xl space-y-6">
        <h1 className="text-2xl">Route Management</h1>

        <div>
          <h2 className="text-lg mb-4">Orders In Route</h2>
          {inRouteOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              No orders in route
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {inRouteOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium">{order.invoiceNumber}</h3>
                      <p className="text-sm text-gray-600">{order.customerName}</p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="flex items-start gap-2 mb-4 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <p>{order.deliveryAddress}</p>
                  </div>
                  <div className="space-y-2">
                    <label className={`w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer ${order.loadedUnitPhoto ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <Camera className="w-4 h-4" />
                      {order.loadedUnitPhoto ? 'Loaded Photo Uploaded ✓' : 'Upload Loaded Unit Photo'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileSelect(order.id, 'loaded', e)}
                        disabled={!!order.loadedUnitPhoto}
                      />
                    </label>
                    {order.loadedUnitPhoto && (
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    )}
                    <label className={`w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer ${!order.loadedUnitPhoto || order.deliveryEvidencePhoto ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <Upload className="w-4 h-4" />
                      {order.deliveryEvidencePhoto ? 'Delivered ✓' : 'Upload Delivery Evidence'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileSelect(order.id, 'delivered', e)}
                        disabled={!order.loadedUnitPhoto || !!order.deliveryEvidencePhoto}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg mb-4">Completed Deliveries</h2>
          {deliveredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              No completed deliveries
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">Invoice</th>
                    <th className="px-4 py-3 text-left text-sm">Customer</th>
                    <th className="px-4 py-3 text-left text-sm">Status</th>
                    <th className="px-4 py-3 text-left text-sm">Photos</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{order.invoiceNumber}</td>
                      <td className="px-4 py-3 text-sm">{order.customerName}</td>
                      <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {order.loadedUnitPhoto && (
                            <button
                              onClick={() => setSelectedPhoto({ url: order.loadedUnitPhoto!, title: 'Loaded Unit' })}
                              className="text-blue-600 text-sm hover:underline"
                            >
                              Loaded
                            </button>
                          )}
                          {order.deliveryEvidencePhoto && (
                            <button
                              onClick={() => setSelectedPhoto({ url: order.deliveryEvidencePhoto!, title: 'Delivered' })}
                              className="text-green-600 text-sm hover:underline"
                            >
                              Delivered
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedPhoto && (
        <PhotoModal
          imageUrl={selectedPhoto.url}
          title={selectedPhoto.title}
          onClose={() => setSelectedPhoto(null)}
        />
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{selectedOrder.invoiceNumber}</h2>
                <p className="text-sm text-gray-600">{selectedOrder.customerName}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <StatusBadge status={selectedOrder.status} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Customer Number</label>
                  <p className="font-medium">{selectedOrder.customerNumber}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Date</label>
                  <p className="font-medium">{new Date(selectedOrder.date).toLocaleString('es-MX')}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-500">Delivery Address</label>
                  <p className="font-medium">{selectedOrder.deliveryAddress}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-500">Notes</label>
                  <p className="font-medium">{selectedOrder.notes}</p>
                </div>
              </div>
              {selectedOrder.loadedUnitPhoto && (
                <div>
                  <h3 className="font-medium mb-2">Loaded Unit Photo</h3>
                  <img src={selectedOrder.loadedUnitPhoto} alt="Loaded Unit" className="w-full rounded-lg" />
                  {selectedOrder.loadedPhotoTimestamp && (
                    <p className="text-sm text-gray-500 mt-2">
                      Uploaded: {new Date(selectedOrder.loadedPhotoTimestamp).toLocaleString('es-MX')}
                    </p>
                  )}
                </div>
              )}
              {selectedOrder.deliveryEvidencePhoto && (
                <div>
                  <h3 className="font-medium mb-2">Delivery Evidence Photo</h3>
                  <img src={selectedOrder.deliveryEvidencePhoto} alt="Delivery Evidence" className="w-full rounded-lg" />
                  {selectedOrder.deliveredPhotoTimestamp && (
                    <p className="text-sm text-gray-500 mt-2">
                      Delivered: {new Date(selectedOrder.deliveredPhotoTimestamp).toLocaleString('es-MX')}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
