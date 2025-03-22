import { Order, OrderDetails } from '@/types/orders';

// Create a status enum that includes Success
export enum OrderStatus {
  SUCCESS = 'success', // Instead of DELIVERED to match the UI
  CANCELLED = 'cancelled'
}

// Updated mock orders data to exactly match the Figma design
const mockOrders: Order[] = [
  {
    id: 'order-1',
    orderNumber: '15325',
    date: '2024-06-12', // 12.06.2024 in the design
    status: OrderStatus.SUCCESS,
    totalAmount: 153.26,
    currency: 'USD',
    gameName: 'Ernardd',
    gameId: '1523523623'
  },
  {
    id: 'order-2',
    orderNumber: '15325',
    date: '2024-06-12',
    status: OrderStatus.SUCCESS,
    totalAmount: 153.26,
    currency: 'USD',
    gameName: 'Ernardd',
    gameId: '1523523623'
  },
  {
    id: 'order-3',
    orderNumber: '15325',
    date: '2024-06-12',
    status: OrderStatus.SUCCESS,
    totalAmount: 153.26,
    currency: 'USD',
    gameName: 'Ernardd',
    gameId: '1523523623'
  },
  {
    id: 'order-4',
    orderNumber: '15325',
    date: '2024-06-12',
    status: OrderStatus.SUCCESS,
    totalAmount: 153.26,
    currency: 'USD',
    gameName: 'Ernardd',
    gameId: '1523523623'
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
      { id: 'item-1', name: 'Ernardd Game', quantity: 1, price: order.totalAmount }
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