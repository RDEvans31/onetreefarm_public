import { NextResponse } from 'next/server';
import { WooCommerceOrderResponse } from '@/types/woocommerce-order-response';
import { WOOCOMMERCE_API_URL, getWooCommerceAuth } from '@/lib/woocommerce';

export async function POST(req: Request) {
  try {
    const orderData: WooCommerceOrderResponse = await req.json();

    // Validate required fields
    if (!orderData.line_items?.length) {
      return new NextResponse('Line items are required', { status: 400 });
    }

    if (!orderData.billing || !orderData.shipping) {
      return new NextResponse('Billing and shipping information are required', {
        status: 400,
      });
    }

    if (orderData.billing.email == 'test@example.com') {
      return new NextResponse('Billing information (email) not correct', {
        status: 400,
      });
    }

    if (!orderData.id) {
      return new NextResponse('Order ID is required', {
        status: 400,
      });
    }

    // Set order as draft
    const draftOrder = {
      ...orderData,
    };

    // Create the draft order
    const response = await fetch(`${WOOCOMMERCE_API_URL}/orders`, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${getWooCommerceAuth()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(draftOrder),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('WooCommerce API Error:', error);
      return new NextResponse('Failed to create draft order', {
        status: response.status,
      });
    }

    const order = await response.json();

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error creating draft order:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
