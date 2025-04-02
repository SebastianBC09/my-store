import { ReactNode } from 'react';
import MainLayout from '@/layout/MainLayout';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <MainLayout>
      <section className="w-full py-8">
        <div className="container mx-auto mb-6 px-4"></div>
        <div className="container mx-auto mb-8 px-4">
          <div className="overflow-hidden rounded-xl bg-[var(--color-button-primary-bg)] shadow-lg">
            <div className="relative px-8 py-12 md:px-12">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10"></div>
              <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-white/10"></div>

              <div className="relative z-10 max-w-xl">
                <h1 className="mb-4 text-3xl font-bold text-[var(--color-button-primary-text)] md:text-4xl">
                  Catálogo de Productos
                </h1>
                <p className="mb-6 text-lg text-[var(--color-button-primary-text)]">
                  Explora nuestra colección de productos de la más alta calidad.
                  Envío gratis en compras mayores a $50.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-lg bg-[var(--color-bg-primary)] px-5 py-2.5 text-sm font-medium text-[var(--color-button-secondary-text)] shadow-md hover:bg-[var(--color-bg-secondary)] focus:ring-2 focus:ring-[var(--color-button-primary-text)] focus:ring-offset-2 focus:ring-offset-[var(--color-button-primary-bg)] focus:outline-none">
                    Explorar ofertas
                  </button>
                  <button className="rounded-lg border border-[var(--color-button-primary-text)] bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--color-button-primary-text)] hover:bg-white/10 focus:ring-2 focus:ring-[var(--color-button-primary-text)] focus:ring-offset-2 focus:ring-offset-[var(--color-button-primary-bg)] focus:outline-none">
                    Ver categorías
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">{children}</div>
      </section>
    </MainLayout>
  );
}
