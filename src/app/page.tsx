'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/animations';
import { AnimatedButton } from '@/components/ui/animated-button';
import { 
  AnimatedCard, 
  CardHeader, 
  CardContent, 
  CardFooter,
  CardTitle,
  CardDescription 
} from '@/components/customized/animated-card';
import AnimatedDropdown, { DropdownItem } from '@/components/customized/animated-dropdown';
import { ChevronRight } from 'lucide-react';

// Sample data for dropdowns
const languages: DropdownItem[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' }
];

const currencies: DropdownItem[] = [
  { value: 'usd', label: 'US Dollar ($)' },
  { value: 'eur', label: 'Euro (€)' },
  { value: 'gbp', label: 'British Pound (£)' },
  { value: 'jpy', label: 'Japanese Yen (¥)' }
];

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('usd');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex justify-between items-center mb-12">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          Modern Interface
        </motion.div>
        
        <div className="flex gap-4">
          <AnimatedDropdown
            items={languages}
            value={selectedLanguage}
            onValueChange={setSelectedLanguage}
            label="Language"
            className="w-40"
          />
          
          <AnimatedDropdown
            items={currencies}
            value={selectedCurrency}
            onValueChange={setSelectedCurrency}
            label="Currency"
            className="w-40"
          />
        </div>
      </div>

      <FadeIn delay={0.3}>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Welcome to Modern Interface
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience smooth animations and seamless transitions in this modern application.
          </p>
        </div>
      </FadeIn>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
      >
        <AnimatedCard delay={0.2}>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>
              Sign in or create a new account with a smooth login experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              Our authentication system features animated transitions between login and registration forms,
              with real-time validation and success animations.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/login" className="w-full">
              <AnimatedButton variant="default" className="w-full group">
                <span className="flex items-center justify-center">
                  Go to Login
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </AnimatedButton>
            </Link>
          </CardFooter>
        </AnimatedCard>

        <AnimatedCard delay={0.4}>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              View your orders and track their status with detailed information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              Browse through your orders, view detailed information, and track the status of each order
              with a responsive and animated interface.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/orders" className="w-full">
              <AnimatedButton variant="outline" className="w-full group">
                <span className="flex items-center justify-center">
                  View Orders
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </AnimatedButton>
            </Link>
          </CardFooter>
        </AnimatedCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-center text-gray-500 dark:text-gray-400 text-sm"
      >
        Powered by Next.js, React, TypeScript, and Framer Motion
      </motion.div>
    </div>
  );
}