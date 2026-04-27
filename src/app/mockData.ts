import { Order, User, Material, Provider, StockAlert, PurchaseRequest } from './types';

export const mockUsers: User[] = [
  { id: '1', name: 'Admin User', username: 'admin', email: 'admin@halcon.com', password: 'admin123', role: 'Admin', active: true },
  { id: '2', name: 'Sales Representative', username: 'sales1', email: 'sales@halcon.com', password: 'sales123', role: 'Sales', active: true },
  { id: '3', name: 'Warehouse Manager', username: 'warehouse1', email: 'warehouse@halcon.com', password: 'warehouse123', role: 'Warehouse', active: true },
  { id: '4', name: 'Route Driver', username: 'route1', email: 'route@halcon.com', password: 'route123', role: 'Route', active: true },
  { id: '5', name: 'Purchasing Manager', username: 'purchasing1', email: 'purchasing@halcon.com', password: 'purchasing123', role: 'Purchasing', active: true },
  { id: '6', name: 'Juan Pérez', username: 'jperez', email: 'juan@constructoraabc.com', password: 'customer123', role: 'Customer', active: true, customerNumber: 'CUST-001', company: 'Constructora ABC', phone: '555-1111-2222', address: 'Av. Reforma 123, Ciudad de México' },
  { id: '7', name: 'María González', username: 'mgonzalez', email: 'maria@edificacionesnorte.com', password: 'customer123', role: 'Customer', active: true, customerNumber: 'CUST-002', company: 'Edificaciones del Norte', phone: '555-3333-4444', address: 'Calzada del Valle 456, Monterrey' },
  { id: '8', name: 'Carlos López', username: 'clopez', email: 'carlos@obrasyproy.com', password: 'customer123', role: 'Customer', active: true, customerNumber: 'CUST-003', company: 'Obras y Proyectos SA', phone: '555-5555-6666', address: 'Boulevard Insurgentes 789, Guadalajara' },
];

export const mockMaterials: Material[] = [
  { id: '1', claveMaterial: 1001, descripcionMaterial: 'Cemento Portland 50kg', precioUnitario: 185.50, cantidadMaterial: 150, active: true },
  { id: '2', claveMaterial: 1002, descripcionMaterial: 'Varilla 3/8" x 6m', precioUnitario: 95.00, cantidadMaterial: 5, active: true },
  { id: '3', claveMaterial: 1003, descripcionMaterial: 'Block hueco 15x20x40cm', precioUnitario: 12.50, cantidadMaterial: 800, active: true },
  { id: '4', claveMaterial: 1004, descripcionMaterial: 'Arena de río m³', precioUnitario: 320.00, cantidadMaterial: 2, active: true },
  { id: '5', claveMaterial: 1005, descripcionMaterial: 'Grava triturada m³', precioUnitario: 380.00, cantidadMaterial: 0, active: true },
  { id: '6', claveMaterial: 1006, descripcionMaterial: 'Cal hidratada 20kg', precioUnitario: 65.00, cantidadMaterial: 80, active: true },
];

export const mockProviders: Provider[] = [
  { id: '1', nombreProveedor: 'Cementos Mexicanos SA', telefono: '555-1234-5678', correo: 'ventas@cemex.com.mx', activo: true },
  { id: '2', nombreProveedor: 'Aceros del Norte', telefono: '555-2345-6789', correo: 'pedidos@acerosnorte.com', activo: true },
  { id: '3', nombreProveedor: 'Materiales Guadalupe', telefono: '555-3456-7890', correo: 'contacto@matguadalupe.com', activo: true },
  { id: '4', nombreProveedor: 'Agregados Pétreos SA', telefono: '555-4567-8901', correo: 'info@agregadospetreos.com', activo: false },
  { id: '5', nombreProveedor: 'Cal y Derivados', telefono: '555-5678-9012', correo: 'ventas@calyderivados.com', activo: true },
];

export const mockStockAlerts: StockAlert[] = [
  { id: '1', materialId: '2', cantidadStock: 5, stockMinimo: 20, stockMaximo: 100 },
  { id: '2', materialId: '4', cantidadStock: 2, stockMinimo: 10, stockMaximo: 50 },
  { id: '3', materialId: '5', cantidadStock: 0, stockMinimo: 10, stockMaximo: 40 },
];

