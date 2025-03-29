import { FC, useState, useEffect } from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out
        ${
          isScrolled ? 'py-2 shadow-lg bg-opacity-95 backdrop-blur-sm' : 'py-4'
        } 
        ${
          isDarkMode
            ? 'bg-gray-900 text-gray-100'
            : 'bg-white text-gray-800 border-b border-gray-200'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2 group">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center
              transition-colors duration-300
              ${
                isDarkMode
                  ? 'bg-indigo-600 group-hover:bg-indigo-500'
                  : 'bg-indigo-500 group-hover:bg-indigo-600'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
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
            <h1
              className={`text-xl font-bold transition-transform duration-300 transform group-hover:translate-x-1`}
            >
              MyStore
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'Products', 'Categories', 'Sale'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`font-medium transition-all duration-300 ease-in-out 
                  border-b-2 hover:border-indigo-500
                  ${
                    isDarkMode
                      ? 'border-transparent text-gray-300 hover:text-white'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors duration-300
                ${
                  isDarkMode
                    ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
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
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
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
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Cart */}
            <button
              className={`p-2 rounded-full relative transition-colors duration-300
                ${
                  isDarkMode
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
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
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                2
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors duration-300 ease-in-out text-gray-500 hover:text-gray-900 focus:outline-none"
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

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div
            className={`py-2 space-y-1 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            {['Home', 'Products', 'Categories', 'Sale'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`block py-2 px-4 rounded-lg font-medium transition-colors duration-300
                  ${
                    isDarkMode
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
