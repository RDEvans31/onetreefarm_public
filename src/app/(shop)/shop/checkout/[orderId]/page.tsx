import { ArrowLeft, ChevronRight, Phone, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckoutPaymentForm } from '@/components/checkout/CheckoutPaymentForm';
import { BillingAddressForm } from '@/components/checkout/BillingAddressForm';
import { ShippingAddressForm } from '@/components/checkout/ShippingAddressForm';
import {
  WooCommerceLineItemResponse,
  WooCommerceOrderResponse,
} from '@/types/woocommerce-order-response';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ orderId: number }>;
}) {
  let error = undefined;
  const { orderId } = await params;

  const { order: pendingOrder }: { order: WooCommerceOrderResponse } =
    await fetch(`${baseUrl}/api/orders/${orderId}/set-order-pending`, {
      method: 'POST',
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update order');
        return res.json();
      })
      .catch(err => {
        error = err.message;
        console.error(error);
        return null;
      });

  // we use the order existing in the database as a source of truth
  const items = pendingOrder.line_items;
  const shipping_lines = pendingOrder.shipping_lines;
  const feeLines = pendingOrder.fee_lines;
  if (!items) {
    error = 'Could not fetch items in order';
  }
  const subtotal = pendingOrder.line_items?.reduce(
    (sum: number, item: WooCommerceLineItemResponse) =>
      sum + item.price * item.quantity,
    0
  );
  const deliveryFee =
    shipping_lines?.reduce(
      (sum: number, line: any) => sum + parseFloat(line.total),
      0
    ) || 0;
  const fees =
    feeLines?.reduce(
      (sum: number, fee: any) => sum + parseFloat(fee.total),
      0
    ) || 0;
  const total = subtotal + deliveryFee + fees;
  const prices = { subtotal, deliveryFee, fees, total };

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
            <ShippingAddressForm />
            <BillingAddressForm />
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
        {/* <div className="bg-white rounded-lg p-4">
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
        </div> */}

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
            orderId={orderId}
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
