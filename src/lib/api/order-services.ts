import { Order, OrderDetails, OrderStatus } from '@/types/orders';

// Mock orders data
const mockOrders: Order[] = [
  {
    id: 'order-1',
    orderNumber: 'ORD-2023-001',
    date: '2023-11-01',
    status: OrderStatus.DELIVERED,
    totalAmount: 111.97,
    currency: 'USD'
  },
  {
    id: 'order-2',
    orderNumber: 'ORD-2023-002',
    date: '2023-11-05',
    status: OrderStatus.PROCESSING,
    totalAmount: 89.99,
    currency: 'USD'
  },
  {
    id: 'order-3',
    orderNumber: 'ORD-2023-003',
    date: '2023-11-07',
    status: OrderStatus.SHIPPED,
    totalAmount: 156.50,
    currency: 'USD'
  },
  {
    id: 'order-4',
    orderNumber: 'ORD-2023-004',
    date: '2023-11-10',
    status: OrderStatus.PENDING,
    totalAmount: 49.99,
    currency: 'USD'
  }
];

// Server-side function to get all orders
export async function getAllOrders(): Promise<Order[]> {
  // In a real app, this would be a database call or API request
  // Simulate server delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockOrders;
}

// Server-side function to get order details
export async function getOrderById(id: string): Promise<OrderDetails | null> {
  // In a real app, this would be a database call or API request
  // Simulate server delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const order = mockOrders.find(o => o.id === id);
  
  if (!order) {
    return null;
  }
  
  // Generate detailed order information
  return {
    ...order,
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567'
    },
    items: [
      { id: 'item-1', name: 'Product 1', quantity: 2, price: 25.99 },
      { id: 'item-2', name: 'Product 2', quantity: 1, price: 59.99 }
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    paymentMethod: 'Credit Card',
    trackingNumber: `TRK-${Math.floor(Math.random() * 1000000)}`
  };
}

// Server-side function to update order status (mock implementation)
export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order | null> {
  // In a real app, this would update the database
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const orderIndex = mockOrders.findIndex(o => o.id === id);
  
  if (orderIndex === -1) {
    return null;
  }
  
  // Create a copy of the order with the updated status
  const updatedOrder = {
    ...mockOrders[orderIndex],
    status
  };
  
  // In a real app, you would persist this change
  return updatedOrder;
}