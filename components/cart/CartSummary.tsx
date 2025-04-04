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
    <div className="mt-4 rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:mt-6 sm:p-6">
      <h2 className="text-base font-medium text-[var(--color-text-primary)] sm:text-lg">
        Order Summary
      </h2>

      <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-[var(--color-text-secondary)] sm:text-sm">
            Subtotal
          </p>
          <p className="text-xs font-medium text-[var(--color-text-primary)] sm:text-sm">
            ${subtotal.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-[var(--color-text-secondary)] sm:text-sm">
            Taxes (16%)
          </p>
          <p className="text-xs font-medium text-[var(--color-text-primary)] sm:text-sm">
            ${taxes.toFixed(2)}
          </p>
        </div>

        <div className="border-t border-[var(--color-card-border)] pt-3 sm:pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[var(--color-text-primary)] sm:text-base">
              Total
            </p>
            <p className="text-base font-bold text-[var(--color-product-price)] sm:text-lg">
              ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="mt-4 w-full rounded-md bg-[var(--color-button-primary-bg)] px-4 py-2 text-center text-sm font-medium text-[var(--color-button-primary-text)] shadow-sm transition-all duration-300 hover:bg-[var(--color-button-primary-hover)] hover:shadow-md focus:ring-2 focus:ring-[var(--color-primary-light)] focus:ring-offset-2 focus:outline-none sm:mt-6 sm:px-6 sm:py-3"
      >
        Proceed to Checkout
      </button>

      <div className="mt-3 text-center sm:mt-4">
        <Link
          href="/products"
          className="text-xs text-[var(--color-primary)] transition-colors duration-300 hover:text-[var(--color-primary-dark)] sm:text-sm"
        >
          or Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
