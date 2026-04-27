import { ReactNode, useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Package, Users, Trash2, LogOut, Menu, X, User as UserIcon, Bell } from 'lucide-react';
import { User } from '../../types';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const mockNotifications = [
    { id: '1', message: 'New order #INV-2026-004 created', time: '5 min ago', read: false },
    { id: '2', message: 'Stock alert: Varilla 3/8" is low', time: '1 hour ago', read: false },
    { id: '3', message: 'Order #INV-2026-003 delivered', time: '2 hours ago', read: true },
  ];

  useEffect(() => {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
      navigate('/admin');
      return;
    }
    setCurrentUser(JSON.parse(userStr));
  }, [navigate]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/admin');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: Package, label: 'Dashboard', roles: ['Admin'] },
    { path: '/admin/users', icon: Users, label: 'Users', roles: ['Admin'] },
    { path: '/admin/customers', icon: Users, label: 'Customers', roles: ['Admin'] },
    { path: '/admin/materials', icon: Package, label: 'Materials', roles: ['Admin'] },
    { path: '/admin/providers', icon: Package, label: 'Providers', roles: ['Admin'] },
    { path: '/admin/deleted', icon: Trash2, label: 'Deleted Orders', roles: ['Admin'] },
    { path: '/sales/orders', icon: Package, label: 'Orders', roles: ['Sales'] },
    { path: '/sales/customers', icon: Users, label: 'Customers', roles: ['Sales'] },
    { path: '/purchasing/stock-alerts', icon: Package, label: 'Stock Alerts', roles: ['Purchasing'] },
    { path: '/purchasing/purchase-requests', icon: Package, label: 'Purchase Requests', roles: ['Purchasing'] },
    { path: '/purchasing/materials', icon: Package, label: 'Materials Catalog', roles: ['Purchasing'] },
    { path: '/purchasing/providers', icon: Package, label: 'Providers Catalog', roles: ['Purchasing'] },
    { path: '/warehouse/orders', icon: Package, label: 'Order Processing', roles: ['Warehouse'] },
    { path: '/warehouse/stock', icon: Package, label: 'Stock Management', roles: ['Warehouse'] },
    { path: '/route/orders', icon: Package, label: 'Route Orders', roles: ['Route'] },
  ];

  const filteredMenuItems = menuItems.filter(item =>
    currentUser && item.roles.includes(currentUser.role)
  );

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-gray-800 text-white">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl">Halcon Admin</h1>
          <p className="text-sm text-gray-400 mt-1">{currentUser.role}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                  isActive
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-700 space-y-2">
          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded text-gray-300 hover:bg-gray-700 w-full transition-colors"
          >
            <UserIcon className="w-5 h-5" />
            My Profile
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded text-gray-300 hover:bg-gray-700 w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)}>
          <aside
            className="w-64 h-full bg-gray-800 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <div>
                <h1 className="text-xl">Halcon Admin</h1>
                <p className="text-sm text-gray-400 mt-1">{currentUser.role}</p>
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-4 space-y-2">
              {filteredMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                      isActive
                        ? 'bg-orange-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 space-y-2">
              <Link
                to="/profile"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded text-gray-300 hover:bg-gray-700 w-full transition-colors"
              >
                <UserIcon className="w-5 h-5" />
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded text-gray-300 hover:bg-gray-700 w-full transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Desktop Header */}
        <header className="hidden md:flex bg-white shadow-sm p-4 items-center justify-end gap-4">
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bell className="w-5 h-5" />
              {mockNotifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {mockNotifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      No notifications
                    </div>
                  ) : (
                    mockNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-3 border-t border-gray-200 text-center">
                  <button className="text-sm text-orange-600 hover:text-orange-700">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            <UserIcon className="w-5 h-5" />
            <span className="text-sm">{currentUser?.name}</span>
          </Link>
        </header>

        {/* Mobile Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="font-semibold">Halcon Admin</h1>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 text-gray-600 hover:text-gray-800"
          >
            <Bell className="w-5 h-5" />
            {mockNotifications.filter(n => !n.read).length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
