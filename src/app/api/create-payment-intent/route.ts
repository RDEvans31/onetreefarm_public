import { stripe, formatAmountForStripe } from '@/lib/stripe';
import { CreatePaymentIntentPostRequestBody } from '@/types/checkout';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body: CreatePaymentIntentPostRequestBody = await req.json();
    const { items, deliveryFee, fees } = body;

    if (!items?.length) {
      return new NextResponse('Items are required', { status: 400 });
    }

    // Calculate total amount
    const itemsTotal = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    const total = itemsTotal + (deliveryFee || 0) + (fees || 0);
    const amount = formatAmountForStripe(total);

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'gbp',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: `OTF-${Date.now()}`,
        items: JSON.stringify(
          items.map((item: any) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
          }))
        ),
        deliveryFee: deliveryFee?.toString() || '0',
        serviceFees: fees?.toString() || '0',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
