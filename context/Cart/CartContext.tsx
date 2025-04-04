'use client';

import { createContext, useContext } from 'react';
import { Cart } from '@/types/Carts';

export interface CartContextValue {
  cart: Cart | null;
  addProduct: (productId: number, quantity?: number) => Promise<void>;
  updateProduct: (productId: number, quantity: number) => Promise<void>;
  removeProduct: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
