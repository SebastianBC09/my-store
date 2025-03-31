'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/Product';
import ProductImage from '@/components/products/ProductImage';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      }}
    >
      <div className="relative mb-3 flex h-48 items-center justify-center overflow-hidden rounded bg-gray-100 p-4 dark:bg-gray-700">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
          </div>
        )}
        <ProductImage
          src={product.image}
          alt={product.title}
          error={error}
          isLoading={isLoading}
          handleLoad={handleLoad}
          handleError={handleError}
        />
      </div>

      <div>
        <h3 className="mb-1 line-clamp-1 text-lg font-medium text-gray-800 dark:text-gray-100">
          {product.title}
        </h3>

        <div className="mb-2 line-clamp-2 h-10 text-sm text-gray-500 dark:text-gray-400">
          {product.description && product.description.substring(0, 60)}
          {product.description && product.description.length > 60 ? '...' : ''}
        </div>

        <div className="flex items-baseline">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <div className="mt-3 flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex flex-1 items-center justify-center rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none dark:ring-offset-gray-800"
          >
            Ver Detalle
          </Link>

          <button
            aria-label="Add to cart"
            className="flex items-center justify-center rounded border border-gray-300 bg-white p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
