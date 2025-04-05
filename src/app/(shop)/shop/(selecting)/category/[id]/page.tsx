import { WooCommerceProduct } from '@/types/woocommerce';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProductCard } from '@/components/CardProduct';
import { WOOCOMMERCE_API_URL, getWooCommerceAuth } from '@/lib/woocommerce';

async function getProducts(categoryId: string): Promise<WooCommerceProduct[]> {
  const res = await fetch(
    `${WOOCOMMERCE_API_URL}/products?category=${categoryId}&per_page=100`,
    {
      headers: {
        Authorization: `Basic ${getWooCommerceAuth()}`,
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

async function getProductVariations(
  productId: number
): Promise<WooCommerceProduct[]> {
  const res = await fetch(
    `${WOOCOMMERCE_API_URL}/products/${productId}/variations`,
    {
      headers: {
        Authorization: `Basic ${getWooCommerceAuth()}`,
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch variations for product ${productId}`);
  }

  return res.json();
}

async function getCategory(categoryId: string) {
  const res = await fetch(
    `${WOOCOMMERCE_API_URL}/products/categories/${categoryId}`,
    {
      headers: {
        Authorization: `Basic ${getWooCommerceAuth()}`,
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch category');
  }

  return res.json();
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // First fetch products and category

  const id = (await params).id;

  const [initialProducts, category] = await Promise.all([
    getProducts(id),
    getCategory(id),
  ]);

  // Then fetch variations for each variable product
  const productsWithVariations = await Promise.all(
    initialProducts.map(async product => {
      if (product.type === 'variable') {
        const variations = await getProductVariations(product.id);
        // Sort variations by price (lowest first)
        const sortedVariations = variations.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );

        // Filter to only include in-stock variations
        const inStockVariations = sortedVariations.filter(
          variation => variation.stock_status === 'instock'
        );

        // Only use in-stock variations if there are any, otherwise use all sorted variations
        const processedVariations =
          inStockVariations.length > 0 ? inStockVariations : sortedVariations;
        return { ...product, variations: processedVariations };
      }
      return product;
    })
  );

  return (
    <div className="min-h-screen bg-white px-4 pt-4">
      {/* Back Button and Category Name */}
      <div className="flex items-center mb-6">
        <Link href="/shop" className="p-2 bg-white rounded-full shadow">
          <ArrowLeft className="text-gray-700" size={24} />
        </Link>
        <h1 className="ml-4 text-xl font-semibold text-gray-900">
          {category.name}
        </h1>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4">
        {productsWithVariations.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
