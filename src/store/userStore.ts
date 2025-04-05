import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserStore, UserAddress } from './types';

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      shippingAddress: null,
      billingAddress: null,
      setShippingAddress: (address: UserAddress) =>
        set({ shippingAddress: address }),
      setBillingAddress: (address: UserAddress) =>
        set({ billingAddress: address }),
      clearAddresses: () =>
        set({ shippingAddress: null, billingAddress: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;
