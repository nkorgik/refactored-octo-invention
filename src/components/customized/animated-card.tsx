'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends Omit<HTMLMotionProps<"div">, "animate" | "initial" | "transition" | "whileHover" | "whileTap" | "variants"> {
  children: React.ReactNode;
  animateOnHover?: boolean;
  delay?: number;
  className?: string;
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, className, animateOnHover = true, delay = 0, ...props }, ref) => {
    // Basic animation variants
    const variants = {
      hidden: { 
        opacity: 0,
        y: 20
      },
      visible: { 
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: delay,
          ease: "easeOut"
        }
      }
    };

    // Configure hover and tap animations
    const hoverAnimation = animateOnHover ? { 
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    } : undefined;

    const tapAnimation = animateOnHover ? {
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    } : undefined;

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        variants={variants}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        transition={{ duration: 0.3 }}
        className={cn(className)}
        {...props}
      >
        <Card className="h-full border-none shadow-md">
          {children}
        </Card>
      </motion.div>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';

export { 
  AnimatedCard,
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent
};