import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, enhancedCardHover, getAnimationConfig } from '../../utils/animations';

/**
 * AnimatedCard - Card wrapper with entrance and hover animations
 * @param {React.ReactNode} children - Card content
 * @param {string} className - Additional CSS classes
 * @param {boolean} enableHover - Enable hover animations (default: true)
 * @param {boolean} enableShimmer - Enable shimmer effect on hover (default: true)
 */
const AnimatedCard = ({ 
  children, 
  className = '', 
  enableHover = true,
  enableShimmer = true,
  ...props 
}) => {
  const animationConfig = getAnimationConfig(fadeInUp);
  const hoverConfig = enableHover ? getAnimationConfig(enhancedCardHover) : null;
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animationConfig}
      whileHover={hoverConfig ? "hover" : undefined}
      className={`relative ${className}`}
      {...props}
    >
      {/* Shimmer Effect Overlay */}
      {enableShimmer && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl overflow-hidden">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      )}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default AnimatedCard;

