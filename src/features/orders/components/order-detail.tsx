'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Truck,
  CheckCircle
} from 'lucide-react';
import { OrderDetails, OrderStatus } from '@/types/orders';
import { AnimatedButton } from '@/components/ui/animated-button';
import { 
  AnimatedCard, 
  CardHeader, 
  CardContent, 
  CardTitle 
} from '@/components/customized/animated-card';
import { PageTransition } from '@/components/animations';

interface OrderDetailClientProps {
  orderDetail: OrderDetails;
}

export default function OrderDetailClient({ orderDetail }: OrderDetailClientProps) {
  const router = useRouter();
  
  const handleBack = () => {
    router.push('/orders');
  };

  // Format the date
  const formattedDate = new Date(orderDetail.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Status colors and icons
  const getStatusStyle = (status: OrderStatus) => {
    const styles = {
      pending: {
        color: 'text-yellow-600 dark:text-yellow-400',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        icon: <motion.div animate={{ rotate: [0, 180, 360] }} transition={{ repeat: Infinity, duration: 3 }}><Truck size={20} /></motion.div>
      },
      processing: {
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        icon: <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}><Truck size={20} /></motion.div>
      },
      shipped: {
        color: 'text-purple-600 dark:text-purple-400',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        icon: <Truck size={20} />
      },
      delivered: {
        color: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        icon: <CheckCircle size={20} />
      },
      cancelled: {
        color: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        icon: <motion.div animate={{ rotate: 45 }} transition={{ type: 'spring', stiffness: 100 }}><Truck size={20} /></motion.div>
      }
    };
    
    return styles[status] || styles.pending;
  };

  const statusStyle = getStatusStyle(orderDetail.status);

  return (
    <PageTransition direction="up">
      <div className="w-full max-w-4xl">
        <div className="flex items-center mb-6">
          <AnimatedButton
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="mr-4"
          >
            <ArrowLeft size={18} className="mr-2" /> Back
          </AnimatedButton>
          
          <motion.h1 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-gray-800 dark:text-gray-100"
          >
            Order {orderDetail.orderNumber}
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Summary */}
          <AnimatedCard className="md:col-span-3" delay={0.1}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Order Summary</CardTitle>
                <div className={`flex items-center px-3 py-1 rounded-full text-sm ${statusStyle.color} ${statusStyle.bgColor}`}>
                  <span className="mr-2">{statusStyle.icon}</span>
                  <span>{orderDetail.status.charAt(0).toUpperCase() + orderDetail.status.slice(1)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Calendar size={18} className="mr-2" />
                  <span>Ordered on {formattedDate}</span>
                </div>
                
                {orderDetail.trackingNumber && (
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Truck size={18} className="mr-2" />
                    <span>Tracking: {orderDetail.trackingNumber}</span>
                  </div>
                )}
                
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <CreditCard size={18} className="mr-2" />
                  <span>{orderDetail.paymentMethod}</span>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>

          {/* Order Items */}
          <AnimatedCard className="md:col-span-2" delay={0.2}>
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderDetail.items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400">
                        {item.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-800 dark:text-gray-100">{item.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800 dark:text-gray-100">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Subtotal</span>
                    <span>${orderDetail.items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300 mt-1">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-gray-800 dark:text-gray-100 mt-2">
                    <span>Total</span>
                    <span>${orderDetail.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>

          {/* Customer & Shipping */}
          <AnimatedCard delay={0.3}>
            <CardHeader>
              <CardTitle>Customer & Shipping</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Customer</h3>
                  <div className="flex items-start space-x-2 text-gray-800 dark:text-gray-100">
                    <User size={16} className="mt-0.5 text-gray-500 dark:text-gray-400" />
                    <span>{orderDetail.customer.name}</span>
                  </div>
                  <div className="flex items-start space-x-2 text-gray-800 dark:text-gray-100">
                    <Mail size={16} className="mt-0.5 text-gray-500 dark:text-gray-400" />
                    <span>{orderDetail.customer.email}</span>
                  </div>
                  <div className="flex items-start space-x-2 text-gray-800 dark:text-gray-100">
                    <Phone size={16} className="mt-0.5 text-gray-500 dark:text-gray-400" />
                    <span>{orderDetail.customer.phone}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Shipping Address</h3>
                  <div className="flex items-start space-x-2 text-gray-800 dark:text-gray-100">
                    <MapPin size={16} className="mt-0.5 text-gray-500 dark:text-gray-400" />
                    <div>
                      <p>{orderDetail.shippingAddress.street}</p>
                      <p>{orderDetail.shippingAddress.city}, {orderDetail.shippingAddress.state} {orderDetail.shippingAddress.zipCode}</p>
                      <p>{orderDetail.shippingAddress.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>
        </div>
      </div>
    </PageTransition>
  );
}