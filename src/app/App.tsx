import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CustomerLogin } from './pages/customer/CustomerLogin';
import { OrderStatus } from './pages/customer/OrderStatus';
import { OrderList } from './pages/customer/OrderList';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagement } from './pages/admin/UserManagement';
import { CustomerManagement } from './pages/admin/CustomerManagement';
import { MaterialsManagement } from './pages/admin/MaterialsManagement';
import { DeletedOrders } from './pages/admin/DeletedOrders';
import { SalesOrderList } from './pages/sales/SalesOrderList';
import { SalesOrderForm } from './pages/sales/SalesOrderForm';
import { SalesOrderDetail } from './pages/sales/SalesOrderDetail';
import { CustomerView } from './pages/sales/CustomerView';
import { StockAlerts } from './pages/purchasing/StockAlerts';
import { MaterialsCatalog } from './pages/purchasing/MaterialsCatalog';
import { ProvidersIndex } from './pages/purchasing/ProvidersIndex';
import { ProvidersCatalog } from './pages/purchasing/ProvidersCatalog';
import { PurchaseRequestForm } from './pages/purchasing/PurchaseRequestForm';
import { PurchaseRequestList } from './pages/purchasing/PurchaseRequestList';
import { OrderProcessing } from './pages/warehouse/OrderProcessing';
import { StockManagement } from './pages/warehouse/StockManagement';
import { RouteOrders } from './pages/route/RouteOrders';
import { UserProfile } from './pages/shared/UserProfile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerLogin />} />
        <Route path="/customer/order/:invoiceNumber" element={<OrderStatus />} />
        <Route path="/customer/orders" element={<OrderList />} />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/customers" element={<CustomerManagement />} />
        <Route path="/admin/materials" element={<MaterialsManagement />} />
        <Route path="/admin/providers" element={<ProvidersIndex />} />
        <Route path="/admin/deleted" element={<DeletedOrders />} />

        <Route path="/sales/orders" element={<SalesOrderList />} />
        <Route path="/sales/orders/new" element={<SalesOrderForm />} />
        <Route path="/sales/orders/:orderId" element={<SalesOrderDetail />} />
        <Route path="/sales/customers" element={<CustomerView />} />

        <Route path="/purchasing/stock-alerts" element={<StockAlerts />} />
        <Route path="/purchasing/materials" element={<MaterialsCatalog />} />
        <Route path="/purchasing/providers" element={<ProvidersCatalog />} />
        <Route path="/purchasing/purchase/new" element={<PurchaseRequestForm />} />
        <Route path="/purchasing/purchase-requests" element={<PurchaseRequestList />} />

        <Route path="/warehouse/orders" element={<OrderProcessing />} />
        <Route path="/warehouse/stock" element={<StockManagement />} />

        <Route path="/route/orders" element={<RouteOrders />} />

        <Route path="/profile" element={<UserProfile />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}