import Image from 'next/image';
import { WooCommerceProduct } from '@/types/woocommerce';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

async function getProducts(categoryId: string): Promise<WooCommerceProduct[]> {
  const username = process.env.WOOCOMMERCE_KEY || '';
  const password = process.env.WOOCOMMERCE_SECRET || '';
  
  const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');
  
  const res = await fetch(`https://members.onetreefarm.org/wp-json/wc/v3/products?category=${categoryId}&per_page=100`, {
    headers: {
      'Authorization': `Basic ${basicAuth}`,
    },
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

async function getCategory(categoryId: string) {
  const username = process.env.WOOCOMMERCE_KEY || '';
  const password = process.env.WOOCOMMERCE_SECRET || '';
  
  const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');
  
  const res = await fetch(`https://members.onetreefarm.org/wp-json/wc/v3/products/?parent_id=${categoryId}&per_page=100`, {
    headers: {
      'Authorization': `Basic ${basicAuth}`,
    },
    next: { revalidate: 1800 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch category');
  }

  return res.json();
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const [products, category] = await Promise.all([
    getProducts(params.id),
    getCategory(params.id)
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center">
            <Link href="/shop" className="p-2 bg-white rounded-full shadow">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="ml-4 text-2xl font-bold">{category.name}</h1>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link href={`/shop/product/${product.id}`} key={product.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
              {product.images?.[0] && (
                <div className="relative h-48">
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt || product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-gray-900">£{parseFloat(product.price).toFixed(2)}</p>
                  {product.stock_status === 'instock' ? (
                    <span className="text-green-600 text-sm">In Stock</span>
                  ) : (
                    <span className="text-red-600 text-sm">Out of Stock</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 