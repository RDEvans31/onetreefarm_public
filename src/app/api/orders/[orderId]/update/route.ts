import { NextRequest, NextResponse } from 'next/server';
import { WOOCOMMERCE_API_URL, getWooCommerceAuth } from '@/lib/woocommerce';

export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params;

    if (!orderId) {
      return NextResponse.json(
        { message: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Get the request body which contains the updated order data
    const orderData = await request.json();

    // Send PUT request to WooCommerce API to update the order
    const response = await fetch(`${WOOCOMMERCE_API_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${getWooCommerceAuth()}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: 'Failed to update order', error: errorData },
        { status: response.status }
      );
    }

    const updatedOrder = await response.json();
    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
