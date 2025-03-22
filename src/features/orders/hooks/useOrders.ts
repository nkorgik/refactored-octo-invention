// the hooks just encapsulate the wrapper logic around the actual fetch functions, these fetch functions could be located in different places depending
// on your project structure and your goals, usually it could be the lib/api or rtk queries/mutations (if you prefer to handle the data on the client side) tho for most cases server side fetch is preferred way

'use client';

import { useState, useCallback, useEffect } from 'react';
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

// Mock order details
const getMockOrderDetails = (id: string): OrderDetails => {
  const order = mockOrders.find(o => o.id === id);
  
  if (!order) {
    throw new Error('Order not found');
  }
  
  // Generate random order details
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
};

// Mock API functions
const mockFetchOrders = async (): Promise<Order[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockOrders;
};

const mockFetchOrderDetails = async (id: string): Promise<OrderDetails> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (!mockOrders.some(o => o.id === id)) {
    throw new Error('Order not found');
  }
  
  return getMockOrderDetails(id);
};

export const useOrders = (initialFetch: boolean = true) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all orders
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await mockFetchOrders();
      setOrders(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch orders';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get order details by ID
  const getOrderDetails = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await mockFetchOrderDetails(id);
      setSelectedOrder(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch order details';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear selected order
  const clearSelectedOrder = useCallback(() => {
    setSelectedOrder(null);
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initial fetch
  useEffect(() => {
    if (initialFetch) {
      fetchOrders();
    }
  }, [initialFetch, fetchOrders]);

  return {
    orders,
    selectedOrder,
    isLoading,
    error,
    fetchOrders,
    getOrderDetails,
    clearSelectedOrder,
    clearError
  };
};

export default useOrders;