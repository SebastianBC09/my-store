'use client';

import { useQuery } from '@tanstack/react-query';
import { ErrorState } from '@/components/UI/ErrorState';
import { LoadingState } from '@/components/UI/LoadingState';
import ProductsGrid from '@/components/products/ProductsGrid';
import ProductCard from '@/components/products/ProductCard';
import { fetchProducts } from '@/lib/api';
import { Product } from '@/types/Product';

export default function Page() {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <LoadingState message="Loading products..." />;
  }

  if (error || !data) {
    return (
      <ErrorState
        title="Failed to load products"
        message="We couldn't load the products. Please try again later."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
            Todos los productos
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {data.length} producto{data.length !== 1 ? 's' : ''} disponible
            {data.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            defaultValue="all"
          >
            <option value="all">Todas las categorías</option>
            <option value="electronics">Electrónica</option>
            <option value="clothing">Ropa</option>
            <option value="home">Hogar</option>
          </select>
        </div>
      </div>
      <ProductsGrid>
        {data.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductsGrid>
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center space-x-1">
          <button className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-medium text-white">
            1
          </button>
          <button className="rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
            2
          </button>
          <button className="rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
            3
          </button>
          <span className="px-2 text-gray-500 dark:text-gray-400">...</span>

          <button className="rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
            8
          </button>
          <button className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
}