export const mockPurchaseRequests: PurchaseRequest[] = [
  { id: '1', orderId: '2', materialId: '2', providerId: '2', quantity: 50, notes: 'Urgente para obra en Monterrey', status: 'Pending', createdAt: '2026-04-18T10:00:00' },
  { id: '2', orderId: '3', materialId: '5', providerId: '4', quantity: 20, notes: 'Pedido programado', status: 'Purchased', createdAt: '2026-04-17T14:30:00' },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2026-001',
    customerName: 'Constructora ABC',
    customerNumber: 'CUST-001',
    fiscalData: 'RFC: ABC123456789',
    date: '2026-04-15T10:30:00',
    deliveryAddress: 'Av. Reforma 123, Ciudad de México',
    notes: 'Entrega urgente - Favor de llamar al llegar',
    status: 'Delivered',
    items: [
      { id: '1', materialId: '1', materialName: 'Cemento Portland 50kg', quantity: 20, unitPrice: 185.50, totalPrice: 3710.00 },
      { id: '2', materialId: '3', materialName: 'Block hueco 15x20x40cm', quantity: 100, unitPrice: 12.50, totalPrice: 1250.00 },
    ],
    totalAmount: 4960.00,
    loadedUnitPhoto: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800',
    deliveryEvidencePhoto: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800',
    deleted: false,
  },
  {
    id: '2',
    invoiceNumber: 'INV-2026-002',
    customerName: 'Edificaciones del Norte',
    customerNumber: 'CUST-002',
    fiscalData: 'RFC: EDN987654321',
    date: '2026-04-16T09:00:00',
    deliveryAddress: 'Calzada del Valle 456, Monterrey',
    notes: 'Verificar acceso de camión grande',
    status: 'In Route',
    items: [
      { id: '3', materialId: '2', materialName: 'Varilla 3/8" x 6m', quantity: 50, unitPrice: 95.00, totalPrice: 4750.00 },
      { id: '4', materialId: '4', materialName: 'Arena de río m³', quantity: 5, unitPrice: 320.00, totalPrice: 1600.00 },
    ],
    totalAmount: 6350.00,
    loadedUnitPhoto: 'https://images.unsplash.com/photo-1590856029832-1e2529383e8d?w=800',
    deleted: false,
  },
  {
    id: '3',
    invoiceNumber: 'INV-2026-003',
    customerName: 'Obras y Proyectos SA',
    customerNumber: 'CUST-003',
    fiscalData: 'RFC: OYP456789123',
    date: '2026-04-17T14:00:00',
    deliveryAddress: 'Boulevard Insurgentes 789, Guadalajara',
    notes: 'Contactar a Ing. López antes de entregar',
    status: 'In Process',
    items: [
      { id: '5', materialId: '1', materialName: 'Cemento Portland 50kg', quantity: 30, unitPrice: 185.50, totalPrice: 5565.00 },
      { id: '6', materialId: '5', materialName: 'Grava triturada m³', quantity: 3, unitPrice: 380.00, totalPrice: 1140.00 },
      { id: '7', materialId: '6', materialName: 'Cal hidratada 20kg', quantity: 10, unitPrice: 65.00, totalPrice: 650.00 },
    ],
    totalAmount: 7355.00,
    deleted: false,
  },
  {
    id: '4',
    invoiceNumber: 'INV-2026-004',
    customerName: 'Desarrollos Urbanos',
    customerNumber: 'CUST-004',
    fiscalData: 'RFC: DUR741852963',
    date: '2026-04-18T08:30:00',
    deliveryAddress: 'Calle Morelos 321, Puebla',
    notes: 'Requiere factura antes de descarga',
    status: 'Ordered',
    items: [
      { id: '8', materialId: '3', materialName: 'Block hueco 15x20x40cm', quantity: 200, unitPrice: 12.50, totalPrice: 2500.00 },
      { id: '9', materialId: '4', materialName: 'Arena de río m³', quantity: 8, unitPrice: 320.00, totalPrice: 2560.00 },
    ],
    totalAmount: 5060.00,
    deleted: false,
  },
  {
    id: '5',
    invoiceNumber: 'INV-2026-005',
    customerName: 'Infraestructura Total',
    customerNumber: 'CUST-005',
    fiscalData: 'RFC: INT159753486',
    date: '2026-04-10T11:00:00',
    deliveryAddress: 'Av. Universidad 555, Querétaro',
    notes: 'Orden cancelada - cliente solicitó reembolso',
    status: 'Ordered',
    items: [
      { id: '10', materialId: '1', materialName: 'Cemento Portland 50kg', quantity: 15, unitPrice: 185.50, totalPrice: 2782.50 },
    ],
    totalAmount: 2782.50,
    deleted: true,
  },
];
