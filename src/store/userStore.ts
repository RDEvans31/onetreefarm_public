import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserStore, UserAddress, BillingAddress } from './types';

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      shippingAddress: undefined,
      billingAddress: undefined,
      setShippingAddress: (address: UserAddress | undefined) =>
        set({ shippingAddress: address }),
      setBillingAddress: (address: BillingAddress | undefined) =>
        set({ billingAddress: address }),
      clearAddresses: () =>
        set({ shippingAddress: undefined, billingAddress: undefined }),
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;
