import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ShoppingCart, Bell } from 'lucide-react';
import { DashboardLayout } from '../admin/DashboardLayout';
import { mockStockAlerts, mockMaterials } from '../../mockData';

export function StockAlerts() {
  const navigate = useNavigate();
  const [alerts] = useState(mockStockAlerts);

  const getMaterialById = (id: string) => {
    return mockMaterials.find(m => m.id === id);
  };

  const getAlertLevel = (stock: number, min: number) => {
    if (stock === 0) return 'critical';
    if (stock < min) return 'low';
    return 'ok';
  };

  const handleCreatePurchase = (materialId: string) => {
    navigate(`/purchasing/purchase/new?materialId=${materialId}`);
  };

  const handleNotifyWarehouse = (materialId: string) => {
    const material = getMaterialById(materialId);
    alert(`Warehouse notified: ${material?.descripcionMaterial} has been purchased and is ready to receive. (Frontend demo)`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl mb-2">Stock Alerts</h1>
          <p className="text-gray-600">Materials flagged as low stock or out of stock by Warehouse</p>
        </div>

        {alerts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No stock alerts at this time</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">Alert</th>
                    <th className="px-4 py-3 text-left text-sm">Material Key</th>
                    <th className="px-4 py-3 text-left text-sm">Material Name</th>
                    <th className="px-4 py-3 text-left text-sm">Current Stock</th>
                    <th className="px-4 py-3 text-left text-sm">Min Stock</th>
                    <th className="px-4 py-3 text-left text-sm">Max Stock</th>
                    <th className="px-4 py-3 text-left text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map((alert) => {
                    const material = getMaterialById(alert.materialId);
                    const level = getAlertLevel(alert.cantidadStock, alert.stockMinimo);

                    return (
                      <tr key={alert.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">
                          {level === 'critical' && (
                            <span className="flex items-center gap-1 text-red-600">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-xs font-medium">OUT OF STOCK</span>
                            </span>
                          )}
                          {level === 'low' && (
                            <span className="flex items-center gap-1 text-orange-600">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-xs font-medium">LOW STOCK</span>
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm font-mono">{material?.claveMaterial}</td>
                        <td className="px-4 py-3 text-sm">{material?.descripcionMaterial}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded text-sm font-medium ${
                              level === 'critical'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {alert.cantidadStock}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{alert.stockMinimo}</td>
                        <td className="px-4 py-3 text-sm">{alert.stockMaximo}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleCreatePurchase(alert.materialId)}
                              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                            >
                              <ShoppingCart className="w-3 h-3" />
                              Purchase
                            </button>
                            <button
                              onClick={() => handleNotifyWarehouse(alert.materialId)}
                              className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                            >
                              <Bell className="w-3 h-3" />
                              Purchased
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
