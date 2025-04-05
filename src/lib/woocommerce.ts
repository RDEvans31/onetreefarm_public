export const WOOCOMMERCE_API_URL =
  process.env.WOOCOMMERCE_API_URL ||
  'https://members.onetreefarm.org/wp-json/wc/v3';

export function getWooCommerceAuth() {
  const username = process.env.WOOCOMMERCE_KEY || '';
  const password = process.env.WOOCOMMERCE_SECRET || '';
  return Buffer.from(`${username}:${password}`).toString('base64');
}
