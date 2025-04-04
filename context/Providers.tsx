'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '@/context/Cart/CartProvider';

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutos de datos frescos
        gcTime: 30 * 60 * 1000, // 30 minutos en caché
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
