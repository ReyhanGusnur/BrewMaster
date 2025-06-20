// File: src/components/LoginPage.tsx
import React, { useState } from 'react';
import { Coffee, Eye, EyeOff, CheckCircle, AlertCircle, Mail, Lock } from 'lucide-react';
import type { LoginFormData, FormErrors, LoginPageProps } from '../src/types';

const LoginPage: React.FC<LoginPageProps> = ({ onPageChange }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation rules
  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return null;
      
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters long';
        return null;
      
      default:
        return null;
    }
  };

  // Validate all fields
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof LoginFormData]);
      if (error) {
        newErrors[key] = error;
      }
    });
    
    return newErrors;
  };

  // Handle input change with real-time validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation only for touched fields
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error || ''
      }));
    }

    // Clear success state if user starts typing again
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  // Handle field blur (mark as touched)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate on blur
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error || ''
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    setTouched(allTouched);

    // Validate all fields
    const formErrors = validateForm();
    setErrors(formErrors);

    // Check if form is valid
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate successful login
        setIsSuccess(true);
        
        // Reset form after 2 seconds and go to home
        setTimeout(() => {
          setFormData({ email: '', password: '' });
          setTouched({});
          setErrors({});
          setIsSuccess(false);
          onPageChange('home'); // Navigate to home after successful login
        }, 2000);
        
      } catch (error) {
        setErrors({ submit: 'Login failed. Please check your credentials and try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Get field validation state
  const getFieldState = (fieldName: string) => {
    const hasError = errors[fieldName] && touched[fieldName];
    const isValid = !errors[fieldName] && touched[fieldName] && formData[fieldName as keyof LoginFormData];
    
    return {
      hasError,
      isValid,
      className: hasError 
        ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' 
        : isValid 
        ? 'border-green-500 focus:ring-green-500 focus:border-green-500 bg-green-50'
        : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'
    };
  };

  // Success screen
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-2xl text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
          <p className="text-gray-600">You have successfully logged in to your BrewMaster account.</p>
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-2xl">
        <div>
          <div className="flex justify-center">
            <Coffee className="h-16 w-16 text-amber-600" />
          </div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-lg text-gray-600">
            Sign in to your BrewMaster account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
          {/* General Error Message */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <span className="text-red-800">{errors.submit}</span>
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`block w-full pl-10 pr-10 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 text-lg transition-all duration-300 ${getFieldState('email').className}`}
                placeholder="Enter your email"
              />
              {/* Validation Icon */}
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {getFieldState('email').hasError && (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                {getFieldState('email').isValid && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
            </div>
            {/* Error Message */}
            {errors.email && touched.email && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.email}
              </p>
            )}
            {/* Success Message */}
            {!errors.email && touched.email && formData.email && (
              <p className="mt-2 text-sm text-green-600 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Email looks good!
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`block w-full pl-10 pr-20 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 text-lg transition-all duration-300 ${getFieldState('password').className}`}
                placeholder="Enter your password"
              />
              {/* Icons */}
              <div className="absolute inset-y-0 right-0 flex items-center">
                {/* Validation Icon */}
                <div className="pr-2">
                  {getFieldState('password').hasError && (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  {getFieldState('password').isValid && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                {/* Password Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {/* Error Message */}
            {errors.password && touched.password && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.password}
              </p>
            )}
            {/* Success Message */}
            {!errors.password && touched.password && formData.password && (
              <p className="mt-2 text-sm text-green-600 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Password looks good!
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="text-amber-600 hover:text-amber-700 font-medium">
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting || Object.keys(validateForm()).length > 0}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => onPageChange('signup')}
                className="text-amber-500 hover:text-amber-700 font-medium underline focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
              >
                Sign up here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;