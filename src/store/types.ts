export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  originalPrice?: number;
};

export type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getTotal: () => number;
  clearCart: () => void;
};
