export type OrderStatus = 'Ordered' | 'In Process' | 'In Route' | 'Delivered';

export type UserRole = 'Admin' | 'Sales' | 'Purchasing' | 'Warehouse' | 'Route' | 'Customer';

export interface OrderItem {
  id: string;
  materialId: string;
  materialName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerNumber: string;
  fiscalData: string;
  date: string;
  deliveryAddress: string;
  notes: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  loadedUnitPhoto?: string;
  deliveryEvidencePhoto?: string;
  loadedPhotoTimestamp?: string;
  deliveredPhotoTimestamp?: string;
  deliveryNotes?: string;
  deleted: boolean;
  missingItems?: string[];
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  active: boolean;
  customerNumber?: string;
  company?: string;
  phone?: string;
  address?: string;
}

export interface Material {
  id: string;
  claveMaterial: number;
  descripcionMaterial: string;
  precioUnitario: number;
  cantidadMaterial: number;
  active: boolean;
}

export interface Provider {
  id: string;
  nombreProveedor: string;
  telefono: string;
  correo: string;
  activo: boolean;
}

export interface StockAlert {
  id: string;
  materialId: string;
  cantidadStock: number;
  stockMinimo: number;
  stockMaximo: number;
}

export interface PurchaseRequest {
  id: string;
  orderId: string;
  materialId: string;
  providerId: string;
  quantity: number;
  notes: string;
  status: 'Pending' | 'Purchased';
  createdAt: string;
}
