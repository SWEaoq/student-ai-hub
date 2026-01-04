import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, cardHover, getAnimationConfig } from '../../utils/animations';

/**
 * AnimatedCard - Card wrapper with entrance and hover animations
 * @param {React.ReactNode} children - Card content
 * @param {string} className - Additional CSS classes
 * @param {boolean} enableHover - Enable hover animations (default: true)
 */
const AnimatedCard = ({ 
  children, 
  className = '', 
  enableHover = true,
  ...props 
}) => {
  const animationConfig = getAnimationConfig(fadeInUp);
  const hoverConfig = enableHover ? getAnimationConfig(cardHover) : null;
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animationConfig}
      whileHover={hoverConfig ? "hover" : undefined}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;

