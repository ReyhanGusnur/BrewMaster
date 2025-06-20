// File: src/components/index.ts
// Export all components for easier imports
export { default as Navbar } from './Navbar';
export { default as ProductCard } from './ProductCard';
export { default as ProductModal } from './ProductModal';
export { default as CartModal } from './CartModal';
export { default as PaymentModal } from './PaymentModal';
export { default as HomePage } from './HomePage';
export { default as LoginPage } from './LoginPage';
export { default as SignupPage } from './SignupPage';
export { default as Footer } from './Footer';

// Export types for convenience
export type { 
  Product, 
  CartItem,
  Cart,
  NavbarProps, 
  ProductCardProps, 
  ProductModalProps,
  CartModalProps,
  PaymentModalProps,
  PaymentFormData,
  LoginFormData,
  FormData,
  FormErrors,
  ValidationErrors
} from '../types';