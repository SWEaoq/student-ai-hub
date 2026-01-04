import React from 'react';
import { motion } from 'framer-motion';
import { buttonPress, getAnimationConfig } from '../../utils/animations';

/**
 * Button - Reusable animated button component
 * @param {React.ReactNode} children - Button content
 * @param {string} variant - Button variant: 'primary' | 'secondary' | 'ghost'
 * @param {string} size - Button size: 'sm' | 'md' | 'lg'
 * @param {Function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 */
const Button = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  ...props 
}) => {
  const pressConfig = getAnimationConfig(buttonPress);
  
  const variants = {
    primary: 'bg-white text-black hover:bg-gray-200 border-white',
    secondary: 'bg-white/10 text-white hover:bg-white/20 border-white/20',
    ghost: 'bg-transparent text-white hover:bg-white/10 border-transparent'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileTap={!disabled ? pressConfig : undefined}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-full font-bold transition-colors border
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;

