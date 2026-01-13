import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MagicSearch = ({
    onSearch,
    placeholder = "Search...",
    className = "",
    lang = 'en'
}) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    // Keyboard shortcut (Cmd/Ctrl + K)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
            if (e.key === 'Escape') {
                inputRef.current?.blur();
                setIsFocused(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (onSearch) onSearch(value);
    };

    const handleClear = () => {
        setQuery('');
        if (onSearch) onSearch('');
        inputRef.current?.focus();
    };

    return (
        <div className={`relative w-full max-w-2xl mx-auto group ${className}`}>
            {/* Ambient Glow - Removed for cleaner look */}
            
            {/* Main Search Container */}
            <div className={`
                relative flex items-center bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300
                ${isFocused ? 'bg-white/10 ring-1 ring-white/20' : 'hover:bg-white/10'}
            `}>
                {/* Search Icon */}
                <div className={`${lang === 'ar' ? 'pr-4 sm:pr-6 pl-2' : 'pl-4 sm:pl-6 pr-2'} text-gray-400`}>
                    <Search className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${isFocused ? 'text-white' : ''}`} />
                </div>

                {/* Input Field */}
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className={`
                        w-full py-4 sm:py-5 bg-transparent text-white placeholder-gray-500 text-base sm:text-lg outline-none
                        ${lang === 'ar' ? 'text-right' : 'text-left'}
                        font-medium
                    `}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                />

                {/* Right Actions */}
                <div className={`${lang === 'ar' ? 'pl-4 sm:pl-6' : 'pr-4 sm:pr-6'} flex items-center gap-3`}>
                    <AnimatePresence>
                        {query && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={handleClear}
                                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
                            >
                                <X size={16} />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Keyboard Shortcut Hint (Desktop only) */}
                    <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-500 font-mono">
                        <Command size={10} />
                        <span>K</span>
                    </div>
                </div>
            </div>

            {/* Active Indication Line - Made subtle white/gray instead of purple */}
            <motion.div
                className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent w-full"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: isFocused ? 1 : 0, opacity: isFocused ? 1 : 0 }}
                transition={{ duration: 0.4 }}
            />
        </div>
    );
};

export default MagicSearch;
