import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, getAnimationConfig } from '../../utils/animations';

/**
 * FadeIn - Reusable fade-in animation wrapper
 * @param {React.ReactNode} children - Content to animate
 * @param {number} delay - Animation delay in seconds
 * @param {string} className - Additional CSS classes
 */
const FadeIn = ({ children, delay = 0, className = '', ...props }) => {
  const animationConfig = getAnimationConfig(fadeIn);
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animationConfig}
      transition={{ ...animationConfig.visible.transition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;

