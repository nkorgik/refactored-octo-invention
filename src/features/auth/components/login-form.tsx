'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { LoginCredentials } from '@/types/auth';

// Form validation schema
const loginSchema = z.object({
  emailOrMobile: z.string().min(1, { message: 'Email or mobile is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  isLoading: boolean;
}

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrMobile: '',
      password: '',
    },
  });

  const handleFormSubmit = async (data: LoginFormValues) => {
    // Map form data to the expected format
    await onSubmit({
      email: data.emailOrMobile,
      password: data.password
    });
  };

  return (
    <motion.form 
      onSubmit={handleSubmit(handleFormSubmit)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Email/Mobile field */}
      <div>
        <input
          type="text"
          placeholder="Email or Mobile"
          {...register('emailOrMobile')}
          className="w-full bg-gray-900 border-0 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:ring-0 focus:outline-none"
          disabled={isLoading}
        />
        {errors.emailOrMobile && (
          <p className="mt-1 text-xs text-red-400">
            {errors.emailOrMobile.message}
          </p>
        )}
      </div>
      
      {/* Password field */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          {...register('password')}
          className="w-full bg-gray-900 border-0 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:ring-0 focus:outline-none"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
        </button>
        {errors.password && (
          <p className="mt-1 text-xs text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>
      
      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-white text-black font-medium rounded-full py-4 px-6 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 disabled:opacity-70"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </span>
        ) : 'Login'}
      </button>
    </motion.form>
  );
}