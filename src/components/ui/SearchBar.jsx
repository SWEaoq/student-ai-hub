import React, { useState, useRef } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, getAnimationConfig } from '../../utils/animations';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';

/**
 * SearchBar - Reusable search bar component
 * @param {Function} onSearch - Callback function called with search query
 * @param {Function} onSemanticSearch - Optional callback for semantic search results
 * @param {string} placeholder - Placeholder text
 * @param {string} className - Additional CSS classes
 * @param {boolean} enableKeyboardShortcut - Enable '/' keyboard shortcut to focus (default: true)
 * @param {boolean} enableSemanticSearch - Enable semantic search mode toggle (default: false)
 * @param {string} searchType - Type of content being searched ('tool' or 'prompt')
 */
const SearchBar = ({ 
  onSearch, 
  onSemanticSearch,
  placeholder = 'Search...', 
  className = '',
  enableKeyboardShortcut = true,
  enableSemanticSearch = false,
  searchType = 'tool',
  ...props 
}) => {
  const [query, setQuery] = useState('');
  const [isSemanticMode, setIsSemanticMode] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const animationConfig = getAnimationConfig(fadeIn);

  // Keyboard shortcut to focus search (press '/' key)
  useKeyboardShortcut('/', () => {
    if (enableKeyboardShortcut && inputRef.current) {
      inputRef.current.focus();
    }
  }, [enableKeyboardShortcut]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (onSearch) {
      onSearch(value);
    }

    // Perform semantic search if enabled and mode is active
    if (enableSemanticSearch && isSemanticMode && value.trim().length > 2 && onSemanticSearch) {
      setIsSearching(true);
      try {
        const { semanticSearch } = await import('../../utils/embeddings');
        const results = await semanticSearch(value, searchType, { limit: 20 });
        if (onSemanticSearch) {
          onSemanticSearch(results, value);
        }
      } catch (error) {
        console.error('Semantic search error:', error);
        // Fallback to regular search
        if (onSearch) {
          onSearch(value);
        }
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
    if (onSemanticSearch) {
      onSemanticSearch([], '');
    }
  };

  const toggleSemanticMode = () => {
    setIsSemanticMode(!isSemanticMode);
    // Trigger search again with new mode
    if (query.trim().length > 0) {
      handleChange({ target: { value: query } });
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
          className={`w-full ${enableSemanticSearch ? 'pl-10 sm:pl-12 pr-20 sm:pr-24' : 'pl-10 sm:pl-12 pr-9 sm:pr-10'} py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border ${isSemanticMode ? 'border-purple-500/50' : 'border-white/10'} rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[44px]`}
        />
        <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {isSearching && (
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-purple-500 mr-1"></div>
          )}
          {enableSemanticSearch && (
            <button
              onClick={toggleSemanticMode}
              className={`p-1.5 rounded-lg transition-all min-w-[32px] min-h-[32px] flex items-center justify-center ${
                isSemanticMode 
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              title={isSemanticMode ? 'AI Search (Active)' : 'Enable AI Search'}
              aria-label="Toggle semantic search"
            >
              <Sparkles size={16} className="w-4 h-4" />
            </button>
          )}
          {query && (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-white active:text-white transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
              aria-label="Clear search"
            >
              <X size={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBar;

