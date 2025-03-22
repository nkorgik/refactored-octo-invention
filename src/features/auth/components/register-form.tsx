'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { RegisterData } from '@/types/auth';

// Form validation schema
const registerSchema = z.object({
  emailOrMobile: z.string().min(1, { message: 'Email or mobile is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => Promise<void>;
  isLoading: boolean;
}

export default function RegisterForm({ onSubmit, isLoading }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      emailOrMobile: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleFormSubmit = async (data: RegisterFormValues) => {
    // Map form data to the expected format
    await onSubmit({
      email: data.emailOrMobile,
      password: data.password,
      name: '' // The form doesn't collect name as per the screenshot
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
      
      {/* Confirm Password field */}
      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          {...register('confirmPassword')}
          className="w-full bg-gray-900 border-0 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:ring-0 focus:outline-none"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(prev => !prev)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
        </button>
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      
      {/* Social networks checkbox */}
      <div className="flex items-center">
        <input 
          type="checkbox" 
          id="useSocial" 
          className="w-5 h-5 rounded border-gray-700 text-blue-500 focus:ring-blue-500 bg-gray-900"
        />
        <label htmlFor="useSocial" className="ml-2 text-gray-400">
          Use social networks
        </label>
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
            Creating Account...
          </span>
        ) : 'Registration'}
      </button>
    </motion.form>
  );
}