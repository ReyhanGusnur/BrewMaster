// File: src/components/CartModal.tsx
// Cart Modal Component

import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import type { CartModalProps } from '../src/types/index';

const CartModal: React.FC<CartModalProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}) => {
  if (!isOpen) return null;

  const handleQuantityChange = (itemId: string, change: number) => {
    const item = cart.items.find(item => item.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        onUpdateQuantity(itemId, newQuantity);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <ShoppingBag className="h-8 w-8 text-amber-600 mr-3" />
              Shopping Cart
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {cart.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
              <p className="text-gray-500">Add some delicious coffee to get started!</p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 bg-gray-50 rounded-xl p-4">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.product.name}</h4>
                    <p className="text-sm text-gray-600">{item.selectedRoast}</p>
                    <p className="text-sm text-amber-600 font-medium">${item.product.price}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-800">${item.totalPrice.toFixed(2)}</p>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors mt-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  Total: ${cart.totalPrice.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  {cart.totalItems} item{cart.totalItems !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={onCheckout}
                className="px-8 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;