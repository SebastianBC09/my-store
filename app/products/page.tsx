'use client';

import { useEffect, useState } from 'react';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { CategoryFilter } from '@/components/UI/CategoryFilter';
import { ErrorState } from '@/components/UI/ErrorState';
import { LoadingState } from '@/components/UI/LoadingState';
import { Pagination } from '@/components/UI/Pagination';
import ProductsGrid from '@/components/products/ProductsGrid';
import ProductCard from '@/components/products/ProductCard';
import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
} from '@/lib/api';
import { Product } from '@/types/Product';
import { ProductCategories, ProductCategory } from '@/types/Categories';

const ITEMS_PER_PAGE = 7;

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | ProductCategory
  >('all');
  const queryClient = useQueryClient();

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useQuery<ProductCategories>({
      queryKey: ['categories'],
      queryFn: fetchCategories,
      staleTime: Infinity,
    });

  useEffect(() => {
    if (categoriesData) {
      categoriesData.forEach((category) => {
        queryClient
          .prefetchQuery({
            queryKey: ['products', category],
            queryFn: () => fetchProductsByCategory(category),
          })
          .catch((error) => {
            console.error('Prefetch category error', error);
          });
      });
    }
  }, [categoriesData, queryClient]);

  const categories = ['all', ...(categoriesData || [])];

  const {
    data: productsData = [],
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    refetch,
  } = useQuery<Product[]>({
    queryKey: ['products', selectedCategory],
    queryFn: () =>
      selectedCategory === 'all'
        ? fetchProducts()
        : fetchProductsByCategory(selectedCategory),
    placeholderData: keepPreviousData,
  });

  const totalPages = Math.ceil(productsData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = productsData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (isLoadingProducts || isLoadingCategories) {
    return (
      <div className="w-full">
        <LoadingState
          message="Loading products..."
          variant="default"
          size="md"
        />
      </div>
    );
  }

  if (isErrorProducts || !productsData) {
    return (
      <div className="w-full">
        <ErrorState
          title="Error loading products"
          message="We could not load the products at this time. Please try again later."
          onRetry={() => refetch()}
          variant="default"
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
            All Products
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {productsData.length} product
            {productsData.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat as 'all' | ProductCategory);
            setCurrentPage(1);
          }}
        />
      </div>
      <ProductsGrid>
        {currentProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductsGrid>
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
