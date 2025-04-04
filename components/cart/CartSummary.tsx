import { FC } from 'react';
import Link from 'next/link';
import { CartItemWithDetails } from '@/types/Carts';

const CartSummary: FC<{
  items: CartItemWithDetails[];
  onCheckout: () => void;
}> = ({ items, onCheckout }) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const taxRate = 0.16;
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  return (
    <div className="mt-6 rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 shadow-sm">
      <h2 className="text-lg font-medium text-[var(--color-text-primary)]">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--color-text-secondary)]">Subtotal</p>
          <p className="text-sm font-medium text-[var(--color-text-primary)]">
            ${subtotal.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Taxes (16%)
          </p>
          <p className="text-sm font-medium text-[var(--color-text-primary)]">
            ${taxes.toFixed(2)}
          </p>
        </div>

        <div className="border-t border-[var(--color-card-border)] pt-4">
          <div className="flex items-center justify-between">
            <p className="text-base font-medium text-[var(--color-text-primary)]">
              Total
            </p>
            <p className="text-lg font-bold text-[var(--color-product-price)]">
              ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="mt-6 w-full rounded-md bg-[var(--color-button-primary-bg)] px-6 py-3 text-center text-sm font-medium text-[var(--color-button-primary-text)] shadow-sm transition-all duration-300 hover:bg-[var(--color-button-primary-hover)] hover:shadow-md focus:ring-2 focus:ring-[var(--color-primary-light)] focus:ring-offset-2 focus:outline-none"
      >
        Proceed to Checkout
      </button>

      <div className="mt-4 text-center">
        <Link
          href="/products"
          className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
        >
          or Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
