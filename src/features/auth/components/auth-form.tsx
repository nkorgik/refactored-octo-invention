'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { LoginCredentials, RegisterData } from '@/types/auth';

// Import form components
import LoginForm from './login-form';
import RegisterForm from './register-form';
import SocialButtons from './social-buttons';

export interface AuthFormProps {
  initialView?: 'login' | 'register';
  onLogin: (credentials: LoginCredentials) => Promise<void>;
  onRegister: (data: RegisterData) => Promise<void>;
  onClose?: () => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export default function AuthForm({
  initialView = 'login',
  onLogin,
  onRegister,
  onClose,
  isLoading,
  error,
  clearError
}: AuthFormProps) {
  const [activeView, setActiveView] = useState<'login' | 'register'>(initialView === 'login' ? 'login' : 'register');
  
  const switchView = (view: 'login' | 'register') => {
    setActiveView(view);
    clearError();
  };

  const handleSocialLogin = (provider: string) => {
    // Handle social login logic
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="bg-gray-800 rounded-3xl shadow-xl w-full max-w-md mx-auto overflow-hidden">
      {/* Header with switch toggle */}
      <div className="p-4">
        <div className="flex items-center mb-4">
          {/* Toggle Switch */}
          <div className="flex bg-gray-900 rounded-full p-1 flex-1">
            <button
              onClick={() => switchView('login')}
              className={`flex-1 py-2 text-center font-medium rounded-full transition-colors ${
                activeView === 'login' 
                  ? 'bg-white text-black' 
                  : 'bg-transparent text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => switchView('register')}
              className={`flex-1 py-2 text-center font-medium rounded-full transition-colors ${
                activeView === 'register' 
                  ? 'bg-white text-black' 
                  : 'bg-transparent text-white'
              }`}
            >
              Registration
            </button>
          </div>
          
          {/* Close button - now in the same line */}
          {onClose && (
            <button 
              onClick={onClose}
              className="ml-4 rounded-full bg-white text-black w-8 h-8 flex items-center justify-center"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
      
      {/* Form content */}
      <div className="p-6 pt-0">
        {error && (
          <div className="mb-4 bg-red-500 bg-opacity-20 text-white font-bold p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <AnimatePresence mode="wait" initial={false}>
          {activeView === 'login' ? (
            <LoginForm 
              key="login-form"
              onSubmit={onLogin}
              isLoading={isLoading}
            />
          ) : (
            <RegisterForm
              key="register-form"
              onSubmit={onRegister}
              isLoading={isLoading}
            />
          )}
        </AnimatePresence>
        
        {/* Social login section - only shown for login or after registration form */}
        {(activeView === 'login' || activeView === 'register') && (
          <div className="mt-6">
            <SocialButtons onSocialLogin={handleSocialLogin} />
          </div>
        )}
        
        {/* Forgot password link - only shown for login */}
        {activeView === 'login' && (
          <div className="text-center mt-6">
            <button
              type="button"
              className="text-gray-400 hover:text-white transition-colors"
              onClick={() => console.log('Forgot password')}
            >
              Forgot password ?
            </button>
          </div>
        )}
      </div>
    </div>
  );
}