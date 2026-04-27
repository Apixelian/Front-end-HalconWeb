import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { DashboardLayout } from './DashboardLayout';
import { mockMaterials } from '../../mockData';
import { Material } from '../../types';

export function MaterialsManagement() {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [showModal, setShowModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [formData, setFormData] = useState({
    claveMaterial: '' as string | number,
    descripcionMaterial: '',
    precioUnitario: '' as string | number,
    cantidadMaterial: '' as string | number,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const clave = parseInt(String(formData.claveMaterial));
    const precio = parseFloat(String(formData.precioUnitario));
    const cantidad = parseInt(String(formData.cantidadMaterial));

    if (isNaN(clave) || isNaN(precio) || isNaN(cantidad)) {
      alert('Please enter valid numbers');
      return;
    }

    if (precio < 0 || cantidad < 0) {
      alert('Price and quantity must be positive numbers');
      return;
    }

    // Check for duplicate claveMaterial
    if (!editingMaterial && materials.some(m => m.claveMaterial === clave)) {
      alert('Material key already exists. Please use a unique key.');
      return;
    }

    if (editingMaterial && materials.some(m => m.id !== editingMaterial.id && m.claveMaterial === clave)) {
      alert('Material key already exists. Please use a unique key.');
      return;
    }

    if (editingMaterial) {
      setMaterials(
        materials.map((m) =>
          m.id === editingMaterial.id
            ? {
                ...m,
                claveMaterial: clave,
                descripcionMaterial: formData.descripcionMaterial,
                precioUnitario: precio,
                cantidadMaterial: cantidad,
              }
            : m
        )
      );
    } else {
      const newMaterial: Material = {
        id: String(materials.length + 1),
        claveMaterial: clave,
        descripcionMaterial: formData.descripcionMaterial,
        precioUnitario: precio,
        cantidadMaterial: cantidad,
        active: true,
      };
      setMaterials([...materials, newMaterial]);
    }
    handleCloseModal();
    alert(`Material ${editingMaterial ? 'updated' : 'created'} successfully! (Frontend demo)`);
  };

  const handleEdit = (material: Material) => {
    setEditingMaterial(material);
    setFormData({
      claveMaterial: material.claveMaterial,
      descripcionMaterial: material.descripcionMaterial,
      precioUnitario: material.precioUnitario,
      cantidadMaterial: material.cantidadMaterial,
    });
    setShowModal(true);
  };

  const handleDelete = (materialId: string) => {
    if (confirm('Are you sure you want to delete this material?')) {
      setMaterials(materials.filter((m) => m.id !== materialId));
      alert('Material deleted successfully! (Frontend demo)');
    }
  };

  const handleToggleActive = (materialId: string) => {
    setMaterials(
      materials.map((m) =>
        m.id === materialId ? { ...m, active: !m.active } : m
      )
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMaterial(null);
    setFormData({
      claveMaterial: '',
      descripcionMaterial: '',
      precioUnitario: '',
      cantidadMaterial: '',
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl">Materials Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Material
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm">Material Key</th>
                  <th className="px-4 py-3 text-left text-sm">Description</th>
                  <th className="px-4 py-3 text-left text-sm">Unit Price</th>
                  <th className="px-4 py-3 text-left text-sm">Quantity</th>
                  <th className="px-4 py-3 text-left text-sm">Status</th>
                  <th className="px-4 py-3 text-left text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No materials found
                    </td>
                  </tr>
                ) : (
                  materials.map((material) => (
                    <tr key={material.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-mono">{material.claveMaterial}</td>
                      <td className="px-4 py-3 text-sm">{material.descripcionMaterial}</td>
                      <td className="px-4 py-3 text-sm">${material.precioUnitario.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm">{material.cantidadMaterial}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggleActive(material.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            material.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {material.active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(material)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(material.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl mb-4">
              {editingMaterial ? 'Edit Material' : 'New Material'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-gray-700">
                  Material Key (Integer) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.claveMaterial}
                  onChange={(e) =>
                    setFormData({ ...formData, claveMaterial: e.target.value })
                  }
                  placeholder="1001"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Must be unique</p>
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.descripcionMaterial}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcionMaterial: e.target.value })
                  }
                  placeholder="Cemento Portland 50kg"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-700">
                  Unit Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.precioUnitario}
                  onChange={(e) =>
                    setFormData({ ...formData, precioUnitario: e.target.value })
                  }
                  placeholder="185.50"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-700">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.cantidadMaterial}
                  onChange={(e) =>
                    setFormData({ ...formData, cantidadMaterial: e.target.value })
                  }
                  placeholder="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  min="0"
                />
              </div>
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
                  {editingMaterial ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
