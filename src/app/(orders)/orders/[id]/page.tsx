import { notFound } from 'next/navigation';
import { getOrderById } from '@/lib/api/order-services';
import OrderDetailClient from '@/features/orders/components/order-detail';

// Properly typed according to Next.js 15.2.3 expectations
interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  // Resolve the params Promise
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  // Fetch order details on the server
  const orderDetail = await getOrderById(id);
  
  // If order not found, show 404 page
  if (!orderDetail) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Pass the pre-fetched order data to the client component */}
        <OrderDetailClient orderDetail={orderDetail} />
      </div>
    </div>
  );
}