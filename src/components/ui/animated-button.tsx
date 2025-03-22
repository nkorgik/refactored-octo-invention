'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ButtonProps } from '@/components/ui/button';

interface AnimatedButtonProps extends ButtonProps {
  withAnimation?: boolean;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, withAnimation = true, ...props }, ref) => {
    if (!withAnimation) {
      return (
        <Button ref={ref} className={className} {...props}>
          {children}
        </Button>
      );
    }

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Button ref={ref} className={className} {...props}>
          {children}
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export { AnimatedButton };