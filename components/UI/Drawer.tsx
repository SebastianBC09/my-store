import React, { FC, useState, useEffect } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const Drawer: FC<DrawerProps> = ({
  isOpen,
  onClose,
  title = 'Menu',
  children,
}) => {
  const [animationState, setAnimationState] = useState('closed');

  useEffect(() => {
    if (isOpen) {
      setAnimationState('opening');
      const timer = setTimeout(() => setAnimationState('open'), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimationState('closing');
      const timer = setTimeout(() => setAnimationState('closed'), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (animationState === 'closed') {
    return null;
  }

  return (
    <div className="fixed inset-0 flex" style={{ zIndex: 200 }}>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          animationState === 'open' ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed right-0 h-full w-full max-w-sm overflow-auto bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] shadow-xl transition-transform duration-300 ease-in-out md:max-w-md lg:max-w-lg ${
          animationState === 'open' || animationState === 'opening'
            ? 'translate-x-0'
            : 'translate-x-full'
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--color-border-primary)] bg-[var(--color-header-bg)] p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="hover:bg-opacity-10 rounded-full p-2 transition-colors hover:bg-[var(--color-button-tertiary-bg)]"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto p-4">{children}</div>

        <div className="absolute right-0 bottom-0 left-0 border-t border-[var(--color-border-primary)] p-4">
          <div className="flex flex-col space-y-4">
            <button className="w-full rounded-lg bg-[var(--color-button-primary-bg)] px-4 py-3 text-[var(--color-button-primary-text)] transition-colors hover:bg-[var(--color-button-primary-hover)]">
              Sign In
            </button>
            <button className="w-full rounded-lg border border-[var(--color-button-secondary-border)] bg-[var(--color-button-secondary-bg)] px-4 py-3 text-[var(--color-button-secondary-text)] transition-colors hover:bg-[var(--color-button-secondary-hover)]">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
