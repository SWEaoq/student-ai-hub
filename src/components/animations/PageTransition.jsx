import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition, getAnimationConfig } from '../../utils/animations';

/**
 * PageTransition - Wrapper for smooth page transitions
 * Used with AnimatePresence in App.jsx for route transitions
 * @param {React.ReactNode} children - Page content
 * @param {string} className - Additional CSS classes
 */
const PageTransition = ({ children, className = '', ...props }) => {
  const animationConfig = getAnimationConfig(pageTransition);
  
  return (
    <motion.div
      initial={animationConfig.initial}
      animate={animationConfig.animate}
      exit={animationConfig.exit}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;

