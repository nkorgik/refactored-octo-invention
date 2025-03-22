export enum OrderStatus {
  SUCCESS = 'success', // Changed from DELIVERED to SUCCESS to match UI
  CANCELLED = 'cancelled'
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  gameName: string;
  gameId: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderDetails extends Order {
  customer: Customer;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
}

export interface OrdersState {
  orders: Order[];
  selectedOrder: OrderDetails | null;
  isLoading: boolean;
  error: string | null;
}

export interface OrdersContextType extends OrdersState {
  fetchOrders: () => Promise<void>;
  getOrderDetails: (id: string) => Promise<void>;
  clearSelectedOrder: () => void;
  clearError: () => void;
}