import React, { useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import type { ProductModalProps } from '../types';

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [selectedRoast, setSelectedRoast] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  if (!isOpen || !product) return null;

  const handleRoastChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedRoast(event.target.value);
  };

  const handleQuantityIncrease = (): void => {
    setQuantity(prev => prev + 1);
  };

  const handleQuantityDecrease = (): void => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleAddToCart = (): void => {
    if (!selectedRoast) return;
    // Add to cart logic here
    console.log('Adding to cart:', { product, selectedRoast, quantity });
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-lg text-gray-600">{product.origin}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Flavor Profile</h3>
                <div className="flex flex-wrap gap-2">
                  {product.flavor.map((flavor, index) => (
                    <span key={index} className="px-3 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                      {flavor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
              
              <div>
                <label htmlFor="roast-select" className="block text-lg font-semibold text-gray-800 mb-3">
                  Roasting Level
                </label>
                <select 
                  id="roast-select"
                  value={selectedRoast}
                  onChange={handleRoastChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg"
                >
                  <option value="">Select roasting level</option>
                  {product.roastingOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={handleQuantityDecrease}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                  <button 
                    onClick={handleQuantityIncrease}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-amber-600">${totalPrice}</span>
                  <div className="text-right text-sm text-gray-500">
                    <p>${product.price} per bag</p>
                    <p>Free shipping on orders over $50</p>
                  </div>
                </div>
                <button 
                  disabled={!selectedRoast}
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-amber-600 text-white rounded-xl hover:bg-amber-700 font-semibold text-lg flex items-center justify-center space-x-3 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;