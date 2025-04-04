'use client';

import { ReactNode, useEffect } from 'react';
import MainLayout from '@/layout/MainLayout';
import { useQueryClient } from '@tanstack/react-query';
import { fetchCategories } from '@/lib/api';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const isProductDetailPage = pathname && /\/products\/\d+/.test(pathname);

  useEffect(() => {
    queryClient
      .prefetchQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: Infinity,
      })
      .catch((error) => {
        console.error('Prefetch category error', error);
      });
  }, [queryClient]);

  return (
    <MainLayout>
      <section className="w-full">
        {!isProductDetailPage && (
          <div className="container mx-auto mb-8 px-4">
            <div className="overflow-hidden rounded-xl bg-[var(--color-button-primary-bg)] shadow-lg">
              <div className="relative px-8 py-12 md:px-12">
                <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10"></div>
                <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-white/10"></div>

                <div className="relative z-10 max-w-xl">
                  <h1 className="mb-4 text-3xl font-bold text-[var(--color-button-primary-text)] md:text-4xl">
                    Product Catalog
                  </h1>
                  <p className="mb-6 text-lg text-[var(--color-button-primary-text)]">
                    Explore our collection of highest quality products. Free
                    shipping on orders over $50.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className="rounded-lg bg-[var(--color-bg-primary)] px-5 py-2.5 text-sm font-medium text-[var(--color-button-secondary-text)] shadow-md hover:bg-[var(--color-bg-secondary)] focus:ring-2 focus:ring-[var(--color-button-primary-text)] focus:ring-offset-2 focus:ring-offset-[var(--color-button-primary-bg)] focus:outline-none">
                      Explore offers
                    </button>
                    <button className="rounded-lg border border-[var(--color-button-primary-text)] bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--color-button-primary-text)] hover:bg-white/10 focus:ring-2 focus:ring-[var(--color-button-primary-text)] focus:ring-offset-2 focus:ring-offset-[var(--color-button-primary-bg)] focus:outline-none">
                      View categories
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="container mx-auto px-4">{children}</div>
      </section>
    </MainLayout>
  );
}
