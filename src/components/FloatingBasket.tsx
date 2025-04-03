'use client';

import { useCartStore } from '@/store';
import { ShoppingBasket } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingBasket() {
  const { items, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || items.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-50">
      <button
        className="w-full bg-black text-white py-4 px-6 rounded-full shadow-lg flex items-center justify-between hover:bg-gray-800 transition-colors"
        onClick={() => (window.location.href = '/shop/cart')}
      >
        <div className="flex items-center gap-2">
          <ShoppingBasket size={24} />
          <span>
            View Basket • {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        <span className="font-bold">£{getTotal().toFixed(2)}</span>
      </button>
    </div>
  );
}
