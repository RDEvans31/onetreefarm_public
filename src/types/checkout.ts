import { CartItem } from '@/store/types';

export type Items = CartItem[];

export type CreatePaymentIntentPostRequestBody = {
  items: Items;
  deliveryFee: number;
  fees: number;
};
