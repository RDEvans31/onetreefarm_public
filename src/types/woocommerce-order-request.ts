import { WooCommerceOrderResponse } from './woocommerce-order-response';

interface WooCommerceLineItemRequestPayload {
  product_id: number;
  variation_id?: number;
  quantity: number;
  price?: number;
}

export interface WooCommerceOrderRequestPayload
  extends Omit<WooCommerceOrderResponse, 'line_items'> {
  line_items: WooCommerceLineItemRequestPayload[];
}
