// File: src/types/index.ts
// Types for the coffee e-commerce application with cart system and form validation

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  roastingOptions: string[];
  origin: string;
  flavor: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedRoast: string;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  cartItemsCount: number;
  onCartClick: () => void;
}

export interface ProductCardProps {
  product: Product;
  isHorizontal?: boolean;
  onProductClick: (product: Product) => void;
}

export interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedRoast: string) => void;
}

export interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Cart;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Cart;
  onPaymentComplete: () => void;
}

// Form validation types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

// Page props with navigation
export interface LoginPageProps {
  onPageChange: (page: string) => void;
}

export interface SignupPageProps {
  onPageChange: (page: string) => void;
}

export interface PaymentFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}