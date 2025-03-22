'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import LoginForm from './login-form';
import RegisterForm from './register-form';
import { AnimatedButton } from '@/components/ui/animated-button';
import { LoginCredentials, RegisterData } from '@/types/auth';

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
  const [view, setView] = useState<'login' | 'register' | 'success'>(initialView);
  const [currentForm, setCurrentForm] = useState<'login' | 'register'>(initialView);
  
  const toggleView = () => {
    clearError();
    const newView = currentForm === 'login' ? 'register' : 'login';
    setCurrentForm(newView);
    
    // Use animation delay to switch views
    setTimeout(() => {
      setView(newView);
    }, 200);
  };

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      await onLogin(credentials);
      setView('success');
    } catch (error) {
      // Error is handled in the parent component
    }
  };

  const handleRegister = async (data: RegisterData) => {
    try {
      await onRegister(data);
      setView('success');
    } catch (error) {
      // Error is handled in the parent component
    }
  };

  // Animation variants
  const formVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
  };

  // Success animation variants
  const successVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {view === 'login' 
              ? 'Sign In' 
              : view === 'register' 
                ? 'Create Account' 
                : currentForm === 'login' 
                  ? 'Login Successful' 
                  : 'Registration Complete'
            }
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-md text-sm"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait" initial={false} custom={view === 'login' ? 1 : -1}>
          {view === 'success' ? (
            <motion.div
              key="success"
              variants={successVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                {currentForm === 'login' ? 'Login Successful' : 'Registration Complete'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                {currentForm === 'login' 
                  ? 'You\'ve been successfully logged in.' 
                  : 'Your account has been created successfully.'}
              </p>
              {onClose && (
                <AnimatedButton onClick={onClose}>
                  Continue
                </AnimatedButton>
              )}
            </motion.div>
          ) : view === 'login' ? (
            <motion.div
              key="login"
              custom={1}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              custom={-1}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
            </motion.div>
          )}
        </AnimatePresence>

        {view !== 'success' && (
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              {view === 'login' ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              onClick={toggleView}
              className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium focus:outline-none transition-colors"
            >
              {view === 'login' ? "Create account" : "Sign in"}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}