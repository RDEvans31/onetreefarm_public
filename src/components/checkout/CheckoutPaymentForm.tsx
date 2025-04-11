'use client';

import { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe-client';
import LoadingSpinner from '../shared/LoadingSpinner';
import { WooCommerceLineItemResponse } from '@/types/woocommerce-order-response';

const stripePromise = getStripe();

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

function PaymentDetailsForm({
  orderId,
  clientSecret,
}: {
  orderId: number;
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);
      setError(null);

      e.preventDefault();
      if (!stripe || !elements) {
        return;
      }

      const { error: submitError } = await elements.submit();

      if (submitError) {
        setError(submitError.message || 'Something went wrong');
        setIsLoading(false);
        return;
      }

      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${baseUrl}/shop/checkout/${orderId}/success`,
        },
      });
      if (paymentError) {
        setError(paymentError.message || 'Something went wrong');
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.error('Error during checkout:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleCheckout}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full bg-black text-white py-4 rounded-lg font-medium relative mt-4"
      >
        <span id="button-text">
          {isLoading ? <LoadingSpinner /> : 'Pay now'}
        </span>
      </button>
      {/* Show any error messages */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}
    </form>
  );
}

export function CheckoutPaymentForm({
  orderId,
  items,
  deliveryFee,
  fees,
}: {
  orderId: number;
  items: WooCommerceLineItemResponse[];
  deliveryFee: number;
  fees: number;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentAmount, setPaymentIntentAmount] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items,
            deliveryFee,
            fees,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const { clientSecret, amount } = await response.json();
        setClientSecret(clientSecret);
        setPaymentIntentAmount(amount);
      } catch (error) {
        console.error('Error fetching payment intent:', error);
      }
    };

    if (items.length > 0) {
      fetchPaymentIntent();
    }
  }, [items, deliveryFee, fees]);

  if (!clientSecret) {
    return <LoadingSpinner />;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: 'payment',
        amount: paymentIntentAmount,
        currency: 'gbp',
        appearance: {
          theme: 'flat',
        },
      }}
    >
      <PaymentDetailsForm orderId={orderId} clientSecret={clientSecret} />
    </Elements>
  );
}
