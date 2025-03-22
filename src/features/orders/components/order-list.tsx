'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, RefreshCw } from 'lucide-react';
import { Order } from '@/types/orders';
import OrderItem from './order-item';
import { AnimatedButton } from '@/components/ui/animated-button';

interface OrderListProps {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => Promise<void>;
}

export default function OrderList({ orders, isLoading, error, onRefresh }: OrderListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 md:mb-0"
        >
          Your Orders
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex w-full md:w-auto"
        >
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <AnimatedButton
            variant="outline"
            size="icon"
            onClick={onRefresh}
            disabled={isLoading}
            className="ml-2"
          >
            <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
          </AnimatedButton>
        </motion.div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-md mb-6"
        >
          <p>{error}</p>
          <AnimatedButton
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="mt-2"
          >
            Try Again
          </AnimatedButton>
        </motion.div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-700 animate-pulse h-24 rounded-lg"></div>
          ))}
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <OrderItem key={order.id} order={order} delay={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center p-8 text-center"
        >
          <ShoppingBag size={48} className="text-gray-300 dark:text-gray-600 mb-3" />
          
          {searchTerm ? (
            <>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">No matching orders found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Try a different search term or clear the search</p>
              <AnimatedButton
                variant="outline"
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </AnimatedButton>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">No orders found</h3>
              <p className="text-gray-500 dark:text-gray-400">You don't have any orders yet</p>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}