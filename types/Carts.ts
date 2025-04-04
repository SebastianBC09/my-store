import { Product } from './Product';

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface CartItemWithDetails extends CartItem {
  product: Product;
}

export interface Cart {
  id: number;
  userId: number;
  date: string; // ISO date string format
  products: CartItem[];
}

export interface AddCartRequest {
  userId: number;
  products: CartItem[];
}

export interface UpdateCartRequest {
  userId?: number; // Optional for partial updates
  date?: string; // Optional for partial updates
  products?: CartItem[]; // Optional for partial updates
}

export type GetUserCartsResponse = Cart[];

export type AddCartResponse = Cart;

export type UpdateCartResponse = Cart;

export type DeleteCartResponse = Cart;
