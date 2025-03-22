'use client';

import React from 'react';
import { Facebook, Apple, MessageCircle } from 'lucide-react';

// Custom icons that aren't in Lucide
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const TelegramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#229ED9">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.006 9.445c-.151.706-.566.87-1.145.54l-3.164-2.332-1.526 1.47c-.169.17-.31.31-.636.31l.227-3.212 5.844-5.277c.254-.224-.055-.35-.395-.125l-7.225 4.546-3.112-.969c-.676-.212-.69-.676.141-1.001l12.147-4.682c.563-.211 1.056.126.85 1.287z"/>
  </svg>
);

interface SocialButtonsProps {
  onSocialLogin: (provider: string) => void;
}

export default function SocialButtons({ onSocialLogin }: SocialButtonsProps) {
  return (
    <div className="text-center">
      <p className="text-gray-400 mb-4">Use social networks</p>
      <div className="flex justify-center space-x-6">
        <button 
          onClick={() => onSocialLogin('google')}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <GoogleIcon />
        </button>
        <button 
          onClick={() => onSocialLogin('apple')}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <Apple size={20} />
        </button>
        <button 
          onClick={() => onSocialLogin('facebook')}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <Facebook size={20} color="#1877F2" />
        </button>
        <button 
          onClick={() => onSocialLogin('discord')}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <MessageCircle size={20} color="#5865F2" />
        </button>
        <button 
          onClick={() => onSocialLogin('telegram')}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <TelegramIcon />
        </button>
      </div>
    </div>
  );
}