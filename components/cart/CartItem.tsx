'use client';

import { FC, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import QuantityControl from '@/components/cart/QuantityControl';
import { CartItemWithDetails } from '@/types/Carts';

const CartItemCard: FC<{
  item: CartItemWithDetails;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}> = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const { quantity } = item;
  const { id, title, price, image } = item.product;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="flex flex-col border-b border-[var(--color-card-border)] py-4 sm:flex-row sm:items-center">
      <div className="flex w-full items-center sm:hidden">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-[var(--color-bg-tertiary)]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-2"
            sizes="80px"
          />
        </div>
        <div className="ml-4 flex-1">
          <Link
            href={`/products/${id}`}
            className="line-clamp-1 text-sm font-medium text-[var(--color-product-title)] hover:text-[var(--color-primary)]"
          >
            {title}
          </Link>
          <p className="mt-1 text-sm font-semibold text-[var(--color-product-price)]">
            ${price.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-3 flex w-full justify-between sm:mt-0 sm:items-center">
        <div className="hidden sm:flex sm:w-1/2">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-[var(--color-bg-tertiary)]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain p-2"
              sizes="64px"
            />
          </div>
          <div className="ml-4 flex-1">
            <Link
              href={`/products/${id}`}
              className="line-clamp-1 text-sm font-medium text-[var(--color-product-title)] hover:text-[var(--color-primary)]"
            >
              {title}
            </Link>
            <p className="mt-1 text-sm font-semibold text-[var(--color-product-price)]">
              ${price.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:w-1/2 sm:justify-end sm:space-x-6">
          <QuantityControl
            quantity={quantity}
            onChange={handleQuantityChange}
          />
          <div className="flex items-center sm:justify-end">
            <p className="text-sm font-medium text-[var(--color-product-price)]">
              ${(price * quantity).toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => onRemoveItem(id)}
            className="ml-4 text-sm text-[var(--color-error)] hover:text-[var(--color-error-dark)]"
            aria-label={`Remove ${title} from cart`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(CartItemCard);
