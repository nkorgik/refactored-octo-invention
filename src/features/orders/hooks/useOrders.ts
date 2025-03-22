'use client';

import { useState, useCallback, useEffect } from 'react';
import { Order, OrderDetails, OrderStatus } from '@/types/orders';

// Updated mock orders data to match the Figma design
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

// Mock order details
const getMockOrderDetails = (id: string): OrderDetails => {
  const order = mockOrders.find(o => o.id === id);
  
  if (!order) {
    throw new Error('Order not found');
  }
  
  // Generate order details that match the mock data
  return {
    ...order,
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567'
    },
    items: [
      { id: 'item-1', name: order.gameName, quantity: 1, price: order.totalAmount }
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