import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DashboardLayout } from '../admin/DashboardLayout';
import { mockMaterials, mockProviders, mockPurchaseRequests } from '../../mockData';

export function PurchaseRequestForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const materialId = searchParams.get('materialId');

  const material = materialId ? mockMaterials.find(m => m.id === materialId) : null;

  const [formData, setFormData] = useState({
    materialId: materialId || '',
    providerId: '',
    quantity: '' as string | number,
    notes: '',
  });

  useEffect(() => {
    if (materialId) {
      setFormData(prev => ({ ...prev, materialId }));
    }
  }, [materialId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Purchase request created successfully! Request ID: PR-${mockPurchaseRequests.length + 1} (Frontend demo)`);
    navigate('/purchasing/purchase-requests');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <button
          onClick={() => navigate('/purchasing/stock-alerts')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Stock Alerts
        </button>

        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl mb-6">Create Purchase Request</h1>

          {material && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-blue-900 mb-2">Material Information</h3>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-blue-700">Material Key:</span>
                  <span className="ml-2 font-mono">{material.claveMaterial}</span>
                </div>
                <div>
                  <span className="text-blue-700">Description:</span>
                  <span className="ml-2">{material.descripcionMaterial}</span>
                </div>
                <div>
                  <span className="text-blue-700">Current Stock:</span>
                  <span className="ml-2">{material.cantidadMaterial}</span>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-gray-700">
                  Material <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.materialId}
                  onChange={(e) => setFormData({ ...formData, materialId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select material...</option>
                  {mockMaterials.filter(m => m.active).map((mat) => (
                    <option key={mat.id} value={mat.id}>
                      {mat.claveMaterial} - {mat.descripcionMaterial}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-gray-700">
                  Provider <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.providerId}
                  onChange={(e) => setFormData({ ...formData, providerId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select provider...</option>
                  {mockProviders.filter(p => p.activo).map((provider) => (
                    <option key={provider.id} value={provider.id}>
                      {provider.nombreProveedor} - {provider.telefono}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="Enter quantity"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">Status</label>
                <input
                  type="text"
                  value="Pending"
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Default status for new requests</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-gray-700">
                  Notes / Additional Information
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Urgency, special requirements, delivery date, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => navigate('/purchasing/stock-alerts')}
                className="flex-1 px-6 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
              >
                Create Purchase Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
