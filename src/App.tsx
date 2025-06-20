// File: src/App.tsx
// Main App Component with Cart System

import React, { useState } from 'react';
import { 
  Navbar, 
  HomePage, 
  LoginPage, 
  SignupPage, 
  Footer,
  CartModal,
  PaymentModal
} from '../components';
import type { Cart, CartItem, Product } from '../types';

// Main App Component
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: 0
  });
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Calculate cart totals
  const updateCartTotals = (items: CartItem[]): Cart => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);
    return { items, totalItems, totalPrice };
  };

  // Add item to cart
  const handleAddToCart = (product: Product, quantity: number, selectedRoast: string) => {
    const existingItemIndex = cart.items.findIndex(
      item => item.product.id === product.id && item.selectedRoast === selectedRoast
    );

    let newItems: CartItem[];

    if (existingItemIndex >= 0) {
      // Update existing item
      newItems = cart.items.map((item, index) => {
        if (index === existingItemIndex) {
          const newQuantity = item.quantity + quantity;
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: newQuantity * product.price
          };
        }
        return item;
      });
    } else {
      // Add new item
      const newItem: CartItem = {
        id: `${product.id}-${selectedRoast}-${Date.now()}`,
        product,
        quantity,
        selectedRoast,
        totalPrice: quantity * product.price
      };
      newItems = [...cart.items, newItem];
    }

    setCart(updateCartTotals(newItems));
  };

  // Update item quantity
  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    const newItems = cart.items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: newQuantity * item.product.price
        };
      }
      return item;
    });

    setCart(updateCartTotals(newItems));
  };

  // Remove item from cart
  const handleRemoveItem = (itemId: string) => {
    const newItems = cart.items.filter(item => item.id !== itemId);
    setCart(updateCartTotals(newItems));
  };

  // Handle checkout
  const handleCheckout = () => {
    setIsCartModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  // Handle payment completion
  const handlePaymentComplete = () => {
    setIsPaymentModalOpen(false);
    setCart({ items: [], totalItems: 0, totalPrice: 0 });
    // Optionally show a success message or redirect
    alert('Thank you for your purchase! Your order has been confirmed.');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      default:
        return <HomePage onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        cartItemsCount={cart.totalItems}
        onCartClick={() => setIsCartModalOpen(true)}
      />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        cart={cart}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
};

export default App;