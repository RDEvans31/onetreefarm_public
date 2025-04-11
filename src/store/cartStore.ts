import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartStore } from './types';

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      orderId: undefined,
      setOrderId: (id: number | undefined) => set({ orderId: id }),
      items: [],
      addItem: item =>
        set(state => {
          const existing = state.items.find(i => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      removeItem: id =>
        set(state => ({
          items: state.items.filter(item => item.id !== id),
        })),
      updateQuantity: (id: number, quantity: number) =>
        set(state => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [], orderId: undefined }),
      getTotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
