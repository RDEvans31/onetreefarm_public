'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';
import { WooCommerceProduct } from '@/types/woocommerce';
import { useState } from 'react';

interface ProductCardProps {
  product: WooCommerceProduct;
}

export function ProductCard({ product }: ProductCardProps) {
    console.log(product.variations);

  const [selectedVariation, setSelectedVariation] = useState<WooCommerceProduct | null>(
    product.variations?.length ? product.variations[0] : null
  );

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', selectedVariation?.id || product.id);
  };

  const displayPrice = selectedVariation?.price || product.price;
  const displayRegularPrice = selectedVariation?.regular_price || product.regular_price;
  const isInStock = selectedVariation ? 
    selectedVariation.stock_status === 'instock' : 
    product.stock_status === 'instock';

  return (
    <div className="flex flex-col">
      {product.images?.[0] && (
        <div className="relative h-40 w-full mb-2">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt || product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
          <p className="text-gray-900 font-bold mt-1">£{parseFloat(displayPrice).toFixed(2)}</p>
          {displayRegularPrice !== displayPrice && (
            <p className="text-gray-500 text-xs line-through">£{parseFloat(displayRegularPrice).toFixed(2)}</p>
          )}
          {isInStock ? (
            <p className="text-green-600 text-xs font-medium">In Stock</p>
          ) : (
            <p className="text-red-600 text-xs font-medium">Out of Stock</p>
          )}
          
          {/* Variations Selector */}
          {product.variations?.length > 0 && (
            <select 
              className="mt-2 text-sm border rounded p-1"
              value={selectedVariation?.id}
              onChange={(e) => {
                const variation = product.variations.find(v => v.id === Number(e.target.value));
                setSelectedVariation(variation || null);
              }}
            >
              {product.variations?.map((variation) => (
                <option key={variation.id} value={variation.id}>
                  {variation.attributes.map(attr => attr.option).join(' - ')}
                </option>
              ))}
            </select>
          )}
        </div>
        <button 
          onClick={handleAddToCart}
          disabled={!isInStock}
          className="p-2 bg-white shadow rounded-full flex-shrink-0 hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Add to cart"
        >
          <Plus size={20} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
} 