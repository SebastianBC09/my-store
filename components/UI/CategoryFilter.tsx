import { FC } from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex items-center gap-4">
      <label
        htmlFor="category-filter"
        className="text-sm font-medium text-[var(--color-text-primary)]"
      >
        Category:
      </label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-md border border-[var(--color-input-border)] bg-[var(--color-input-bg)] px-3 py-2 text-sm text-[var(--color-input-text)] focus:border-[var(--color-input-focus-border)] focus:ring-1 focus:ring-[var(--color-input-focus-border)]"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};
