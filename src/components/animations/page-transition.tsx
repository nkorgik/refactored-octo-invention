'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  direction = 'right',
  duration = 0.5
}) => {
  // Define animation variants based on direction
  const variants = {
    initial: {
      opacity: 0,
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? -100 : direction === 'down' ? 100 : 0,
      transition: {
        duration: duration * 0.75,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export { PageTransition };