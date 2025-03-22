'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

export interface DropdownItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface AnimatedDropdownProps {
  items: DropdownItem[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

const AnimatedDropdown: React.FC<AnimatedDropdownProps> = ({
  items,
  value,
  onValueChange,
  label,
  placeholder = 'Select an option',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedItem = items.find(item => item.value === value);

  // Animation for the dropdown
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2
      }
    },
    exit: { 
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  // Animation for individual items
  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: -5
    },
    visible: (i: number) => ({ 
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    }),
    exit: { 
      opacity: 0,
      y: 5,
      transition: {
        duration: 0.2
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (itemValue: string) => {
    onValueChange(itemValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-white mb-1">
          {label}
        </label>
      )}
      
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 px-4 flex items-center justify-between text-white bg-transparent rounded-full focus:outline-none"
      >
        <div className="flex items-center gap-2">
          {selectedItem?.icon && (
            <span>{selectedItem.icon}</span>
          )}
          <span className="text-white">{selectedItem?.label || placeholder}</span>
        </div>
      </button>
      
      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute z-50 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg"
          >
            <div className="py-1">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.value}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={itemVariants}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelect(item.value)}
                      className={`w-full text-left px-4 py-3 flex items-center gap-2 text-white hover:bg-gray-600 rounded-lg my-1 cursor-pointer ${item.value === value ? 'bg-gray-600/50' : ''}`}
                    >
                      {item.icon && (
                        <span>{item.icon}</span>
                      )}
                      <span>{item.label}</span>
                      {item.value === value && (
                        <Check className="ml-auto w-4 h-4 text-white" />
                      )}
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedDropdown;