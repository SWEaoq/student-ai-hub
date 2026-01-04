import React from 'react';

/**
 * Skeleton - Reusable skeleton loading component
 * @param {string} className - Additional CSS classes
 * @param {string} variant - Skeleton variant: 'text' | 'card' | 'circle'
 */
const Skeleton = ({ className = '', variant = 'text', ...props }) => {
  const variants = {
    text: 'h-4 rounded',
    card: 'h-48 rounded-xl',
    circle: 'h-12 w-12 rounded-full'
  };

  return (
    <div
      className={`
        bg-white/5 animate-pulse
        ${variants[variant]}
        ${className}
      `}
      {...props}
    />
  );
};

export default Skeleton;

