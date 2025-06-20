// File: src/components/SignupPage.tsx
import React, { useState } from 'react';
import { Coffee, Eye, EyeOff, CheckCircle, AlertCircle, Check, X, User, Mail, Lock } from 'lucide-react';
import type { FormData, FormErrors, SignupPageProps } from '../types';

const SignupPage: React.FC<SignupPageProps> = ({ onPageChange }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Password strength requirements
  const passwordRequirements = [
    { label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { label: 'Contains uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: 'Contains lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: 'Contains number', test: (pwd: string) => /\d/.test(pwd) },
    { label: 'Contains special character', test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) }
  ];

  // Validation rules
  const validateField = (name: string, value: string, formData?: FormData): string | null => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (value.trim().length < 2) return 'First name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'First name can only contain letters';
        return null;
      
      case 'lastName':
        if (!value.trim()) return 'Last name is required';
        if (value.trim().length < 2) return 'Last name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Last name can only contain letters';
        return null;
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return null;
      
      case 'password':
        if (!value) return 'Password is required';
        const failedRequirements = passwordRequirements.filter(req => !req.test(value));
        if (failedRequirements.length > 0) {
          return `Password must meet all requirements`;
        }
        return null;
      
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (formData && value !== formData.password) return 'Passwords do not match';
        return null;
      
      default:
        return null;
    }
  };

  // Validate all fields
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData], formData);
      if (error) {
        newErrors[key] = error;
      }
    });
    
    return newErrors;
  };

  // Handle input change with real-time validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    const newFormData = {
      ...formData,
      [name]: value
    };
    setFormData(newFormData);

    // Real-time validation only for touched fields
    if (touched[name]) {
      const error = validateField(name, value, newFormData);
      setErrors(prev => ({
        ...prev,
        [name]: error || ''
      }));
    }

    // Special case: if password changes and confirmPassword is touched, revalidate confirmPassword
    if (name === 'password' && touched.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword, newFormData);
      setErrors(prev => ({
        ...prev,
        confirmPassword: confirmError || ''
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
    const error = validateField(name, value, formData);
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
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate successful registration
        setIsSuccess(true);
        
        // Reset form after 3 seconds and go to login
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
          setTouched({});
          setErrors({});
          setIsSuccess(false);
          onPageChange('login'); // Navigate to login after successful signup
        }, 3000);
        
      } catch (error) {
        setErrors({ submit: 'Registration failed. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Get field validation state
  const getFieldState = (fieldName: string) => {
    const hasError = errors[fieldName] && touched[fieldName];
    const isValid = !errors[fieldName] && touched[fieldName] && formData[fieldName as keyof FormData];
    
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

  // Check password strength
  const getPasswordStrength = () => {
    const passedRequirements = passwordRequirements.filter(req => req.test(formData.password));
    return passedRequirements.length;
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength: number) => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Medium';
    return 'Strong';
  };

  const getStrengthTextColor = (strength: number) => {
    if (strength < 2) return 'text-red-600';
    if (strength < 4) return 'text-yellow-600';
    return 'text-green-600';
  };

  // Success screen
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-2xl text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          <h2 className="text-3xl font-bold text-gray-900">Welcome to BrewMaster!</h2>
          <p className="text-gray-600">Your account has been created successfully. Welcome to the coffee community!</p>
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
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
            Join BrewMaster
          </h2>
          <p className="mt-2 text-center text-lg text-gray-600">
            Create your account and start your coffee journey
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

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-lg font-medium text-gray-700 mb-2">
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 text-lg transition-all duration-300 ${getFieldState('firstName').className}`}
                  placeholder="First name"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {getFieldState('firstName').hasError && (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  {getFieldState('firstName').isValid && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
              {errors.firstName && touched.firstName && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-lg font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 text-lg transition-all duration-300 ${getFieldState('lastName').className}`}
                  placeholder="Last name"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {getFieldState('lastName').hasError && (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  {getFieldState('lastName').isValid && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
              {errors.lastName && touched.lastName && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

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
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {getFieldState('email').hasError && (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                {getFieldState('email').isValid && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
            </div>
            {errors.email && touched.email && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.email}
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
                autoComplete="new-password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`block w-full pl-10 pr-20 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 text-lg transition-all duration-300 ${getFieldState('password').className}`}
                placeholder="Create a password"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <div className="pr-2">
                  {getFieldState('password').hasError && (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  {getFieldState('password').isValid && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && touched.password && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Password strength:</span>
                  <span className={`text-sm font-medium ${getStrengthTextColor(getPasswordStrength())}`}>
                    {getStrengthText(getPasswordStrength())}
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(getPasswordStrength())}`}
                    style={{ width: `${(getPasswordStrength() / 5) * 100}%` }}
                  ></div>
                </div>
                {/* Requirements List */}
                <div className="space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center text-xs">
                      {req.test(formData.password) ? (
                        <Check className="h-3 w-3 text-green-500 mr-2" />
                      ) : (
                        <X className="h-3 w-3 text-gray-400 mr-2" />
                      )}
                      <span className={req.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {errors.password && touched.password && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`block w-full pl-10 pr-20 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 text-lg transition-all duration-300 ${getFieldState('confirmPassword').className}`}
                placeholder="Confirm your password"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <div className="pr-2">
                  {getFieldState('confirmPassword').hasError && (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  {getFieldState('confirmPassword').isValid && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.confirmPassword}
              </p>
            )}
            {!errors.confirmPassword && touched.confirmPassword && formData.confirmPassword && (
              <p className="mt-2 text-sm text-green-600 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Passwords match!
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded mt-1"
            />
            <label htmlFor="terms" className="ml-3 block text-sm text-gray-700">
              I agree to the{' '}
              <a href="#" className="text-amber-600 hover:text-amber-700 font-medium">
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href="#" className="text-amber-600 hover:text-amber-700 font-medium">
                Privacy Policy
              </a>
            </label>
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
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => onPageChange('login')}
                className="text-amber-500 hover:text-amber-700 font-medium underline focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
              >
                Sign in here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;