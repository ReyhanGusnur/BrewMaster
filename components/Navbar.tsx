import React from 'react';
import { Coffee } from 'lucide-react';
import type { NavbarProps } from '../types';

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange }) => {
  const handleLogoClick = (): void => {
    onPageChange('home');
  };

  const handleLoginClick = (): void => {
    onPageChange('login');
  };

  const handleSignupClick = (): void => {
    onPageChange('signup');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity group"
            onClick={handleLogoClick}
          >
            <Coffee className="h-8 w-8 text-amber-600 mr-3 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-2xl font-bold text-gray-800 tracking-tight">BrewMaster</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLoginClick}
              className="px-4 py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium rounded-lg hover:bg-gray-50"
            >
              Login
            </button>
            <button 
              onClick={handleSignupClick}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;