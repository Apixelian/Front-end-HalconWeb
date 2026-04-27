import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Upload, Image as ImageIcon, Eye } from 'lucide-react';
import { DashboardLayout } from './DashboardLayout';
import { mockOrders } from '../../mockData';
import { Order, OrderStatus, User } from '../../types';
import { StatusBadge } from '../../components/StatusBadge';
import { PhotoModal } from '../../components/PhotoModal';

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>(mockOrders.filter(o => !o.deleted));
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; title: string } | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  const [formData, setFormData] = useState({
    invoiceNumber: '',
    customerName: '',
    customerNumber: '',
    fiscalData: '',
    date: '',
    deliveryAddress: '',
    notes: '',
    status: 'Ordered' as OrderStatus,
    loadedUnitPhoto: '',
    deliveryEvidencePhoto: '',
  });

  useEffect(() => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOrder) {
      setOrders(orders.map(o => o.id === editingOrder.id ? { ...o, ...formData, deleted: false } : o));
    } else {
      const newOrder: Order = {
        id: String(orders.length + 1),
        ...formData,
        deleted: false,
      };
      setOrders([...orders, newOrder]);
    }
    handleCloseModal();
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setFormData({
      invoiceNumber: order.invoiceNumber,
      customerName: order.customerName,
      customerNumber: order.customerNumber,
      fiscalData: order.fiscalData,
      date: order.date,
      deliveryAddress: order.deliveryAddress,
      notes: order.notes,
      status: order.status,
      loadedUnitPhoto: order.loadedUnitPhoto || '',
      deliveryEvidencePhoto: order.deliveryEvidencePhoto || '',
    });
    setShowModal(true);
  };

  const handleDelete = (orderId: string) => {
    if (confirm('Are you sure you want to delete this order? It will be moved to Deleted Orders.')) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, deleted: true } : o).filter(o => !o.deleted));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingOrder(null);
    setFormData({
      invoiceNumber: '',
      customerName: '',
      customerNumber: '',
      fiscalData: '',
      date: '',
      deliveryAddress: '',
      notes: '',
      status: 'Ordered',
      loadedUnitPhoto: '',
      deliveryEvidencePhoto: '',
    });
  };

  const handleImageUpload = (field: 'loadedUnitPhoto' | 'deliveryEvidencePhoto') => {
    const imageUrl = prompt('Enter image URL (for demo purposes):');
    if (imageUrl) {
      setFormData({ ...formData, [field]: imageUrl });
    }
  };

  const canEditStatus = (order: Order) => {
    if (!currentUser) return false;
    if (currentUser.role === 'Admin') return true;
    if (currentUser.role === 'Route') return true;
    return false;
  };

  const canUploadPhotos = (order: Order) => {
    if (!currentUser) return false;
    return currentUser.role === 'Route' || currentUser.role === 'Admin';
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl">Order Management</h1>
          {(currentUser?.role === 'Admin' || currentUser?.role === 'Sales') && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Order
            </button>
          )}
        </div>

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
                  <th className="px-4 py-3 text-left text-sm">Photos</th>
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
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {(order.loadedUnitPhoto || order.deliveryEvidencePhoto) ? (
                          <button
                            onClick={() => setViewingOrder(order)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="View Photos"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400">No photos</span>
                        )}
                      </div>
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
                        {currentUser?.role === 'Admin' && (
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 my-8">
            <h2 className="text-xl mb-4">
              {editingOrder ? 'Edit Order' : 'New Order'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1 text-gray-700">Invoice Number</label>
                  <input
                    type="text"
                    value={formData.invoiceNumber}
                    onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    disabled={!!editingOrder}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-700">Customer Number</label>
                  <input
                    type="text"
                    value={formData.customerNumber}
                    onChange={(e) => setFormData({ ...formData, customerNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-700">Customer Name</label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-700">Fiscal Data</label>
                  <input
                    type="text"
                    value={formData.fiscalData}
                    onChange={(e) => setFormData({ ...formData, fiscalData: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="RFC: ABC123456789"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-700">Date & Time</label>
                  <input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-700">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as OrderStatus })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={editingOrder ? !canEditStatus(editingOrder) : false}
                  >
                    <option value="Ordered">Ordered</option>
                    <option value="In Process">In Process</option>
                    <option value="In Route">In Route</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">Delivery Address</label>
                <input
                  type="text"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                  required
                />
              </div>

              {(currentUser?.role === 'Route' || currentUser?.role === 'Admin') && (
                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <label className="block text-sm mb-1 text-gray-700">Loaded Unit Photo</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.loadedUnitPhoto}
                        onChange={(e) => setFormData({ ...formData, loadedUnitPhoto: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Image URL"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageUpload('loadedUnitPhoto')}
                        className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                    </div>
                    {formData.loadedUnitPhoto && (
                      <img src={formData.loadedUnitPhoto} alt="Preview" className="mt-2 w-full h-32 object-cover rounded" />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-700">Delivery Evidence Photo</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.deliveryEvidencePhoto}
                        onChange={(e) => setFormData({ ...formData, deliveryEvidencePhoto: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Image URL"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageUpload('deliveryEvidencePhoto')}
                        className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                    </div>
                    {formData.deliveryEvidencePhoto && (
                      <img src={formData.deliveryEvidencePhoto} alt="Preview" className="mt-2 w-full h-32 object-cover rounded" />
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                  {editingOrder ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedPhoto && (
        <PhotoModal
          imageUrl={selectedPhoto.url}
          title={selectedPhoto.title}
          onClose={() => setSelectedPhoto(null)}
        />
      )}

      {viewingOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setViewingOrder(null)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{viewingOrder.invoiceNumber}</h2>
                <p className="text-sm text-gray-600">{viewingOrder.customerName}</p>
              </div>
              <button onClick={() => setViewingOrder(null)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <StatusBadge status={viewingOrder.status} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Customer Number</label>
                  <p className="font-medium">{viewingOrder.customerNumber}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Date</label>
                  <p className="font-medium">{new Date(viewingOrder.date).toLocaleString('es-MX')}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-500">Delivery Address</label>
                  <p className="font-medium">{viewingOrder.deliveryAddress}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-500">Notes</label>
                  <p className="font-medium">{viewingOrder.notes}</p>
                </div>
              </div>
              {viewingOrder.loadedUnitPhoto && (
                <div>
                  <h3 className="font-medium mb-2">Loaded Unit Photo</h3>
                  <img src={viewingOrder.loadedUnitPhoto} alt="Loaded Unit" className="w-full rounded-lg" />
                  {viewingOrder.loadedPhotoTimestamp && (
                    <p className="text-sm text-gray-500 mt-2">
                      Uploaded: {new Date(viewingOrder.loadedPhotoTimestamp).toLocaleString('es-MX')}
                    </p>
                  )}
                </div>
              )}
              {viewingOrder.deliveryEvidencePhoto && (
                <div>
                  <h3 className="font-medium mb-2">Delivery Evidence Photo</h3>
                  <img src={viewingOrder.deliveryEvidencePhoto} alt="Delivery Evidence" className="w-full rounded-lg" />
                  {viewingOrder.deliveredPhotoTimestamp && (
                    <p className="text-sm text-gray-500 mt-2">
                      Delivered: {new Date(viewingOrder.deliveredPhotoTimestamp).toLocaleString('es-MX')}
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
