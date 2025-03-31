'use client';
import { ReactNode, useEffect, useState } from 'react';
import Skeleton from '@/components/UI/Skeleton';
import Header from '@/components/UI/Header';
import Footer from '@/components/UI/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton />;
  }

  return (
    <div className="flex min-h-screen flex-col transition-colors duration-300">
      <Header />
      <main className="container mx-auto flex-grow px-4 pt-24 pb-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
