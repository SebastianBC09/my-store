'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/Product';
import ProductImage from '@/components/products/ProductImage';
import { useCart } from '@/context/Cart/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addProduct } = useCart();

  const { id, title, price, description, image, rating, category } = product;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card-bg)] shadow-sm transition-all duration-500 ease-in-out hover:shadow-xl sm:h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-2 left-2 z-10">
        <span className="inline-flex items-center rounded-full bg-[var(--color-status-success-bg)] px-2 py-1 text-xs font-medium text-[var(--color-status-success-text)] transition-all duration-300 ease-in-out">
          <span className="mr-1">⚡</span> New
        </span>
      </div>

      {rating && (
        <div
          className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-full bg-[var(--color-product-rating)] px-2 py-1 text-xs font-semibold text-white opacity-0 shadow-md transition-all duration-500 ease-in-out group-hover:opacity-100"
          aria-label={`Rating: ${rating.rate.toFixed(1)}`}
        >
          <span className="animate-pulse">★</span>
          <span>{rating.rate.toFixed(1)}</span>
        </div>
      )}

      <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-[var(--color-bg-tertiary)] p-4 sm:h-56 md:h-64">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--color-card-border)] border-t-[var(--color-product-price)]"></div>
          </div>
        )}

        <div
          className={`relative h-full w-full transition-all duration-700 ease-in-out ${
            isLoading ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
        >
          <ProductImage
            src={image}
            alt={title}
            error={error}
            isLoading={isLoading}
            handleLoad={handleLoad}
            handleError={handleError}
            priority={false}
          />
        </div>

        <div className="bg-opacity-0 group-hover:bg-opacity-20 absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100">
          <div className="flex translate-y-4 gap-2 transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            <button
              aria-label={`Quick view ${title}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 shadow-md transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white"
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
            <button
              aria-label={`Add ${title} to wishlist`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 shadow-md transition-all duration-300 hover:bg-[var(--color-error)] hover:text-white"
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1">
          <span className="inline-block rounded-full bg-[var(--color-badge-bg)] px-2 py-1 text-xs font-medium text-[var(--color-badge-text)] capitalize">
            {category}
          </span>
        </div>

        <h3 className="mb-1 line-clamp-1 text-base font-medium text-[var(--color-product-title)] transition-colors duration-300 sm:text-lg md:text-lg">
          {title}
        </h3>

        <div className="mb-3 line-clamp-2 min-h-[2.5rem] text-xs text-[var(--color-text-secondary)] sm:text-sm">
          {description && description.substring(0, 75)}
          {description && description.length > 75 ? '...' : ''}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <p className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-[var(--color-product-price)]">
                ${price.toFixed(2)}
              </span>
            </p>
            <div className="flex items-center text-xs text-[var(--color-text-secondary)]">
              <span className="mr-1 text-[var(--color-product-rating)]">★</span>
              <span>{rating?.count} reviews</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            href={`/products/${id}`}
            className="flex flex-1 items-center justify-center rounded bg-[var(--color-button-primary-bg)] px-3 py-2 text-sm font-medium text-[var(--color-button-primary-text)] transition-all duration-300 ease-in-out hover:bg-[var(--color-button-primary-hover)] hover:shadow-md focus:ring-2 focus:ring-[var(--color-primary-light)] focus:ring-offset-2 focus:outline-none"
            aria-label={`View details of ${title}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1.5 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            View Details
          </Link>

          <button
            aria-label={`Add ${title} to cart`}
            className="flex items-center justify-center rounded border border-[var(--color-card-border)] bg-[var(--color-card-bg)] px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-all duration-300 ease-in-out hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-product-price)] focus:ring-2 focus:ring-[var(--color-primary-light)] focus:ring-offset-2 focus:outline-none sm:px-2"
            onClick={() => addProduct(id, 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:scale-110"
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
            <span className="ml-1 hidden sm:inline">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
