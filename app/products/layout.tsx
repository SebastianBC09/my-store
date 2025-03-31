import { ReactNode } from 'react';
import MainLayout from '@/layout/MainLayout';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export default function ProductsLayout({ children }: LayoutProps) {
  return (
    <MainLayout>
      <section className="w-full py-8">
        <div className="container mx-auto mb-6 px-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Inicio
                </Link>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                    Productos
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="container mx-auto mb-8 px-4">
          <div className="overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg dark:from-indigo-700 dark:to-purple-900">
            <div className="relative px-8 py-12 md:px-12">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10"></div>
              <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-white/10"></div>

              <div className="relative z-10 max-w-xl">
                <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  Catálogo de Productos
                </h1>
                <p className="mb-6 text-lg text-indigo-100">
                  Explora nuestra colección de productos de la más alta calidad.
                  Envío gratis en compras mayores a $50.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-indigo-600 shadow-md hover:bg-gray-100 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 focus:outline-none">
                    Explorar ofertas
                  </button>
                  <button className="rounded-lg border border-white bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 focus:outline-none">
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
