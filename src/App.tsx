import React, { useState } from 'react';
import { 
  Navbar, 
  HomePage, 
  LoginPage, 
  SignupPage, 
  Footer 
} from '../components';
import type { NavbarProps } from '../types';

// Main App Component
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const handlePageChange: NavbarProps['onPageChange'] = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
      />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;