import { Product } from '@/types/Product';
import { ProductCategories, ProductCategory } from '@/types/Categories';

export const fetchProducts = async (params?: {
  limit?: number;
}): Promise<Product[]> => {
  let url = 'https://fakestoreapi.com/products';
  if (params && params.limit) {
    url += `?${params.limit}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  return (await response.json()) as Promise<Product[]>;
};

export const fetchProductsById = async (
  id: string | number
): Promise<Product> => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) {
    throw new Error(`Error fetching product with id ${id}`);
  }
  return (await response.json()) as Promise<Product>;
};

export const fetchCategories = async (): Promise<ProductCategories> => {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  if (!response.ok) {
    throw new Error('Error fetching product categories');
  }
  return (await response.json()) as Promise<ProductCategories>;
};

export const fetchProductsByCategory = async (
  category: ProductCategory,
  params?: { limit?: number }
): Promise<Product[]> => {
  let url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;
  if (params && params.limit) {
    url += `?${params.limit}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching products for category ${category}`);
  }
  return (await response.json()) as Promise<Product[]>;
};
