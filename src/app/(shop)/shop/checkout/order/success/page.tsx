'use client';

import { useCartStore } from '@/store';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const { clearCart } = useCartStore();
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');

  useEffect(() => {
    // Clear the cart after successful payment
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold">Thank you for your order!</h1>

        <p className="text-gray-600">
          Your order has been confirmed and will be processed shortly.
          {sessionId && (
            <span className="block mt-2 text-sm">
              Order reference: {sessionId}
            </span>
          )}
        </p>

        <div className="space-y-4 pt-4">
          <Link
            href="/shop"
            className="block w-full bg-black text-white py-4 rounded-lg font-medium"
          >
            Continue Shopping
          </Link>

          <Link
            href="/shop/orders"
            className="block w-full bg-gray-100 text-gray-800 py-4 rounded-lg font-medium"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
