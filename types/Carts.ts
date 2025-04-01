export interface CartProduct {
  productId: number;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  date: string; // ISO date string format
  products: CartProduct[];
}

export interface AddCartRequest {
  userId: number;
  products: CartProduct[];
}

export interface UpdateCartRequest {
  userId?: number; // Optional for partial updates
  date?: string; // Optional for partial updates
  products?: CartProduct[]; // Optional for partial updates
}

export type GetUserCartsResponse = Cart[];

export type AddCartResponse = Cart;

export type UpdateCartResponse = Cart;

export type DeleteCartResponse = Cart;
