import { FC } from 'react';
import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
  isLoading: boolean;
  error: boolean;
  handleLoad: () => void;
  handleError: () => void;
  width?: number;
  height?: number;
  priority?: boolean;
}

const ProductImage: FC<ProductImageProps> = ({
  src,
  alt,
  isLoading,
  error,
  handleLoad,
  handleError,
  width = 300,
  height = 300,
  priority = false,
}) => {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-tertiary)]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--color-gray-300)] border-t-[var(--color-primary)]"></div>
        </div>
      )}

      {error ? (
        <div className="flex h-full w-full flex-col items-center justify-center bg-[var(--color-bg-tertiary)] p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-[var(--color-gray-400)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="mt-3 text-center text-sm text-[var(--color-text-secondary)]">
            {alt || 'Image not available'}
          </span>
          <button
            className="mt-3 rounded-full bg-[var(--color-button-tertiary-bg)] px-3 py-1 text-xs text-[var(--color-button-tertiary-text)] transition-colors duration-300 hover:bg-[var(--color-button-tertiary-hover)]"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={`max-h-full w-auto object-contain transition-all duration-700 ${
            isLoading ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      )}
    </div>
  );
};

export default ProductImage;
