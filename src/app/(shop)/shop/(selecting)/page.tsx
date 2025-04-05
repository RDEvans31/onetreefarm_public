import Image from 'next/image';
import { WooCommerceCategory } from '@/types/woocommerce';
import Link from 'next/link';
import { ArrowLeft, MapPinCheck, Search } from 'lucide-react';
import { WOOCOMMERCE_API_URL, getWooCommerceAuth } from '@/lib/woocommerce';

async function getCategories(): Promise<WooCommerceCategory[]> {
  const res = await fetch(
    `${WOOCOMMERCE_API_URL}/products/categories?per_page=100`,
    {
      headers: {
        Authorization: `Basic ${getWooCommerceAuth()}`,
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  return res.json();
}

export default async function ShopPage() {
  const productCategories = await getCategories();
  const displayCategories = productCategories.filter(
    category =>
      category.display === 'products' || category.display === 'default'
  );

  return (
    <div className="relative min-h-screen bg-[#F5F5F5]">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-50 mx-4">
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors">
          <Link href="/" className="text-black">
            <ArrowLeft size={24} />
          </Link>
        </button>

        <div className="flex space-x-2">
          <button className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors">
            <Link href="/search" className="text-black">
              <Search size={24} />
            </Link>
          </button>
        </div>
      </div>

      <div>
        {/* Farm Cover Image */}
        <div className="relative h-48 bg-green-800 w-full">
          <div className="absolute inset-0">
            <Image
              src="https://members.onetreefarm.org/wp-content/uploads/2024/06/74fea7f5-4ac9-4d07-859d-651913fabe98-1.jpg"
              alt="One Tree Farm"
              fill
              className="object-cover"
            />
          </div>

          {/* Farm Logo (Overlapping) */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
              <Image
                src="/otf-logo.png"
                alt="One Tree Farm Logo"
                width={96}
                height={96}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="px-2">
          {/* Farm Information */}
          <div className="pt-16 px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-black">One Tree Farm</h1>
              <div className="flex items-center justify-center mt-2 text-gray-600">
                <span className="flex items-center">4.8 ⭐</span>
                <span className="mx-1">•</span>
                <span className="flex items-center text-green-700 font-medium">
                  <MapPinCheck />
                  Within 10 minute drive
                </span>
              </div>
            </div>

            {/* Order Options */}
            <div className="flex justify-between mt-6">
              <button className="flex-1 py-2 px-6 rounded-full bg-gray-200">
                Delivery
              </button>
              <button className="flex-1 py-2 px-6 rounded-full bg-black text-white">
                Pick-up
              </button>
            </div>

            {/* Delivery Info */}
            <div className="flex mt-4 border-t border-b py-4">
              <div className="flex-1 border-r px-4 py-2">
                <p className="text-lg font-medium">
                  Free Delivery on orders over &pound;100
                </p>
                <p className="text-gray-600 flex items-center">Other fees</p>
              </div>
              <div className="flex-1 px-4 py-2">
                <p className="text-lg font-medium">Pickup</p>
                <p className="text-gray-600 flex items-center">
                  Opening hours: 8am-3pm, Monday-Friday
                </p>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="mt-8 px-4">
            <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {displayCategories.map(category => (
                <Link
                  href={`/shop/category/${category.id}`}
                  key={category.id}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
                >
                  {category.image && (
                    <div className="relative h-32">
                      <Image
                        src={category.image.src}
                        alt={category.image.alt || category.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {category.count} items
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
