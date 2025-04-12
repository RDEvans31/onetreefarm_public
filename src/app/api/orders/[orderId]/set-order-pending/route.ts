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

    // const orderData: WooCommerceOrderResponse = await req.json();

    // // Validate required fields
    // if (!orderData.line_items?.length) {
    //   return new NextResponse('Line items are required', { status: 400 });
    // }

    // if (!orderData.billing || !orderData.shipping) {
    //   return new NextResponse('Billing and shipping information are required', {
    //     status: 400,
    //   });
    // }

    // Set order as pending
    const pendingOrderPayload = {
      id: orderId,
      status: 'pending',
    };

    // Update the order status
    const response = await fetch(`${WOOCOMMERCE_API_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${getWooCommerceAuth()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pendingOrderPayload),
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
