'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Calendar, Package, ArrowRight } from 'lucide-react';
import { Order } from '@/types/orders';
import { AnimatedButton } from '@/components/ui/animated-button';

interface OrderItemProps {
  order: Order;
  delay?: number;
}

export default function OrderItem({ order, delay = 0 }: OrderItemProps) {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`/orders/${order.id}`);
  };

  // Format the date
  const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Status colors
  const statusColorMap = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
  };

  const statusColor = statusColorMap[order.status] || statusColorMap.pending;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {order.orderNumber}
          </h3>
          
          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-2">
            <Calendar size={16} className="mr-2" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
            <Package size={16} className="mr-2" />
            <span className={`px-2 py-1 rounded-full text-xs ${statusColor}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center">
          <div className="text-right mr-4">
            <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {order.currency === 'USD' ? '$' : order.currency} {order.totalAmount.toFixed(2)}
            </p>
          </div>
          
          <AnimatedButton
            size="sm"
            variant="ghost"
            className="rounded-full"
            aria-label="View order details"
          >
            <ArrowRight size={18} />
          </AnimatedButton>
        </div>
      </div>
    </motion.div>
  );
}