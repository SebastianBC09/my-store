'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProducts } from '@/lib/api';
import { Product } from '@/types/Product';

export default function Page() {
  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex justify-center py-12">
        <p>Error al cargar los productos.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((product: Product) => (
        <div
          key={product.id}
          className="rounded border border-gray-200 p-4 shadow transition-shadow hover:shadow-lg"
        >
          <Image
            src={product.image}
            alt={product.title}
            className="mb-2 h-40 w-full object-contain"
            width={150}
            height={150}
          />
          <h3 className="mb-1 text-lg font-medium">{product.title}</h3>
          <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
          <Link
            href={`/productos/${product.id}`}
            className="mt-2 inline-block rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
          >
            Ver Detalle
          </Link>
        </div>
      ))}
    </div>
  );
}
