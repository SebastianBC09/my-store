import { FC } from 'react';

const QuantityControl: FC<{
  quantity: number;
  onChange: (newQuantity: number) => void;
}> = ({ quantity, onChange }) => {
  const handleDecrease = () => onChange(quantity - 1);
  const handleIncrease = () => onChange(quantity + 1);

  return (
    <div className="flex items-center rounded border border-[var(--color-card-border)]">
      <button
        onClick={handleDecrease}
        className="px-2 py-1 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => onChange(parseInt(e.target.value) || 1)}
        className="w-12 border-x border-[var(--color-card-border)] bg-transparent py-1 text-center text-sm focus:outline-none"
        aria-label="Quantity"
      />
      <button
        onClick={handleIncrease}
        className="px-2 py-1 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
