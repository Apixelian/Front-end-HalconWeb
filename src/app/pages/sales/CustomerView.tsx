import { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { DashboardLayout } from '../admin/DashboardLayout';
import { mockUsers } from '../../mockData';
import { User } from '../../types';

export function CustomerView() {
  const [customers] = useState<User[]>(
    mockUsers.filter(u => u.role === 'Customer')
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingCustomer, setViewingCustomer] = useState<User | null>(null);

  const filteredCustomers = customers.filter((customer) => {
    const search = searchTerm.toLowerCase();
    return (
      customer.name.toLowerCase().includes(search) ||
      customer.email.toLowerCase().includes(search) ||
      customer.customerNumber?.toLowerCase().includes(search) ||
      customer.company?.toLowerCase().includes(search)
    );
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl mb-2">Customers</h1>
          <p className="text-gray-600">View customer information (read-only)</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, customer number, or company..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm">Customer #</th>
                  <th className="px-4 py-3 text-left text-sm">Name</th>
                  <th className="px-4 py-3 text-left text-sm">Company</th>
                  <th className="px-4 py-3 text-left text-sm">Email</th>
                  <th className="px-4 py-3 text-left text-sm">Phone</th>
                  <th className="px-4 py-3 text-left text-sm">Status</th>
                  <th className="px-4 py-3 text-left text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No customers found
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-mono">
                        {customer.customerNumber}
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-sm">{customer.name}</p>
                          <p className="text-xs text-gray-500">@{customer.username}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{customer.company || '-'}</td>
                      <td className="px-4 py-3 text-sm">{customer.email}</td>
                      <td className="px-4 py-3 text-sm">{customer.phone || '-'}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                            customer.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {customer.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setViewingCustomer(customer)}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''}
        </div>

        {/* View Modal */}
        {viewingCustomer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl mb-4">Customer Details</h2>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1 text-gray-700 font-medium">
                      Customer Number
                    </label>
                    <p className="text-sm font-mono bg-gray-50 px-3 py-2 rounded">
                      {viewingCustomer.customerNumber}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm mb-1 text-gray-700 font-medium">
                      Username
                    </label>
                    <p className="text-sm bg-gray-50 px-3 py-2 rounded">
                      {viewingCustomer.username}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm mb-1 text-gray-700 font-medium">
                      Full Name
                    </label>
                    <p className="text-sm bg-gray-50 px-3 py-2 rounded">
                      {viewingCustomer.name}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm mb-1 text-gray-700 font-medium">
                      Company
                    </label>
                    <p className="text-sm bg-gray-50 px-3 py-2 rounded">
                      {viewingCustomer.company || '-'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm mb-1 text-gray-700 font-medium">
                      Email
                    </label>
                    <p className="text-sm bg-gray-50 px-3 py-2 rounded">
                      {viewingCustomer.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm mb-1 text-gray-700 font-medium">
                      Phone
                    </label>
                    <p className="text-sm bg-gray-50 px-3 py-2 rounded">
                      {viewingCustomer.phone || '-'}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm mb-1 text-gray-700 font-medium">
                      Address
                    </label>
                    <p className="text-sm bg-gray-50 px-3 py-2 rounded">
                      {viewingCustomer.address || '-'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm mb-1 text-gray-700 font-medium">
                      Status
                    </label>
                    <p className="text-sm">
                      <span
                        className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                          viewingCustomer.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {viewingCustomer.active ? 'Active' : 'Inactive'}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <button
                    onClick={() => setViewingCustomer(null)}
                    className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
