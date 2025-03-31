'use client';

import { useCartStore } from '@/store';
import { ArrowLeft, ChevronRight, Clock, MapPin, Phone, Tag, User } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  const subtotal = getTotal();
  const deliveryFee = subtotal > 100 ? 0 : 0.29;
  const fees = subtotal * 0.05;
  const total = subtotal + deliveryFee + fees;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-40">
        <div className="px-4 py-3 flex items-center">
          <Link href="/shop/cart" className="text-black">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-semibold flex-1 text-center">Checkout</h1>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-32">
        {/* Map Section */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="h-48 bg-gray-200 relative">
            {/* Add your map component here */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              Map placeholder
            </div>
            <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow">
              Edit pin
            </button>
          </div>
          
          {/* Address */}
          <div className="p-4 space-y-4">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1" />
              <div className="flex-1">
                <h3 className="font-medium">1 Myrtle Road</h3>
                <p className="text-gray-600">Cabot, Bristol, Bristol, Avon, England, BS2 8BL</p>
                <div className="mt-1 inline-block bg-yellow-50 text-yellow-800 text-sm px-2 py-1 rounded">
                  Address seems far away
                </div>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>

            {/* Delivery Instructions */}
            <div className="flex items-start gap-4">
              <User />
              <div className="flex-1">
                <h3 className="font-medium">Meet at my door</h3>
                <p className="text-green-600">Add delivery instructions & photos</p>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <Phone />
              <div className="flex-1">
                <h3 className="font-medium">+44 7482 400662</h3>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Delivery Time */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock />
            <h2 className="font-medium">Delivery time</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Standard</h3>
              <p className="text-gray-500">Currently closed</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Schedule</h3>
              <p className="text-gray-500">Choose a time</p>
              <p className="text-green-600 text-sm">Up to £1.50 off</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
                <Image 
                  src="/otf-logo.svg" 
                  alt="One Tree Farm" 
                  width={48} 
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">One Tree Farm</h3>
                <p className="text-gray-500">{items.length} items</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>

          {/* Gift Option */}
          <div className="flex items-center justify-between py-4 border-t">
            <div className="flex items-center gap-3">
              <div className="text-pink-500">🎁</div>
              <div>
                <h3 className="font-medium">Send as a gift</h3>
                <p className="text-gray-500">With a personalised Mother&apos;s Day card</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>

          {/* Promo Code */}
          <div className="flex items-center justify-between py-4 border-t">
            <div className="flex items-center gap-3">
              <Tag />
              <h3 className="font-medium">Add promo code</h3>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <div>
                <span className="text-gray-500 line-through mr-2">£{(subtotal * 1.1).toFixed(2)}</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery fee</span>
              <span>£{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fees</span>
              <span>£{fees.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <div>
                <span className="text-gray-500 line-through text-sm mr-2">£{(total * 1.1).toFixed(2)}</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Image 
                src="/mastercard.svg" 
                alt="Mastercard" 
                width={32} 
                height={20} 
              />
              <span>Mastercard ••••0884</span>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
          <div className="flex items-center justify-between p-4">
            <div>
              <h3 className="font-medium">Request an invoice</h3>
              <p className="text-gray-500">Add tax details</p>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
        </div>

        <p className="text-gray-500 text-sm">
          Promotions: Promotions are estimates, not guaranteed, and may depend on item and promotion availability in the shop.
        </p>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 space-y-4">
        <div className="bg-red-600 text-white p-3 rounded-lg text-center">
          Saving £{(total * 0.1).toFixed(2)} with promotions
        </div>
        <button className="w-full bg-black text-white py-4 rounded-lg font-medium">
          Next
        </button>
      </div>
    </div>
  );
}
