import { ChangeEvent, FC } from 'react';

const QuantityControl: FC<{
  quantity: number;
  onChange: (newQuantity: number) => void;
}> = ({ quantity, onChange }) => {
  const handleDecrease = () => onChange(quantity - 1);
  const handleIncrease = () => onChange(quantity + 1);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      onChange(1);
      return;
    }

    if (/^\d+$/.test(value)) {
      onChange(parseInt(value) || 1);
    }
  };

  return (
    <div className="flex items-center rounded border border-[var(--color-card-border)]">
      <button
        onClick={handleDecrease}
        disabled={quantity <= 1}
        className="flex h-8 w-8 items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Decrease quantity"
      >
        <span className="text-lg font-medium">-</span>
      </button>
      <div className="flex w-10 items-center justify-center border-x border-[var(--color-card-border)]">
        <input
          type="text"
          min="1"
          value={quantity}
          onChange={handleInputChange}
          className="w-full bg-transparent py-1 text-center text-sm focus:outline-none"
          aria-label="Quantity"
        />
      </div>
      <button
        onClick={handleIncrease}
        className="flex h-8 w-8 items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
        aria-label="Increase quantity"
      >
        <span className="text-lg font-medium">+</span>
      </button>
    </div>
  );
};

export default QuantityControl;
