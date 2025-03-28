'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useCartStore } from '@/store';

export default function ClientSuccess({ orderId }: { orderId: string }) {
  const { items, clearCart } = useCartStore();

  useEffect(() => {
    if (items.length > 0) {
      clearCart();
    }
  }, [clearCart, items]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6 text-center">
      <h2 className="text-xl">Your order has been placed!</h2>

      <div className="space-y-2">
        <h1 className="text-4xl">Order</h1>
        <p className="text-3xl">#{orderId}</p>
      </div>

      <CheckCircle className="w-24 h-24 text-green-500" />

      <Link
        href="/shop"
        className="mt-8 px-8 py-3 bg-black text-white text-lg hover:bg-gray-800 transition-colors"
      >
        Back to Shop
      </Link>
    </div>
  );
}
