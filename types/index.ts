// Types for the coffee e-commerce application

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

export interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
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
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Page component props
export interface HomePageProps {}
export interface LoginPageProps {}
export interface SignupPageProps {}
export interface FooterProps {}