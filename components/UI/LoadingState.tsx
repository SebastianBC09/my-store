import { FC } from 'react';

interface LoadingStateProps {
  message?: string;
  variant?: 'default' | 'overlay' | 'inline';
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingState: FC<LoadingStateProps> = ({
  message = 'Loading...',
  variant = 'default',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  };
  const variantWrapperClasses = {
    default: 'flex flex-col items-center justify-center py-8',
    overlay:
      'absolute inset-0 flex items-center justify-center bg-[var(--color-bg-primary)] bg-opacity-75 z-[var(--z-modal)]',
    inline: 'flex items-center',
  };

  return (
    <div className={variantWrapperClasses[variant]}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-solid border-[var(--color-primary)] border-t-transparent`}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className="mt-4 text-center text-[var(--color-text-secondary)]">
          {message}
        </p>
      )}
    </div>
  );
};
