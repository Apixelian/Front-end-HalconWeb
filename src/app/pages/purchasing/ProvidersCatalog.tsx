import { useState } from 'react';
import { Phone, Mail, CheckCircle, XCircle } from 'lucide-react';
import { DashboardLayout } from '../admin/DashboardLayout';
import { mockProviders } from '../../mockData';

export function ProvidersCatalog() {
  const [providers] = useState(mockProviders);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProviders = providers.filter(p =>
    p.nombreProveedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.telefono.includes(searchTerm) ||
    p.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl mb-2">Providers Catalog</h1>
          <p className="text-gray-600">View provider contact information for purchase requests</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, phone, or email..."
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProviders.map((provider) => (
            <div key={provider.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-lg">{provider.nombreProveedor}</h3>
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
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{provider.telefono}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{provider.correo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
            No providers found
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
