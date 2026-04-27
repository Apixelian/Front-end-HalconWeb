import { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, FileText, Image as ImageIcon } from 'lucide-react';
import { mockOrders } from '../../mockData';
import { StatusBadge } from '../../components/StatusBadge';
import { PhotoModal } from '../../components/PhotoModal';

export function OrderStatus() {
  const { invoiceNumber } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const customerNumber = searchParams.get('customer');

  const order = mockOrders.find(
    (o) => o.invoiceNumber === invoiceNumber && !o.deleted
  );

  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; title: string } | null>(null);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-4">Order not found</p>
          <button
            onClick={() => navigate('/')}
            className="text-orange-600 hover:text-orange-700"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(`/customer/orders?customer=${customerNumber}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Orders
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl mb-1">Order Details</h1>
              <p className="text-gray-500">Invoice: {order.invoiceNumber}</p>
            </div>
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
                  <label className="text-sm text-gray-500">Date & Time</label>
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

          {(order.status === 'In Route' || order.status === 'Delivered') && (order.loadedUnitPhoto || order.deliveryEvidencePhoto) && (
            <div className="mt-8 pt-6 border-t">
              <h2 className="text-lg mb-4">
                {order.status === 'Delivered' ? 'Delivery Evidence' : 'Order Status Photos'}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {order.loadedUnitPhoto && (
                  <div
                    onClick={() =>
                      setSelectedPhoto({ url: order.loadedUnitPhoto!, title: 'Loaded Unit Photo' })
                    }
                    className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <ImageIcon className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Loaded Unit Photo</span>
                    </div>
                    <img
                      src={order.loadedUnitPhoto}
                      alt="Loaded Unit"
                      className="w-full h-40 object-cover rounded"
                    />
                    {order.loadedPhotoTimestamp && (
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(order.loadedPhotoTimestamp).toLocaleString('es-MX')}
                      </p>
                    )}
                  </div>
                )}
                {order.deliveryEvidencePhoto && (
                  <div
                    onClick={() =>
                      setSelectedPhoto({
                        url: order.deliveryEvidencePhoto!,
                        title: 'Delivery Evidence Photo',
                      })
                    }
                    className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <ImageIcon className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Delivery Evidence</span>
                    </div>
                    <img
                      src={order.deliveryEvidencePhoto}
                      alt="Delivery Evidence"
                      className="w-full h-40 object-cover rounded"
                    />
                    {order.deliveredPhotoTimestamp && (
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(order.deliveredPhotoTimestamp).toLocaleString('es-MX')}
                      </p>
                    )}
                  </div>
                )}
              </div>
              {order.status === 'In Route' && !order.deliveryEvidencePhoto && (
                <p className="text-sm text-gray-600 mt-4 italic">
                  Your order is currently in route. Delivery evidence photo will be available once delivered.
                </p>
              )}
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
    </div>
  );
}
