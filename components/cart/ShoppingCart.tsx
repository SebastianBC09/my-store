import { FC, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import CartItemCard from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { CartItem, CartItemWithDetails } from '@/types/Carts';
import { Product } from '@/types/Product';
import { fetchProducts } from '@/lib/api';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

const ShoppingCart: FC<CartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}) => {
  const [isClient, setIsClient] = useState(false);

  const { data: products } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
  });

  const cartItemsWithDetails = useMemo(() => {
    if (!products) return [];
    return items
      .map((item) => {
        const matchingProduct = products.find((p) => p.id === item.productId);
        if (matchingProduct) {
          return {
            ...item,
            product: matchingProduct,
          } as CartItemWithDetails;
        }
        return null;
      })
      .filter((item): item is CartItemWithDetails => item !== null);
  }, [items, products]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient && (!items || items.length === 0)) {
    return (
      <div className="py-2">
        <div className="rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 text-center shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-10 w-10 text-[var(--color-text-secondary)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className="mt-3 text-base font-medium text-[var(--color-text-primary)]">
            Your cart is empty
          </h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            It looks like you haven't added any products to your cart yet.
          </p>
          <div className="mt-4">
            <Link
              href="/products"
              className="inline-flex items-center rounded-md bg-[var(--color-button-primary-bg)] px-3 py-1.5 text-sm font-medium text-[var(--color-button-primary-text)] shadow-sm transition-all duration-300 hover:bg-[var(--color-button-primary-hover)]"
            >
              Explore products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2">
      {/* Cart Items */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm font-medium text-[var(--color-text-secondary)]">
            Products ({items.reduce((count, item) => count + item.quantity, 0)}
            )
          </div>
          {items.length > 0 && (
            <button
              onClick={onClearCart}
              className="text-xs text-[var(--color-error)] hover:text-[var(--color-error-dark)]"
            >
              Empty cart
            </button>
          )}
        </div>

        <div className="max-h-[calc(100vh-280px)] space-y-3 overflow-y-auto pb-2">
          {cartItemsWithDetails.map((item) => (
            <CartItemCard
              key={item?.productId}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      <div className="mt-2 border-t border-[var(--color-card-border)] pt-3">
        <CartSummary items={cartItemsWithDetails} onCheckout={onCheckout} />
      </div>
    </div>
  );
};

export default ShoppingCart;
