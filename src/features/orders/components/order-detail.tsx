'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { OrderDetails } from '@/types/orders';
import { PageTransition } from '@/components/animations';

interface OrderDetailClientProps {
  orderDetail: OrderDetails;
}

export default function OrderDetailClient({ orderDetail }: OrderDetailClientProps) {
  const router = useRouter();
  
  const handleBack = () => {
    router.push('/orders');
  };

  // Format the date as DD.MM.YYYY
  const formattedDate = new Date(orderDetail.date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '.');

  return (
    <PageTransition direction="up">
      <div className="w-full">
        {/* Header with back button */}
        <div className="mb-6 flex items-center space-x-3">
          <button
            onClick={handleBack}
            className="rounded-full bg-white text-black w-8 h-8 justify-center flex items-center"
          >
            <X size={24} />
          </button>
          
          <div className="text-white text-xl">#15325</div>
        </div>

        {/* Order card - same as in order list */}
        <div className="bg-gray-800/80 rounded-lg p-4 mb-6">
          {/* First row - Transaction ID, Date, Status */}
          <div className="flex justify-between mb-4">
            <div>
              <div className="text-gray-400 text-xs mb-1">Transaction ID</div>
              <div className="text-white text-base font-medium">#{orderDetail.orderNumber}</div>
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
              <div className="text-white text-base font-medium">{orderDetail.gameName}</div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs mb-1">Game ID</div>
              <div className="text-white text-base font-medium">{orderDetail.gameId}</div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs mb-1">Ammount</div>
              <div className="text-white text-base font-medium">
                ${orderDetail.totalAmount.toFixed(2).replace('.', ',')}
              </div>
            </div>
          </div>
        </div>

        {/* Your Goods section */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-xl">Your Goods:</span>
            <span className="text-white text-xl">1 - 279,99$</span>
          </div>
        </div>

        {/* Price details card */}
        <div className="bg-gray-800/80 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-white text-2xl font-bold">40,500</div>
            <div className="bg-gray-700 rounded-full px-4 py-1 text-white">+1,500</div>
          </div>
          
          <div className="flex items-center">
            <span className="text-white text-2xl font-bold mr-4">279,99$</span>
            <span className="text-gray-500 line-through">749,99$</span>
          </div>
        </div>

        {/* Ask button */}
        <button className="w-full bg-white text-black font-medium rounded-full py-4 px-6 transition-colors hover:bg-gray-200">
          Ask ?
        </button>
      </div>
    </PageTransition>
  );
}