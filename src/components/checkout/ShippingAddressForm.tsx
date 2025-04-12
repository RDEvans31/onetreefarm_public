'use client';

import { useForm } from 'react-hook-form';
import { WooCommerceAddressResponse } from '@/types/woocommerce-order-response';
import { useState, useEffect } from 'react';
import { ChevronUp, MapPin, ChevronRight } from 'lucide-react';
import { useUserStore } from '@/store';

export function ShippingAddressForm() {
  const [isOpen, setIsOpen] = useState(false);
  const { shippingAddress, setShippingAddress } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<WooCommerceAddressResponse>({
    defaultValues: shippingAddress || {
      first_name: '',
      last_name: '',
      address_1: '',
      city: '',
      state: '',
      postcode: '',
      country: 'GB',
    },
  });

  useEffect(() => {
    if (shippingAddress) {
      reset(shippingAddress);
    }
  }, [shippingAddress, reset]);

  const formData = watch();
  const hasAddress = formData.address_1 !== '';

  const onSubmit = (data: WooCommerceAddressResponse) => {
    setShippingAddress(data);
    setIsOpen(false);
  };

  return (
    <div className="flex items-start gap-4">
      <MapPin size={20} className="mt-1" />
      {!isOpen ? (
        <>
          <div className="flex-1">
            <h3 className="font-medium">Shipping Address</h3>
            {hasAddress ? (
              <>
                <h3 className="font-medium">{formData.address_1}</h3>
                <p className="text-gray-600">
                  {formData.city}, {formData.state} {formData.postcode}
                </p>
              </>
            ) : (
              <p className="text-green-600 mt-2">Add shipping address</p>
            )}
          </div>
          <button onClick={() => setIsOpen(!isOpen)}>
            <ChevronRight size={20} />
          </button>
        </>
      ) : (
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-between">
              <h3 className="font-medium">Shipping Address</h3>
              <button onClick={() => setIsOpen(!isOpen)}>
                <ChevronUp size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  {...register('first_name', {
                    required: 'First name is required',
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.first_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  {...register('last_name', {
                    required: 'Last name is required',
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.last_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                {...register('address_1', { required: 'Address is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.address_1 && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.address_1.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  {...register('city', { required: 'City is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  {...register('state', { required: 'State is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Postcode
                </label>
                <input
                  {...register('postcode', {
                    required: 'Postcode is required',
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.postcode && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.postcode.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <select
                  {...register('country', { required: 'Country is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                </select>
                {errors.country && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full block bg-black text-white py-4 rounded-lg font-medium text-center"
            >
              Save Shipping Address
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
