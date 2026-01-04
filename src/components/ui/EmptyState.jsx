import React from 'react';
import { Search } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

/**
 * EmptyState - Reusable empty state component
 * @param {string} message - Empty state message
 * @param {string} className - Additional CSS classes
 */
const EmptyState = ({ 
  message = 'No items found', 
  className = '',
  ...props 
}) => {
  return (
    <FadeIn className={`text-center py-20 ${className}`} {...props}>
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-white/5 rounded-full">
          <Search className="text-gray-500" size={32} />
        </div>
        <p className="text-gray-500 text-lg">{message}</p>
      </div>
    </FadeIn>
  );
};

export default EmptyState;

