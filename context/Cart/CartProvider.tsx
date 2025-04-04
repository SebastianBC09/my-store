'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CartContext, { CartContextValue } from './CartContext';
import { Cart } from '@/types/Carts';

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const queryClient = useQueryClient();
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  // MUTACIÓN: Agregar producto
  const addProductMutation = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => {
      // Simula la lógica de agregar producto.
      // Si no hay carrito, se crea uno nuevo.
      const newCart: Cart = cart
        ? { ...cart }
        : { id: 1, userId: 1, date: new Date().toISOString(), products: [] };

      const index = newCart.products.findIndex(
        (p) => p.productId === productId
      );
      if (index >= 0) {
        newCart.products[index].quantity += quantity;
      } else {
        newCart.products.push({ productId, quantity });
      }
      return newCart;
    },
    onSuccess: (data) => {
      setCart(data);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // MUTACIÓN: Actualizar producto
  const updateProductMutation = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => {
      if (!cart) throw new Error('Cart not available');
      const newCart: Cart = {
        ...cart,
        products: cart.products.map((p) =>
          p.productId === productId ? { ...p, quantity } : p
        ),
      };
      return newCart;
    },
    onSuccess: (data) => {
      setCart(data);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // MUTACIÓN: Eliminar producto
  const removeProductMutation = useMutation({
    mutationFn: async ({ productId }: { productId: number }) => {
      if (!cart) throw new Error('Cart not available');
      const newCart: Cart = {
        ...cart,
        products: cart.products.filter((p) => p.productId !== productId),
      };
      return newCart;
    },
    onSuccess: (data) => {
      setCart(data);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // MUTACIÓN: Limpiar el carrito
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      // Simula la eliminación completa del carrito
      return null;
    },
    onSuccess: () => {
      setCart(null);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const addProduct = async (productId: number, quantity: number = 1) => {
    await addProductMutation.mutateAsync({ productId, quantity });
  };

  const updateProduct = async (productId: number, quantity: number) => {
    await updateProductMutation.mutateAsync({ productId, quantity });
  };

  const removeProduct = async (productId: number) => {
    await removeProductMutation.mutateAsync({ productId });
  };

  const clearCart = async () => {
    await clearCartMutation.mutateAsync();
  };

  const value: CartContextValue = {
    cart,
    addProduct,
    updateProduct,
    removeProduct,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
