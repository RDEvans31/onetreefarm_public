'use client';

import { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { Items } from '@/types/checkout';
import { getStripe } from '@/lib/stripe-client';

const stripePromise = getStripe();

function CheckoutPaymentFormInner({ clientSecret }: { clientSecret: string }) {
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
          return_url: `${window.location.origin}/shop/checkout/success`,
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
          {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
          ) : (
            'Pay now'
          )}
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
  items,
  deliveryFee,
  fees,
}: {
  items: Items;
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
    return (
      <div className="p-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
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
      <CheckoutPaymentFormInner clientSecret={clientSecret} />
    </Elements>
  );
}
