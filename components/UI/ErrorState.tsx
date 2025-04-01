import { FC, ReactNode } from 'react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
  onRetry?: () => void;
  variant?: 'default' | 'inline' | 'toast';
}

export const ErrorState: FC<ErrorStateProps> = ({
  title = 'An error occurred',
  message = 'We encountered a problem while processing your request. Please try again.',
  icon,
  onRetry,
  variant = 'default',
}) => {
  const defaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12 text-[var(--color-status-error-text)]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  );

  const variantClasses = {
    default:
      'p-8 rounded-[var(--radius-lg)] bg-[var(--color-status-error-bg)] text-center',
    inline:
      'p-4 rounded-[var(--radius-md)] bg-[var(--color-status-error-bg)] text-left',
    toast:
      'p-4 rounded-[var(--radius-md)] bg-[var(--color-status-error-bg)] shadow-[var(--shadow-lg)] text-left max-w-md',
  };

  return (
    <div className={`${variantClasses[variant]} animate-fadeIn`}>
      <div className="flex flex-col items-center">
        {icon || defaultIcon}
        <h3 className="mt-4 text-lg font-[var(--font-weight-bold)] text-[var(--color-status-error-text)]">
          {title}
        </h3>
        <p className="mt-2 text-[var(--color-text-secondary)]">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 rounded-[var(--radius-md)] bg-[var(--color-button-primary-bg)] px-4 py-2 text-[var(--color-button-primary-text)] transition-colors duration-[var(--transition-base)] hover:bg-[var(--color-button-primary-hover)]"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};
