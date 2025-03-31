'use client';

import { useCartStore } from '@/store';
import { ArrowLeft, Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
//   const [promoCode, setPromoCode] = useState('');
  
  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate prices using useMemo to prevent unnecessary recalculations
  const prices = useMemo(() => {
    const subtotal = getTotal();
    const deliveryFee = subtotal > 100 ? 0 : 0.29;
    const fees = subtotal * 0.05; // 5% service fee
    const total = subtotal + deliveryFee + fees;
    return { subtotal, deliveryFee, fees, total, items };
  }, [getTotal, items]);

  // Show loading state before hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 bg-white border-b z-40">
          <div className="px-4 py-3">
            <h1 className="text-2xl font-bold">One Tree Farm</h1>
          </div>
        </div>
        <div className="p-4 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="flex justify-between p-4">
            <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white transition-colors">
            <Link href="/shop" className="text-black">
                <ArrowLeft size={24} />
            </Link>
            </button>
            <div className='py-auto'><h2 className="text-2xl font-bold">One Tree Farm</h2></div>
            
    </div>

      <div className="p-4 pb-32">
        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg">
              <div className="w-20 h-20 relative">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">Best match</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold">£{item.price.toFixed(2)}</span>
                  {/* {item.originalPrice && (
                    <span className="text-gray-500 line-through">£{item.originalPrice.toFixed(2)}</span>
                  )} */}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
                
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <>

            {/* Price Breakdown */}
            <div className="bg-white rounded-lg p-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <div className="text-right">
                  {/* <span className="text-gray-500 line-through mr-2">£{(prices.subtotal * 1.1).toFixed(2)}</span> */}
                  <span>£{prices.subtotal.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery fee</span>
                <span>£{prices.deliveryFee.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Fees</span>
                <span>£{prices.fees.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <div className="text-right">
                  {/* <span className="text-gray-500 line-through text-sm mr-2">£{(prices.total * 1.1).toFixed(2)}</span> */}
                  <span>£{prices.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Fixed Bottom Bar */}
      {mounted && items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 space-y-4">
          <Link 
            href="/shop/checkout"
            className="w-full block bg-black text-white py-4 rounded-lg font-medium text-center"
          >
            Go to checkout
          </Link>
        </div>
      )}
    </div>
  );
}
