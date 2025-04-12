import { NextResponse } from 'next/server';
import { WOOCOMMERCE_API_URL, getWooCommerceAuth } from '@/lib/woocommerce';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    if (!orderId) {
      return new NextResponse('Invalid order ID', { status: 400 });
    }

    // Set order as processing
    const orderPayload = {
      id: orderId,
      status: 'processing',
    };

    // Update the order status
    const response = await fetch(`${WOOCOMMERCE_API_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${getWooCommerceAuth()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('WooCommerce API Error:', error);
      return new NextResponse('Failed to update order status', {
        status: response.status,
      });
    }

    const order = await response.json();

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error updating order status:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
