// mocked version of api handlers, this logic can be anywhere again depending on the logic and goals

import { NextResponse } from 'next/server';
import { getAllOrders, getOrderById } from '@/lib/api/order-services';

// GET /api/orders - Get all orders
export async function GET() {
  try {
    const orders = await getAllOrders();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}