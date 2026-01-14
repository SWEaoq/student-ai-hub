import React, { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, getAnimationConfig } from '../../utils/animations';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';

/**
 * SearchBar - Reusable search bar component
 * @param {Function} onSearch - Callback function called with search query
 * @param {string} placeholder - Placeholder text
 * @param {string} className - Additional CSS classes
 * @param {boolean} enableKeyboardShortcut - Enable '/' keyboard shortcut to focus (default: true)
 */
const SearchBar = ({ 
  onSearch, 
  placeholder = 'Search...', 
  className = '',
  enableKeyboardShortcut = true,
  ...props 
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const animationConfig = getAnimationConfig(fadeIn);

  // Keyboard shortcut to focus search (press '/' key)
  useKeyboardShortcut('/', () => {
    if (enableKeyboardShortcut && inputRef.current) {
      inputRef.current.focus();
    }
  }, [enableKeyboardShortcut]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animationConfig}
      className={`relative ${className}`}
      {...props}
    >
      <div className="relative">
        <Search 
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" 
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-10 sm:pl-12 pr-9 sm:pr-10 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[44px]"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white active:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Clear search"
          >
            <X size={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default SearchBar;

