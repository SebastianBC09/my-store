'use client';
import { ReactNode, useEffect, useState } from 'react';
import Skeleton from '@/components/UI/Skeleton';
import Header from '@/components/UI/Header';
import Footer from '@/components/UI/Footer';
import Drawer from '@/components/UI/Drawer';
import ShoppingCart from '@/components/cart/ShoppingCart';
import { useCart } from '@/context/Cart/CartContext';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [mounted, setMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, updateProduct, removeProduct, clearCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemsCount =
    cart?.products.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout');
    setIsCartOpen(false);
  };

  if (!mounted) {
    return <Skeleton />;
  }

  return (
    <div className="flex min-h-screen flex-col transition-colors duration-300">
      <Header onOpenCart={handleOpenCart} cartItemsCount={cartItemsCount} />
      <main className="flex-grow bg-[var(--color-bg-surface)] px-4 pt-24 pb-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />

      <Drawer isOpen={isCartOpen} onClose={handleCloseCart} title="Mi carrito">
        <ShoppingCart
          items={cart?.products || []}
          onClearCart={clearCart}
          onCheckout={handleCheckout}
          onRemoveItem={(id) => removeProduct(id)}
          onUpdateQuantity={(id, quantity) => updateProduct(id, quantity)}
        />
      </Drawer>
    </div>
  );
};

export default MainLayout;
