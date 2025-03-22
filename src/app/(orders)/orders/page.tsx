'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PageTransition } from '@/components/animations';
import { useOrders } from '@/features/orders/hooks/useOrders';
import OrderList from '@/features/orders/components/order-list';
import { AnimatedButton } from '@/components/ui/animated-button';

export default function OrdersPage() {
  const { orders, isLoading, error, fetchOrders } = useOrders(true);

  // Reset any selected order when navigating to the list page
  useEffect(() => {
    // This is to ensure we don't have any selected order when viewing the list
    // In a real app, you might handle this differently with a context or state management
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <AnimatedButton variant="ghost" size="sm" className="mb-4">
              <ArrowLeft size={18} className="mr-2" /> Back to Home
            </AnimatedButton>
          </Link>
        </div>
        
        <PageTransition direction="up">
          <OrderList
            orders={orders}
            isLoading={isLoading}
            error={error}
            onRefresh={fetchOrders}
          />
        </PageTransition>
      </div>
    </div>
  );
}