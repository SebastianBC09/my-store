import { FC } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const firstPageDisabled = currentPage === 1;
  const lastPageDisabled = currentPage === totalPages;

  return (
    <section aria-label="Pagination">
      <ul className="flex items-center space-x-1">
        <li>
          <button
            className="rounded-md px-2 py-1 text-[var(--color-nav-text)] hover:bg-[var(--color-bg-secondary)]"
            disabled={firstPageDisabled}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous page"
          >
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`rounded-md px-3 py-1 text-sm ${
                page === currentPage
                  ? 'bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-text)]'
                  : 'text-[var(--color-nav-text)] hover:bg-[var(--color-bg-secondary)]'
              }`}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            className="rounded-md px-2 py-1 text-[var(--color-nav-text)] hover:bg-[var(--color-bg-secondary)]"
            disabled={lastPageDisabled}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next page"
          >
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    </section>
  );
};
