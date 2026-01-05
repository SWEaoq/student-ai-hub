import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { buttonPress, getAnimationConfig } from '../../utils/animations';

/**
 * Button - Enhanced animated button component with ripple, glow, and magnetic effects
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
  const [ripples, setRipples] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
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

  const handleClick = (e) => {
    if (disabled) return;
    
    // Create ripple effect
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = {
        id: Date.now(),
        x,
        y,
      };
      
      setRipples([...ripples, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    }
    
    onClick?.(e);
  };

  const handleMouseMove = (e) => {
    if (buttonRef.current && !disabled) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      whileTap={!disabled ? pressConfig : undefined}
      whileHover={!disabled ? {
        scale: 1.05,
        boxShadow: "0 0 20px rgba(176, 38, 255, 0.4)",
        transition: { duration: 0.2 }
      } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative rounded-full font-bold transition-all duration-300 border overflow-hidden
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      style={{
        x: !disabled ? mousePosition.x * 0.1 : 0,
        y: !disabled ? mousePosition.y * 0.1 : 0,
      }}
      {...props}
    >
      {/* Glow Effect on Hover */}
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x + 50}% ${mousePosition.y + 50}%, rgba(176, 38, 255, 0.3), transparent 70%)`,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated Gradient Background on Hover */}
      {variant !== 'primary' && (
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(176, 38, 255, 0.1), rgba(57, 255, 20, 0.1))',
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
          animate={{
            width: 200,
            height: 200,
            x: -100,
            y: -100,
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        />
      ))}

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button;

