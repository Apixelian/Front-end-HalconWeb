import { useState } from 'react';
import { AlertTriangle, Bell, Edit2 } from 'lucide-react';
import { DashboardLayout } from '../admin/DashboardLayout';
import { mockMaterials, mockStockAlerts } from '../../mockData';
import { StockAlert, Material } from '../../types';

export function StockManagement() {
  const [materials, setMaterials] = useState(mockMaterials);
  const [stockAlerts, setStockAlerts] = useState<StockAlert[]>(mockStockAlerts);

  const getMaterialStock = (materialId: string) => {
    const alert = stockAlerts.find(a => a.materialId === materialId);
    const material = materials.find(m => m.id === materialId);
    return {
      current: alert?.cantidadStock ?? material?.cantidadMaterial ?? 0,
      min: alert?.stockMinimo ?? 10,
      max: alert?.stockMaximo ?? 100,
    };
  };

  const getStockStatus = (materialId: string) => {
    const stock = getMaterialStock(materialId);
    if (stock.current === 0) return 'critical';
    if (stock.current < stock.min) return 'low';
    return 'ok';
  };

  const handleFlagLowStock = (materialId: string) => {
    const material = materials.find(m => m.id === materialId);
    const currentQty = prompt(`Enter current stock quantity for ${material?.descripcionMaterial}:`);
    const minStock = prompt('Enter minimum stock level:');
    const maxStock = prompt('Enter maximum stock level:');

    if (currentQty && minStock && maxStock) {
      const newAlert: StockAlert = {
        id: String(stockAlerts.length + 1),
        materialId,
        cantidadStock: parseInt(currentQty),
        stockMinimo: parseInt(minStock),
        stockMaximo: parseInt(maxStock),
      };
      setStockAlerts([...stockAlerts, newAlert]);
      alert('Stock alert created! Purchasing has been notified. (Frontend demo)');
    }
  };

  const isAlreadyFlagged = (materialId: string) => {
    return stockAlerts.some(a => a.materialId === materialId);
  };

  const handleUpdateStock = (materialId: string) => {
    const material = materials.find(m => m.id === materialId);
    const currentStock = getMaterialStock(materialId).current;
    const newQuantity = prompt(`Enter new stock quantity for ${material?.descripcionMaterial}:`, String(currentStock));

    if (newQuantity !== null && !isNaN(Number(newQuantity))) {
      const quantity = Math.max(0, parseInt(newQuantity));

      setMaterials(materials.map(m => {
        if (m.id === materialId) {
          return { ...m, cantidadMaterial: quantity };
        }
        return m;
      }));

      // Also update stock alert if it exists
      setStockAlerts(stockAlerts.map(alert => {
        if (alert.materialId === materialId) {
          return { ...alert, cantidadStock: quantity };
        }
        return alert;
      }));
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl mb-2">Stock Management</h1>
          <p className="text-gray-600">View current stock levels and flag shortages for Purchasing</p>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm">Status</th>
                  <th className="px-4 py-3 text-left text-sm">Material Key</th>
                  <th className="px-4 py-3 text-left text-sm">Description</th>
                  <th className="px-4 py-3 text-left text-sm">Current Stock</th>
                  <th className="px-4 py-3 text-left text-sm">Min / Max</th>
                  <th className="px-4 py-3 text-left text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.filter(m => m.active).map((material) => {
                  const status = getStockStatus(material.id);
                  const stock = getMaterialStock(material.id);
                  const flagged = isAlreadyFlagged(material.id);

                  return (
                    <tr key={material.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        {status === 'critical' && (
                          <span className="flex items-center gap-1 text-red-600">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-xs font-medium">CRITICAL</span>
                          </span>
                        )}
                        {status === 'low' && (
                          <span className="flex items-center gap-1 text-orange-600">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-xs font-medium">LOW</span>
                          </span>
                        )}
                        {status === 'ok' && (
                          <span className="text-green-600 text-xs font-medium">OK</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-sm">{material.claveMaterial}</td>
                      <td className="px-4 py-3 text-sm">{material.descripcionMaterial}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded text-sm font-medium ${
                            status === 'critical'
                              ? 'bg-red-100 text-red-800'
                              : status === 'low'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {stock.current}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {stock.min} / {stock.max}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateStock(material.id)}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                          >
                            <Edit2 className="w-3 h-3" />
                            Update Stock
                          </button>
                          {!flagged && (
                            <button
                              onClick={() => handleFlagLowStock(material.id)}
                              className="flex items-center gap-1 px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
                            >
                              <Bell className="w-3 h-3" />
                              Flag Low Stock
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
