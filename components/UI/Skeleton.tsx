import { FC, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const Skeleton: FC = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      data-theme={mounted ? resolvedTheme : 'light'}
      className="flex min-h-screen flex-col bg-[var(--color-header-bg)] transition-colors duration-300"
    >
      <div className="h-16 animate-pulse border-b border-[var(--color-header-border)] bg-[var(--color-header-bg)]"></div>
      <main className="container mx-auto flex-grow animate-pulse px-4 pt-24 pb-8 sm:px-6 lg:px-8">
        <div className="h-80 rounded bg-[var(--color-button-bg)]"></div>
      </main>
      <div className="h-96 animate-pulse bg-[var(--color-footer-bg)]"></div>
    </div>
  );
};

export default Skeleton;
