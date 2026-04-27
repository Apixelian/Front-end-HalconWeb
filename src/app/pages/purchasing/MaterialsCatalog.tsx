import { useState } from 'react';
import { CheckCircle, XCircle, Search } from 'lucide-react';
import { DashboardLayout } from '../admin/DashboardLayout';
import { mockMaterials } from '../../mockData';

export function MaterialsCatalog() {
  const [materials] = useState(mockMaterials);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMaterials = materials.filter(m =>
    m.claveMaterial.toString().includes(searchTerm) ||
    m.descripcionMaterial.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl mb-2">Materials Catalog</h1>
          <p className="text-gray-600">View materials catalog (read-only)</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by material key or description..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm">Material Key</th>
                  <th className="px-4 py-3 text-left text-sm">Description</th>
                  <th className="px-4 py-3 text-left text-sm">Unit Price</th>
                  <th className="px-4 py-3 text-left text-sm">Current Quantity</th>
                  <th className="px-4 py-3 text-left text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.map((material) => (
                  <tr key={material.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-sm">{material.claveMaterial}</td>
                    <td className="px-4 py-3 text-sm">{material.descripcionMaterial}</td>
                    <td className="px-4 py-3 text-sm">${material.precioUnitario.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm">{material.cantidadMaterial}</td>
                    <td className="px-4 py-3">
                      {material.active ? (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
