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
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-500"></div>
        </div>
      )}

      {error ? (
        <div className="flex h-full w-full items-center justify-center bg-gray-100 p-4 dark:bg-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {alt || 'Image not available'}
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={`max-h-full w-auto object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default ProductImage;
