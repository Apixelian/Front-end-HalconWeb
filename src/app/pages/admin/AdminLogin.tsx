import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { mockUsers } from '../../mockData';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));

      switch (user.role) {
        case 'Admin':
          navigate('/admin/dashboard');
          break;
        case 'Sales':
          navigate('/sales/orders');
          break;
        case 'Purchasing':
          navigate('/purchasing/stock-alerts');
          break;
        case 'Warehouse':
          navigate('/warehouse/orders');
          break;
        case 'Route':
          navigate('/route/orders');
          break;
        default:
          navigate('/admin/dashboard');
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-2xl mb-1">Admin Portal</h1>
          <p className="text-gray-600">Halcon Construction Materials</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              placeholder="Enter username"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded hover:bg-orange-700 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 pt-6 border-t">
          <div className="text-sm text-gray-600 space-y-1">
            <p className="font-medium">Demo Credentials:</p>
            <p>Admin: admin / admin123</p>
            <p>Sales: sales1 / sales123</p>
            <p>Purchasing: purchasing1 / purchasing123</p>
            <p>Warehouse: warehouse1 / warehouse123</p>
            <p>Route: route1 / route123</p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <a href="/" className="text-sm text-orange-600 hover:text-orange-700">
            ← Customer Portal
          </a>
        </div>
      </div>
    </div>
  );
}
