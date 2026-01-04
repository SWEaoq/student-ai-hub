import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, getAnimationConfig } from '../../utils/animations';

/**
 * StaggerContainer - Container for stagger animations
 * Children animate in sequence with a stagger effect
 * @param {React.ReactNode} children - Children to animate with stagger
 * @param {number} staggerDelay - Delay between each child (default: 0.1s)
 * @param {string} className - Additional CSS classes
 */
const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1, 
  className = '',
  ...props 
}) => {
  const containerConfig = getAnimationConfig({
    ...staggerContainer,
    visible: {
      ...staggerContainer.visible,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  });

  const itemConfig = getAnimationConfig(staggerItem);
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerConfig}
      className={className}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return (
            <motion.div
              key={child.key || index}
              variants={itemConfig}
              className="w-full"
            >
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
};

export default StaggerContainer;

