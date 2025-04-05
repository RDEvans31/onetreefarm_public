export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  originalPrice?: number;
}

export interface CartStore {
  orderId: number | undefined;
  setOrderId: (id: number | undefined) => void;
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

interface Address {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone?: string;
}

export interface UserAddress extends Address {
  email?: string;
}

export interface BillingAddress extends Address {
  email: string;
}

export interface UserStore {
  shippingAddress: UserAddress | null;
  billingAddress: BillingAddress | null;
  setShippingAddress: (address?: UserAddress) => void;
  setBillingAddress: (address?: UserAddress) => void;
  clearAddresses: () => void;
}
