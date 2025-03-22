// the hooks just encapsulate the wrapper logic around the actual fetch functions, these fetch functions could be located in different places depending
// on your project structure and your goals, usually it could be the lib/api or rtk queries/mutations (if you prefer to handle the data on the client side) tho for most cases server side fetch is preferred way


'use client';

import { useState, useCallback } from 'react';
import { User, LoginCredentials, RegisterData } from '@/types/auth';

// This would typically be imported from a service layer
const mockLogin = async (credentials: LoginCredentials): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock validation
  if (credentials.email === 'john@example.com' && credentials.password === 'password123') {
    return {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com'
    };
  }
  
  throw new Error('Invalid email or password');
};

const mockRegister = async (data: RegisterData): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock existing user check
  if (data.email === 'john@example.com') {
    throw new Error('User with this email already exists');
  }
  
  // Mock successful registration
  return {
    id: 'user-new',
    name: data.name,
    email: data.email
  };
};

const mockLogout = async (): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Check if user is authenticated
  const isAuthenticated = Boolean(user);

  // Login function
  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const userData = await mockLogin(credentials);
      setUser(userData);
      // In a real app, you might store a token in localStorage here
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err; // Re-throw to allow the component to handle it
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Register function
  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const userData = await mockRegister(data);
      setUser(userData);
      // In a real app, you might store a token in different places, http-only cookies e.g
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw err; // Re-throw to allow the component to handle it
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    setIsLoading(true);
    
    try {
      await mockLogout();
      setUser(null);
      // In a real app, you would remove the token from localStorage here
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    clearError
  };
};

export default useAuth;