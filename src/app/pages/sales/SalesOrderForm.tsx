import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { DashboardLayout } from '../admin/DashboardLayout';
import { mockOrders, mockMaterials } from '../../mockData';
import { OrderItem } from '../../types';

export function SalesOrderForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    invoiceNumber: `INV-2026-${String(mockOrders.length + 1).padStart(3, '0')}`,
    customerName: '',
    customerNumber: '',
    fiscalData: '',
    date: new Date().toISOString().slice(0, 16),
    deliveryAddress: '',
    notes: '',
  });

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const addOrderItem = () => {
    const newItem: OrderItem = {
      id: String(orderItems.length + 1),
      materialId: '',
      materialName: '',
      quantity: 0,
      unitPrice: 0,
      totalPrice: 0,
    };
    setOrderItems([...orderItems, newItem]);
  };

  const removeOrderItem = (itemId: string) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId));
  };

  const updateOrderItem = (itemId: string, field: keyof OrderItem, value: any) => {
    setOrderItems(orderItems.map(item => {
      if (item.id !== itemId) return item;

      const updatedItem = { ...item, [field]: value };

      // If material changed, update material name and unit price
      if (field === 'materialId') {
        const material = mockMaterials.find(m => m.id === value);
        if (material) {
          updatedItem.materialName = material.descripcionMaterial;
          updatedItem.unitPrice = material.precioUnitario;
        }
      }

      // Recalculate total price
      if (field === 'quantity' || field === 'materialId') {
        updatedItem.totalPrice = updatedItem.quantity * updatedItem.unitPrice;
      }

      return updatedItem;
    }));
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (orderItems.length === 0) {
      alert('Please add at least one item to the order');
      return;
    }

    if (orderItems.some(item => !item.materialId || item.quantity <= 0)) {
      alert('Please complete all order items with valid materials and quantities');
      return;
    }

    alert(`Order ${formData.invoiceNumber} created successfully with ${orderItems.length} item(s)! (Frontend demo)`);
    navigate('/sales/orders');
  };

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
          <h1 className="text-2xl mb-6">Create New Order</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-gray-700">
                  Invoice Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                  required
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Auto-generated consecutive number</p>
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">
                  Customer Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.customerNumber}
                  onChange={(e) => setFormData({ ...formData, customerNumber: e.target.value })}
                  placeholder="CUST-XXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Assigned by Sales staff</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-gray-700">
                  Customer Name / Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="Company Name or Full Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-gray-700">
                  Fiscal Data <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fiscalData}
                  onChange={(e) => setFormData({ ...formData, fiscalData: e.target.value })}
                  placeholder="RFC: ABC123456789"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">For manual invoice preparation by administration</p>
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">
                  Date & Time <span className="text-red-500">*</span>
                </label>
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
                <input
                  type="text"
                  value="Ordered"
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Default status for new orders</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-gray-700">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  placeholder="Street, City, State, Zip Code"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-gray-700">
                  Notes / Extra Information
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Special delivery instructions, contact information, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={4}
                />
              </div>
            </div>

            <div className="pt-6 border-t">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Order Items</h2>
                <button
                  type="button"
                  onClick={addOrderItem}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              {orderItems.length === 0 ? (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-500">No items added yet. Click "Add Item" to start.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="grid md:grid-cols-12 gap-3 items-start">
                        <div className="md:col-span-10">
                          <label className="block text-sm mb-1 text-gray-700">Material</label>
                          <select
                            value={item.materialId}
                            onChange={(e) => updateOrderItem(item.id, 'materialId', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                          >
                            <option value="">Select material...</option>
                            {mockMaterials.filter(m => m.active).map((material) => (
                              <option key={material.id} value={material.id}>
                                {material.claveMaterial} - {material.descripcionMaterial}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-1">
                          <label className="block text-sm mb-1 text-gray-700">Quantity</label>
                          <input
                            type="number"
                            value={item.quantity || ''}
                            onChange={(e) => updateOrderItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            min="1"
                            required
                          />
                        </div>
                        <div className="md:col-span-1 flex items-end">
                          <button
                            type="button"
                            onClick={() => removeOrderItem(item.id)}
                            className="w-full p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4 mx-auto" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => navigate('/sales/orders')}
                className="flex-1 px-6 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
              >
                Create Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
