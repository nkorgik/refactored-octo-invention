'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedDropdown, { DropdownItem } from '@/components/customized/animated-dropdown';
import Image from 'next/image';

// Currency options with proper styling to match the design
const currencies: DropdownItem[] = [
  { 
    value: 'usd', 
    label: 'USD', 
    icon: <span className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full text-white">$</span>
  },
  { 
    value: 'uah', 
    label: 'UAH', 
    icon: <span className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full text-white">$</span> 
  },
  { 
    value: 'eur', 
    label: 'EUR', 
    icon: <span className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full text-white">$</span> 
  }
];

// Language options with flag icons
const languages: DropdownItem[] = [
  { 
    value: 'en', 
    label: 'EN', 
    icon: <span className="w-8 h-8 flex items-center justify-center">
      <div className="w-6 h-6 overflow-hidden rounded-full">
        <Image src="/svg/uk.svg" alt="UK Flag" width={24} height={24} />
      </div>
    </span>
  },
  { 
    value: 'ua', 
    label: 'UA', 
    icon: <span className="w-8 h-8 flex items-center justify-center">
      <div className="w-6 h-6 rounded-full overflow-hidden">
        <div className="h-1/2 bg-blue-500"></div>
        <div className="h-1/2 bg-yellow-400"></div>
      </div>
    </span>
  }
];

export default function Header() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('usd');

  return (
    <header className="bg-gray-950 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-medium text-gray-400"
          >
            main page
          </motion.div>

          <div className="flex items-center gap-4">
            {/* Dropdown menus */}
            <div className="flex gap-2">
              <AnimatedDropdown
                items={currencies}
                value={selectedCurrency}
                onValueChange={setSelectedCurrency}
                className="w-28 py-1 bg-gray-700/30 rounded-full"
              />
              <AnimatedDropdown
                items={languages}
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
                className="w-24 py-1 bg-gray-700/30 rounded-full"
              />
            </div>
            {/* Standalone UK flag */}
            <div className="flex">
              <div className="bg-gray-700/20 rounded-full flex items-center justify-center">
                <div className="w-14 h-14 overflow-hidden rounded-full flex justify-center">
                  <Image src="/svg/uk.svg" alt="UK Flag" width={42} height={42} draggable={false}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}