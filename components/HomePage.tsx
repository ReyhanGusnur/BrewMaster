// File: src/components/HomePage.tsx
// Updated HomePage with Add to Cart functionality

import React, { useState } from 'react';
import type { Product } from '../types';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

interface HomePageProps {
  onAddToCart: (product: Product, quantity: number, selectedRoast: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const verticalProducts = products.slice(0, 3);
  const horizontalProducts = products.slice(3, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            Premium Coffee Beans
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover the world's finest coffee beans, sourced from premium farms and roasted to perfection
          </p>
          <button className="px-10 py-4 bg-white text-amber-600 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1">
            Explore Collection
          </button>
        </div>
      </div>

      {/* Featured Products - Vertical Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Featured Selections</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked premium coffee beans from the world's most renowned growing regions
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {verticalProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onProductClick={handleProductClick}
            />
          ))}
        </div>
      </div>

      {/* More Products - Horizontal Cards */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">Our Complete Collection</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our full range of exceptional coffee beans from around the globe
            </p>
          </div>
          <div className="space-y-8">
            {horizontalProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isHorizontal={true}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        </div>
      </div>

      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={onAddToCart}
      />
    </div>
  );
};

export default HomePage;