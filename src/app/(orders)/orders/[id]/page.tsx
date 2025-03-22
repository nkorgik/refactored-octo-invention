'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/animations';
import { useOrders } from '@/features/orders/hooks/useOrders';
import OrderDetail from '@/features/orders/components/order-detail';
import { Loader2 } from 'lucide-react';

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { selectedOrder, isLoading, error, getOrderDetails } = useOrders(false);

  // Fetch order details on component mount
  useEffect(() => {
    getOrderDetails(params.id);
  }, [params.id, getOrderDetails]);

  const handleBack = () => {
    router.push('/orders');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 md:p-8">
        <div className="flex flex-col items-center">
          <Loader2 size={40} className="animate-spin text-blue-600 dark:text-blue-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 md:p-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Error Loading Order</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Return to Orders
          </button>
        </div>
      </div>
    );
  }

  if (!selectedOrder) {
    return null; // Or you could show a loading state here too
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <PageTransition direction="up">
          <OrderDetail
            order={selectedOrder}
            onBack={handleBack}
          />
        </PageTransition>
      </div>
    </div>
  );
}