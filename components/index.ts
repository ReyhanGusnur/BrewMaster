// Export all components for easier imports
export { default as Navbar } from './Navbar';
export { default as ProductCard } from './ProductCard';
export { default as ProductModal } from './ProductModal';
export { default as HomePage } from './HomePage';
export { default as LoginPage } from './LoginPage';
export { default as SignupPage } from './SignupPage';
export { default as Footer } from './Footer';

// Re-export types for convenience
export type { 
  Product, 
  NavbarProps, 
  ProductCardProps, 
  ProductModalProps, 
  FormData,
  HomePageProps,
  LoginPageProps,
  SignupPageProps,
  FooterProps
} from '../types';