'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, RefreshCw } from 'lucide-react';
import { Order } from '@/types/orders';
import OrderItem from './order-item';
import { AnimatedButton } from '@/components/ui/animated-button';
import { PageTransition } from '@/components/animations';
import useOrders from '@/features/orders/hooks/useOrders';

interface OrderListClientProps {
  initialOrders?: Order[];
}

export default function OrderListClient({ initialOrders = [] }: OrderListClientProps) {
  // Use the hook with initialFetch set to false if we have initial orders
  const { 
    orders: hookOrders, 
    isLoading, 
    error, 
    fetchOrders, 
    clearError 
  } = useOrders(initialOrders.length === 0);
  
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use either the orders from the hook or the initial orders passed in props
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  
  // Update orders when hookOrders changes
  useEffect(() => {
    if (hookOrders.length > 0) {
      setOrders(hookOrders);
    }
  }, [hookOrders]);

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.gameName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Refresh orders from the API
  const handleRefresh = () => {
    fetchOrders();
  };

  return (
    <PageTransition direction="up">
      <div className="w-full max-w-4xl">
        {/* Header with title and search */}
        <div className="flex justify-between items-center mb-6">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-white"
          >
            Orders
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-48 pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <AnimatedButton
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isLoading}
              className="ml-2 text-white border-gray-700"
            >
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
            </AnimatedButton>
          </motion.div>
        </div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/30 text-red-300 p-4 rounded-md mb-6"
          >
            <p>{error}</p>
            <AnimatedButton
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="mt-2 text-white border-gray-700"
            >
              Try Again
            </AnimatedButton>
          </motion.div>
        )}

        {/* Loading state */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-700 animate-pulse h-40 rounded-lg"></div>
            ))}
          </div>
        ) : filteredOrders.length > 0 ? (
          // Order list
          <div className="space-y-3">
            {filteredOrders.map((order, index) => (
              <OrderItem key={order.id} order={order} delay={index} />
            ))}
          </div>
        ) : (
          // Empty state
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center p-8 text-center"
          >
            <ShoppingBag size={48} className="text-gray-600 mb-3" />
            
            {searchTerm ? (
              <>
                <h3 className="text-lg font-medium text-gray-200 mb-1">No matching orders found</h3>
                <p className="text-gray-400 mb-4">Try a different search term or clear the search</p>
                <AnimatedButton
                  variant="outline"
                  onClick={() => setSearchTerm('')}
                  className="text-white border-gray-700"
                >
                  Clear Search
                </AnimatedButton>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium text-gray-200 mb-1">No orders found</h3>
                <p className="text-gray-400">You don't have any orders yet</p>
              </>
            )}
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}