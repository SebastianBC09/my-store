'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ProductImage from '@/components/products/ProductImage';
import ProductCard from '@/components/products/ProductCard';
import { ErrorState } from '@/components/UI/ErrorState';
import { LoadingState } from '@/components/UI/LoadingState';
import { fetchProductsByCategory, fetchProductsById } from '@/lib/api';
import { Product } from '@/types/Product';
import { ProductCategory } from '@/types/Categories';
import { useCart } from '@/context/Cart/CartContext';

export default function Page() {
  const [quantity, setQuantity] = useState(1);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const queryClient = useQueryClient();
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);
  const { addProduct } = useCart();

  const {
    data: productData,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    refetch: refetchProduct,
  } = useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductsById(productId),
  });

  const { data: relatedProductsData, isLoading: isLoadingRelatedProducts } =
    useQuery<Product[]>({
      queryKey: ['products', productData?.category],
      queryFn: () => {
        if (!productData?.category) return Promise.resolve([]);

        const cached = queryClient.getQueryData<Product[]>([
          'products',
          productData.category,
        ]);

        return (
          cached ||
          fetchProductsByCategory(productData.category as ProductCategory)
        );
      },
      enabled: !!productData?.category,
      select: (data) => data.filter((p) => p.id !== productId).slice(0, 4),
    });

  if (isLoadingProduct) {
    return (
      <div className="w-full">
        <LoadingState
          message="Loading product..."
          variant="default"
          size="md"
        />
      </div>
    );
  }

  if (isErrorProduct || !productData) {
    return (
      <div className="w-full">
        <ErrorState
          title="Error loading product"
          message="We couldn't load the product details. Please try again later."
          onRetry={() => refetchProduct()}
          variant="default"
        />
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Product Detail Section */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6">
          <div className="absolute top-4 right-4 z-10 rounded-full bg-[var(--color-product-rating)] px-2 py-1 text-xs font-medium text-white">
            ★ {productData.rating?.rate.toFixed(1)}
          </div>
          <div className="relative mb-4 flex h-80 items-center justify-center overflow-hidden rounded bg-white">
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--color-card-border)] border-t-[var(--color-product-price)]"></div>
              </div>
            )}
            <div
              className={`relative h-full w-full transition-opacity duration-300 ${
                isImageLoading ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <ProductImage
                src={productData.image}
                alt={productData.title}
                error={imageError}
                isLoading={isImageLoading}
                handleLoad={() => setIsImageLoading(false)}
                handleError={() => {
                  setIsImageLoading(false);
                  setImageError(true);
                }}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <span className="inline-block rounded-full bg-[var(--color-badge-bg)] px-3 py-1 text-sm font-medium text-[var(--color-badge-text)] capitalize">
              {productData.category}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)] md:text-3xl">
            {productData.title}
          </h1>
          <div className="mb-4 flex items-center space-x-4">
            <p className="text-2xl font-bold text-[var(--color-product-price)]">
              ${productData.price.toFixed(2)}
            </p>
            <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
              <span className="mr-1 text-[var(--color-product-rating)]">★</span>
              <span>
                {productData.rating?.rate.toFixed(1)} (
                {productData.rating?.count} reviews)
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-lg font-medium text-[var(--color-text-primary)]">
              Description:
            </h3>
            <p className="text-[var(--color-text-secondary)]">
              {productData.description}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-lg font-medium text-[var(--color-text-primary)]">
              Quantity:
            </h3>
            <div className="flex items-center space-x-3">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-card-border)] text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-product-price)] hover:text-[var(--color-product-price)]"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <span className="w-8 text-center text-lg font-medium text-[var(--color-text-primary)]">
                {quantity}
              </span>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-card-border)] text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-product-price)] hover:text-[var(--color-product-price)]"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-auto flex flex-col space-y-4">
            <button
              onClick={() => addProduct(productId, quantity)}
              className="flex items-center justify-center rounded-lg bg-[var(--color-product-price)] px-6 py-3 text-lg font-medium text-white transition-all hover:bg-[var(--color-primary-dark)] focus:ring-2 focus:ring-[var(--color-primary-dark)] focus:ring-offset-2 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5"
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
              Add to Cart
            </button>
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center rounded-lg border border-[var(--color-card-border)] bg-transparent px-6 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-all hover:bg-[var(--color-gray-100)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Products
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-xl font-bold text-[var(--color-text-primary)]">
          Related Products
        </h2>
        {isLoadingRelatedProducts ? (
          <div className="flex justify-center py-8">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--color-card-border)] border-t-[var(--color-product-price)]"></div>
          </div>
        ) : relatedProductsData && relatedProductsData.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProductsData
              .filter((relatedProduct) => relatedProduct.id !== productData.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
          </div>
        ) : (
          <p className="py-4 text-center text-[var(--color-text-secondary)]">
            No related products available
          </p>
        )}
      </div>
    </div>
  );
}
