import { Product } from '@/types/Product';
import { ProductCategories, ProductCategory } from '@/types/Categories';

export const fetchProducts = async (params?: {
  limit?: number;
  sort?: 'asc' | 'desc';
}): Promise<Product[]> => {
  let url = 'https://fakestoreapi.com/products';
  if (params) {
    const query = new URLSearchParams();
    if (params.limit) query.append('limit', params.limit.toString());
    if (params.sort) query.append('sort', params.sort);
    url += `?${query.toString()}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  return (await response.json()) as Promise<Product[]>;
};

export const fetchProductsById = async (id: string): Promise<Product> => {
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
  params?: { sort?: 'asc' | 'desc' }
): Promise<Product[]> => {
  let url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;
  if (params && params.sort) {
    url += `?sort=${params.sort}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching products for category ${category}`);
  }
  return (await response.json()) as Promise<Product[]>;
};
