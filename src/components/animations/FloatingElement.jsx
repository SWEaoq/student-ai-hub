import React from 'react';
import { motion } from 'framer-motion';

/**
 * FloatingElement - Wrapper for subtle floating animations
 * Adds organic floating motion with random offsets and timing
 * @param {React.ReactNode} children - Content to animate
 * @param {number} delay - Animation delay in seconds (default: random)
 * @param {number} duration - Animation duration in seconds (default: random 3-5s)
 * @param {number} offset - Vertical offset in pixels (default: random 5-15px)
 * @param {string} className - Additional CSS classes
 */
const FloatingElement = ({
  children,
  delay,
  duration,
  offset,
  className = '',
  ...props
}) => {
  // Generate random values if not provided for organic feel
  const randomDelay = delay ?? Math.random() * 2;
  const randomDuration = duration ?? 3 + Math.random() * 2; // 3-5 seconds
  const randomOffset = offset ?? 5 + Math.random() * 10; // 5-15px

  return (
    <motion.div
      animate={{
        y: [0, -randomOffset, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: randomDelay,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;

