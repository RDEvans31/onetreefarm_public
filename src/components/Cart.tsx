'use client';

import { useCartStore } from '@/store';
import { ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  if (items.length === 0) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white transition-colors"
      >
        <ShoppingCart size={24} className="text-black" />
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white transition-colors relative"
      >
        <ShoppingCart size={24} className="text-black" />
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {items.length}
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Shopping Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-4 border-b"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">£{item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={item.quantity}
                      onChange={e =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                      className="border rounded p-1"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total:</span>
                <span className="font-bold">£{getTotal().toFixed(2)}</span>
              </div>
              <button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
