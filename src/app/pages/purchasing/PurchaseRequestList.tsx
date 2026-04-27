import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Package, CheckCircle, Clock } from 'lucide-react';
import { DashboardLayout } from '../admin/DashboardLayout';
import { mockPurchaseRequests, mockMaterials, mockProviders } from '../../mockData';
import { PurchaseRequest } from '../../types';

export function PurchaseRequestList() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<PurchaseRequest[]>(mockPurchaseRequests);
  const [filters, setFilters] = useState({
    status: '' as 'Pending' | 'Purchased' | '',
    materialId: '',
  });

  const getMaterialById = (id: string) => {
    return mockMaterials.find(m => m.id === id);
  };

  const getProviderById = (id: string) => {
    return mockProviders.find(p => p.id === id);
  };

  const filteredRequests = requests.filter((request) => {
    if (filters.status && request.status !== filters.status) return false;
    if (filters.materialId && request.materialId !== filters.materialId) return false;
    return true;
  });

  const handleMarkPurchased = (requestId: string) => {
    setRequests(requests.map(r => r.id === requestId ? { ...r, status: 'Purchased' } : r));
    alert(`Purchase request marked as Purchased! (Frontend demo)`);
  };

  const getStatusBadge = (status: PurchaseRequest['status']) => {
    const styles = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Purchased: 'bg-green-100 text-green-800',
    };

    const icons = {
      Pending: <Clock className="w-3 h-3" />,
      Purchased: <CheckCircle className="w-3 h-3" />,
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl">Purchase Requests</h1>
          <button
            onClick={() => navigate('/purchasing/purchase/new')}
            className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Request
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-gray-700">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Purchased">Purchased</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Material</label>
              <select
                value={filters.materialId}
                onChange={(e) => setFilters({ ...filters, materialId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">All Materials</option>
                {mockMaterials.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.claveMaterial} - {material.descripcionMaterial}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm">Request ID</th>
                  <th className="px-4 py-3 text-left text-sm">Material</th>
                  <th className="px-4 py-3 text-left text-sm">Provider</th>
                  <th className="px-4 py-3 text-left text-sm">Quantity</th>
                  <th className="px-4 py-3 text-left text-sm">Status</th>
                  <th className="px-4 py-3 text-left text-sm">Created</th>
                  <th className="px-4 py-3 text-left text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No purchase requests found
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((request) => {
                    const material = getMaterialById(request.materialId);
                    const provider = getProviderById(request.providerId);

                    return (
                      <tr key={request.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-mono">PR-{request.id.padStart(3, '0')}</td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-sm">{material?.claveMaterial}</p>
                            <p className="text-xs text-gray-500">{material?.descripcionMaterial}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm">{provider?.nombreProveedor}</p>
                            <p className="text-xs text-gray-500">{provider?.telefono}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium">{request.quantity}</td>
                        <td className="px-4 py-3">{getStatusBadge(request.status)}</td>
                        <td className="px-4 py-3 text-sm">
                          {new Date(request.createdAt).toLocaleDateString('es-MX', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            {request.status === 'Pending' && (
                              <button
                                onClick={() => handleMarkPurchased(request.id)}
                                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                              >
                                Purchased
                              </button>
                            )}
                            {request.status === 'Purchased' && (
                              <span className="text-sm text-gray-500 italic">Completed</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''}
        </div>
      </div>
    </DashboardLayout>
  );
}
