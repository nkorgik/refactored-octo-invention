'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';

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
  const selectedItem = items.find(item => item.value === value);
  
  // Variants for the dropdown trigger animation
  const triggerVariants = {
    hover: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.2 }
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

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      
      <Select value={value} onValueChange={onValueChange}>
        <motion.div
          whileHover="hover"
          whileTap="tap"
          variants={triggerVariants}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder}>
              {selectedItem?.icon && (
                <span className="mr-2">{selectedItem.icon}</span>
              )}
              {selectedItem?.label}
            </SelectValue>
          </SelectTrigger>
        </motion.div>
        
        <SelectContent>
          <SelectGroup>
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
                  <SelectItem value={item.value}>
                    <div className="flex items-center">
                      {item.icon && (
                        <span className="mr-2">{item.icon}</span>
                      )}
                      {item.label}
                    </div>
                  </SelectItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AnimatedDropdown;