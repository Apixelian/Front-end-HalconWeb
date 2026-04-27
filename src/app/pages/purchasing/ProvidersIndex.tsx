import { useState } from 'react';
import { Plus, Edit2, CheckCircle, XCircle } from 'lucide-react';
import { DashboardLayout } from '../admin/DashboardLayout';
import { mockProviders } from '../../mockData';
import { Provider } from '../../types';

export function ProvidersIndex() {
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  const [showModal, setShowModal] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);
  const [formData, setFormData] = useState({
    nombreProveedor: '',
    telefono: '',
    correo: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Provider ${editingProvider ? 'updated' : 'created'} successfully! (Frontend demo)`);
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (provider: Provider) => {
    setEditingProvider(provider);
    setFormData({
      nombreProveedor: provider.nombreProveedor,
      telefono: provider.telefono,
      correo: provider.correo,
    });
    setShowModal(true);
  };

  const handleToggleActive = (providerId: string) => {
    setProviders(providers.map(p =>
      p.id === providerId ? { ...p, activo: !p.activo } : p
    ));
  };

  const resetForm = () => {
    setEditingProvider(null);
    setFormData({ nombreProveedor: '', telefono: '', correo: '' });
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl">Providers</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            <Plus className="w-5 h-5" />
            New Provider
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm">Provider Name</th>
                <th className="px-4 py-3 text-left text-sm">Phone</th>
                <th className="px-4 py-3 text-left text-sm">Email</th>
                <th className="px-4 py-3 text-left text-sm">Status</th>
                <th className="px-4 py-3 text-left text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((provider) => (
                <tr key={provider.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{provider.nombreProveedor}</td>
                  <td className="px-4 py-3 text-sm">{provider.telefono}</td>
                  <td className="px-4 py-3 text-sm">{provider.correo}</td>
                  <td className="px-4 py-3">
                    {provider.activo ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-400 text-sm">
                        <XCircle className="w-4 h-4" />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(provider)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleActive(provider.id)}
                        className={`px-3 py-1 text-sm rounded ${
                          provider.activo
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {provider.activo ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl mb-4">{editingProvider ? 'Edit Provider' : 'New Provider'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-gray-700">Provider Name</label>
                <input
                  type="text"
                  value={formData.nombreProveedor}
                  onChange={(e) => setFormData({ ...formData, nombreProveedor: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.correo}
                  onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="flex-1 px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                  {editingProvider ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
