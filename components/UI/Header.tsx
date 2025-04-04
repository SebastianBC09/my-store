import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeSwitch from '@/components/UI/ThemeSwitch';

interface HeaderProps {
  onOpenCart: () => void;
  cartItemsCount: number;
}

const Header: FC<HeaderProps> = ({ onOpenCart, cartItemsCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-opacity-95 py-2 shadow-lg backdrop-blur-sm' : 'py-4'
      } border-b border-[var(--color-header-border)] bg-[var(--color-header-bg)] text-[var(--color-header-text)]`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-logo-bg)] transition-colors duration-300 group-hover:bg-[var(--color-logo-hover)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[var(--color-logo-icon)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h1 className="transform text-xl font-bold transition-transform duration-300 group-hover:translate-x-1">
              MyStore
            </h1>
          </Link>

          <nav className="hidden items-center space-x-8 md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="border-b-2 font-medium text-[var(--color-nav-text)] transition-all duration-300 ease-in-out hover:border-[var(--color-nav-border-hover)] hover:text-[var(--color-nav-text-hover)]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeSwitch />
            <button
              onClick={onOpenCart}
              className="relative rounded-full bg-[var(--color-button-bg)] p-2 text-[var(--color-text)] transition-colors duration-300 hover:bg-[var(--color-button-hover)]"
              aria-label="View cart"
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
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg p-2 text-[var(--color-nav-text)] transition-colors duration-300 ease-in-out hover:text-[var(--color-nav-text-hover)] focus:outline-none md:hidden"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isMenuOpen ? 'mt-4 max-h-60 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-1 border-[var(--color-mobile-menu-border)] py-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block rounded-lg px-4 py-2 font-medium text-[var(--color-mobile-menu-item)] transition-colors duration-300 hover:bg-[var(--color-mobile-menu-item-hover-bg)] hover:text-[var(--color-mobile-menu-item-hover-text)]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
