import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllOrders } from '@/lib/api/order-services';
import OrderListClient from '@/features/orders/components/order-list';
import { Button } from '@/components/ui/button';

// This is a Server Component that fetches data
export default async function OrdersPage() {
  // Fetch orders on the server
  const orders = await getAllOrders();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft size={18} className="mr-2" /> Orders
            </Button>
          </Link>
        </div>
        
        {/* Pass the pre-fetched orders to the client component */}
        <OrderListClient initialOrders={orders} />
      </div>
    </div>
  );
}