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

  const { id, title, price, description, image, rating, category } = product;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <div
        className="absolute top-2 right-2 z-10 rounded-full bg-[var(--color-product-rating)] px-2 py-1 text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-label={`Rating: ${rating?.rate.toFixed(1)}`}
      >
        ★ {rating?.rate.toFixed(1)}
      </div>
      <div className="relative mb-3 flex h-48 items-center justify-center overflow-hidden rounded bg-[var(--color-card-bg)] p-4 transition-transform duration-300 group-hover:scale-105">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-card-border)] border-t-[var(--color-product-price)]"></div>
          </div>
        )}
        <div
          className={`relative h-full w-full transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <ProductImage
            src={image}
            alt={title}
            error={error}
            isLoading={isLoading}
            handleLoad={handleLoad}
            handleError={handleError}
          />
        </div>
      </div>
      <div className="mb-2">
        <span className="inline-block rounded-full bg-[var(--color-badge-bg)] px-2 py-1 text-xs font-medium text-[var(--color-badge-text)] capitalize">
          {category}
        </span>
      </div>
      <div className="space-y-2">
        <h3 className="line-clamp-1 text-lg font-medium text-[var(--color-product-title)] transition-colors duration-300 group-hover:text-[var(--color-product-price)]">
          {title}
        </h3>
        <div className="line-clamp-2 h-10 text-sm text-[var(--color-text-secondary)]">
          {description && description.substring(0, 60)}
          {description && description.length > 60 ? '...' : ''}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-[var(--color-product-price)]">
            ${price.toFixed(2)}
          </p>
          <div className="flex items-center text-xs text-[var(--color-text-secondary)]">
            <span className="mr-1 text-[var(--color-product-rating)]">★</span>
            <span>{rating?.count} reviews</span>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <Link
            href={`/products/${id}`}
            className="flex flex-1 items-center justify-center rounded bg-[var(--color-product-price)] px-4 py-2 text-sm font-medium text-[var(--color-text-on-primary)] transition-all duration-300 hover:bg-[var(--color-primary-dark)] hover:shadow-md focus:ring-2 focus:ring-[var(--color-primary-dark)] focus:ring-offset-2 focus:outline-none"
            aria-label={`Ver detalles de ${title}`}
          >
            <span className="mr-1 opacity-0 transition-all duration-300 group-hover:opacity-100">
              👁️{' '}
            </span>
            View Details
          </Link>

          <button
            aria-label={`Agregar ${title} al carrito`}
            className="flex items-center justify-center rounded border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-2 text-[var(--color-text-secondary)] transition-all duration-300 hover:bg-[var(--color-gray-100)] hover:text-[var(--color-product-price)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
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
