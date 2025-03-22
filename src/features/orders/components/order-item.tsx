'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Order } from '@/types/orders';

interface OrderItemProps {
  order: Order;
  delay?: number;
}

export default function OrderItem({ order, delay = 0 }: OrderItemProps) {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`/orders/${order.id}`);
  };

  // Format the date as DD.MM.YYYY
  const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '.');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.05 }}
      className="bg-gray-800/80 rounded-lg p-4 mb-3 cursor-pointer"
      onClick={handleClick}
    >
      {/* First row - Transaction ID, Date, Status */}
      <div className="flex justify-between mb-4">
        <div>
          <div className="text-gray-400 text-xs mb-1">Transaction ID</div>
          <div className="text-white text-base font-medium">#{order.orderNumber}</div>
        </div>
        
        <div>
          <div className="text-gray-400 text-xs mb-1">Date</div>
          <div className="text-white text-base font-medium">{formattedDate}</div>
        </div>
        
        <div>
          <div className="text-gray-400 text-xs mb-1">Status</div>
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-white text-base font-medium">Success</span>
          </div>
        </div>
      </div>
      
      {/* Divider */}
      <div className="border-t border-gray-700 my-2"></div>
      
      {/* Second row - Game Name, Game ID, Amount */}
      <div className="flex justify-between mt-4">
        <div>
          <div className="text-gray-400 text-xs mb-1">Game Name</div>
          <div className="text-white text-base font-medium">{order.gameName}</div>
        </div>
        
        <div>
          <div className="text-gray-400 text-xs mb-1">Game ID</div>
          <div className="text-white text-base font-medium">{order.gameId}</div>
        </div>
        
        <div>
          <div className="text-gray-400 text-xs mb-1">Amount</div>
          <div className="text-white text-base font-medium">
            ${order.totalAmount.toFixed(2).replace('.', ',')}
          </div>
        </div>
      </div>
    </motion.div>
  );
}