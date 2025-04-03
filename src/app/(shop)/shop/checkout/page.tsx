'use client';

import { useCartStore } from '@/store';
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { CheckoutPaymentForm } from '@/components/checkout/CheckoutPaymentForm';

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
    // Check for canceled payment
    if (searchParams?.get('canceled')) {
      setError('Payment was canceled. Please try again.');
    }
  }, [searchParams]);

  const prices = useMemo(() => {
    const subtotal = getTotal();
    const deliveryFee = subtotal > 100 ? 0 : 0.29;
    const fees = subtotal * 0.05;
    const total = subtotal + deliveryFee + fees;
    return { subtotal, deliveryFee, fees, total };
  }, [getTotal]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 bg-white border-b z-40">
          <div className="px-4 py-3">
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>
        </div>
        <div className="p-4 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-4 flex justify-center items-center">
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

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
                <p className="text-gray-600">
                  Cabot, Bristol, Bristol, Avon, England, BS2 8BL
                </p>
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
                <p className="text-green-600">
                  Add delivery instructions & photos
                </p>
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

          {/* Price Breakdown */}
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <div>
                <span className="text-gray-500 line-through mr-2">
                  £{(prices.subtotal * 1.1).toFixed(2)}
                </span>
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
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <div>
                <span className="text-gray-500 line-through text-sm mr-2">
                  £{(prices.total * 1.1).toFixed(2)}
                </span>
                <span>£{prices.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg">
          <CheckoutPaymentForm
            items={items}
            deliveryFee={prices.deliveryFee}
            fees={prices.fees}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
