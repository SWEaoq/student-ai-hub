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
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
          size={20} 
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-12 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default SearchBar;

