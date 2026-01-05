import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { CONTENT } from '../data/content';

const Navbar = ({ lang, setLang }) => {
    return (
        <motion.nav 
            className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-24 flex items-center justify-between`}>
                <motion.div 
                    className="text-xl sm:text-2xl font-bold tracking-tighter text-white relative group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    STUDENT <span className="text-purple-500">AI</span> HUB
                    {/* Animated Underline on Hover */}
                    <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                </motion.div>
                <div className={`flex items-center gap-2 sm:gap-4 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <motion.button
                        onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 sm:py-1.5 min-h-[44px] min-w-[44px] rounded-full bg-white/5 hover:bg-white/10 active:bg-white/10 text-xs font-medium text-gray-300 transition-all border border-white/10 overflow-hidden"
                    >
                        {/* Glow effect on hover */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.3 }}
                        />
                        
                        <Globe size={16} className="relative z-10 sm:w-3.5 sm:h-3.5" />
                        
                        <span className="relative z-10 hidden sm:inline">
                            {lang === 'en' ? 'Arabic / عربي' : 'English'}
                        </span>
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
