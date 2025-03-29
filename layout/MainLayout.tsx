'use client';
import { ReactNode, useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useDarkMode from '@/hooks/useDarkMode';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  // Use the custom hook for dark mode
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  // Avoid flash of unstyled content with SSR
  const [mounted, setMounted] = useState(false);

  // Set mounted to true when component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted yet, render a skeleton with a neutral background
  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="h-16 bg-white border-b border-gray-200"></div>
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          {children}
        </main>
        <div className="h-96 bg-gray-100"></div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
      }`}
    >
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {children}
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default MainLayout;
