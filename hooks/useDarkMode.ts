import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface UseDarkModeReturn {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  theme: Theme;
}

const useDarkMode = (): UseDarkModeReturn => {
  // Default to false for SSR to prevent hydration mismatch
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  // Track if component is mounted to avoid hydration issues
  const [mounted, setMounted] = useState(false);

  // Only run client-side code after mounting
  useEffect(() => {
    setMounted(true);

    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      // If no preference saved, check system preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setIsDarkMode(prefersDark);

      if (prefersDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }, []);

  // Handle system preference changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;

      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }

      return newMode;
    });
  };

  // For SSR compatibility
  const theme: Theme = isDarkMode ? 'dark' : 'light';

  return {
    isDarkMode: mounted ? isDarkMode : false,
    toggleDarkMode,
    theme,
  };
};

export default useDarkMode;
