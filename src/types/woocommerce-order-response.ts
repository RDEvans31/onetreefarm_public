export interface WooCommerceAddressResponse {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
}

export interface WooCommerceBillingAddressResponse
  extends WooCommerceAddressResponse {
  email: string;
}

export interface WooCommerceLineItemResponse {
  product_id: number;
  variation_id?: number;
  quantity: number;
  price: number;
}

export interface WooCommerceShippingLineResponse {
  method_id: string;
  method_title: string;
  total: string;
}

export interface WooCommerceFeeLineResponse {
  id?: number;
  name: string;
  tax_class?: string;
  tax_status?: string;
  amount: string;
  total: string;
  total_tax?: string;
  taxes?: Array<{
    id: number;
    total: string;
    subtotal: string;
  }>;
  meta_data?: Array<{
    id: number;
    key: string;
    value: string;
  }>;
}

export interface WooCommerceOrderResponse {
  id?: number;
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: WooCommerceAddressResponse;
  shipping: WooCommerceAddressResponse;
  line_items: WooCommerceLineItemResponse[];
  shipping_lines: WooCommerceShippingLineResponse[];
  fee_lines: WooCommerceFeeLineResponse[];
}
