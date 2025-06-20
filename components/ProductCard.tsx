import React from 'react';
import type { ProductCardProps } from '../src/types';

const ProductCard: React.FC<ProductCardProps> = ({ product, isHorizontal = false, onProductClick }) => {
  const cardClasses = isHorizontal 
    ? "bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-100"
    : "bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden h-full group border border-gray-100";
    
  const layoutClasses = isHorizontal 
    ? "flex flex-row h-56"
    : "flex flex-col h-full";
    
  const imageClasses = isHorizontal 
    ? "w-56 h-56 object-cover group-hover:scale-105 transition-transform duration-300"
    : "w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300";
    
  const contentClasses = isHorizontal 
    ? "p-6 flex-1 flex flex-col justify-center"
    : "p-6 flex-1 flex flex-col justify-between";

  const handleCardClick = (): void => {
    onProductClick(product);
  };

  return (
    <div className={cardClasses} onClick={handleCardClick}>
      <div className={layoutClasses}>
        <div className={isHorizontal ? "w-56 overflow-hidden" : "overflow-hidden"}>
          <img src={product.image} alt={product.name} className={imageClasses} />
        </div>
        <div className={contentClasses}>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{product.origin}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {product.flavor.slice(0, 2).map((flavor, index) => (
                <span key={index} className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                  {flavor}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-amber-600">${product.price}</span>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-amber-600 hover:text-white transition-all duration-300 text-sm font-medium">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;