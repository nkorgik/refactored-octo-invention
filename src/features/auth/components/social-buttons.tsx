'use client';

import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook, FaDiscord, FaTelegram } from "react-icons/fa";

interface SocialButtonsProps {
  onSocialLogin: (provider: string) => void;
}

export default function SocialButtons({ onSocialLogin }: SocialButtonsProps) {
  return (
    <div className="text-center">
      <p className="text-gray-400 mb-4">Use social networks</p>
      <div className="flex justify-center space-x-2">
        <button 
          onClick={() => onSocialLogin('google')}
          className="text-4xl hover:opacity-80 transition-opacity"
        >
          <FcGoogle />
        </button>
        <button 
          onClick={() => onSocialLogin('apple')}
          className="text-4xl text-white hover:opacity-80 transition-opacity"
        >
          <FaApple />
        </button>
        <button 
          onClick={() => onSocialLogin('facebook')}
          className="text-4xl hover:opacity-80 transition-opacity"
        >
          <FaFacebook color="#1877F2" />
        </button>
        <button 
          onClick={() => onSocialLogin('discord')}
          className="text-4xl hover:opacity-80 transition-opacity"
        >
          <FaDiscord color="#5865F2" />
        </button>
        <button 
          onClick={() => onSocialLogin('telegram')}
          className="text-4xl hover:opacity transition-opacity"
        >
          <FaTelegram color="#229ED9" />
        </button>
      </div>
    </div>
  );
}