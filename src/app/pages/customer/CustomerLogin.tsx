import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export function CustomerLogin() {
  const [customerNumber, setCustomerNumber] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const navigate = useNavigate();

  const handleCheckStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (invoiceNumber && customerNumber) {
      navigate(`/customer/order/${invoiceNumber}?customer=${customerNumber}`);
    }
  };

  const handleViewAllOrders = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerNumber) {
      navigate(`/customer/orders?customer=${customerNumber}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2 text-orange-600">Halcon</h1>
          <p className="text-gray-600">Construction Materials</p>
        </div>

        <form onSubmit={handleCheckStatus} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-700">
              Customer Number
            </label>
            <input
              type="text"
              value={customerNumber}
              onChange={(e) => setCustomerNumber(e.target.value)}
              placeholder="CUST-001"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700">
              Invoice Number
            </label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="INV-2026-001"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-orange-600 text-white py-3 rounded hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Check Status
            </button>
            <button
              type="button"
              onClick={handleViewAllOrders}
              className="flex-1 bg-gray-600 text-white py-3 rounded hover:bg-gray-700 transition-colors"
            >
              View All Orders
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t text-center">
          <a
            href="/admin"
            className="text-sm text-orange-600 hover:text-orange-700"
          >
            Staff Login →
          </a>
        </div>
      </div>
    </div>
  );
}
