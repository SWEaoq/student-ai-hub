import React from 'react';
import { useSiteContent } from '../hooks/useSiteContent';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ lang, setLang }) => {
    const { navigation } = useSiteContent();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    // Lock body scroll when menu is open
    React.useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const menuVariants = {
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 30
            }
        }
    };

    const linkVariants = {
        closed: { x: 50, opacity: 0 },
        open: (i) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        })
    };

    return (
        <motion.nav 
            className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-24 flex items-center justify-between relative`}>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.div 
                        className="text-xl sm:text-2xl font-bold tracking-tighter text-white relative group cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        THE <span className="text-purple-500">AI</span> HUB
                        {/* Animated Underline on Hover */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                    </motion.div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
                    <a 
                        href="/chat"
                        className="text-sm font-medium transition-colors hover:text-purple-400 text-gray-300"
                    >
                        {lang === 'ar' ? 'المساعد' : 'Assistant'}
                    </a>
                    {navigation.filter(navItem => (navItem.label.en || navItem.label['en']) !== 'Academy').map((navItem) => (
                        <a 
                            key={navItem.id} 
                            href={navItem.path}
                            className={`text-sm font-medium transition-colors hover:text-purple-400 ${navItem.is_button ? 'px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 text-white' : 'text-gray-300'}`}
                        >
                            {navItem.label[lang] || navItem.label['en']}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    {/* Language Switcher */}
                    <motion.button
                        onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`group relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 sm:py-1.5 min-h-[44px] min-w-[44px] rounded-full bg-white/5 hover:bg-white/10 active:bg-white/10 text-xs font-medium text-gray-300 transition-all border border-white/10 overflow-hidden ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.3 }}
                        />
                        <Globe size={16} className="relative z-10 sm:w-3.5 sm:h-3.5" />
                        <span className="relative z-10 hidden sm:inline">
                            {lang === 'en' ? 'Arabic / عربي' : 'English'}
                        </span>
                    </motion.button>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <motion.button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-white z-50 relative"
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center p-8 md:hidden"
                    >
                        <div className="flex flex-col items-center gap-8 w-full max-w-sm">
                            <motion.a
                                href="/chat"
                                custom={0}
                                variants={linkVariants}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-2xl font-bold text-gray-200 hover:text-purple-400 transition-colors"
                            >
                                {lang === 'ar' ? 'المساعد' : 'Assistant'}
                            </motion.a>

                            {navigation.filter(navItem => (navItem.label.en || navItem.label['en']) !== 'Academy').map((navItem, index) => (
                                <motion.a
                                    key={navItem.id}
                                    href={navItem.path}
                                    custom={index + 1}
                                    variants={linkVariants}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-2xl font-bold transition-colors ${
                                        navItem.is_button 
                                            ? 'px-8 py-3 bg-purple-600 rounded-xl hover:bg-purple-700 text-white' 
                                            : 'text-gray-200 hover:text-purple-400'
                                    }`}
                                >
                                    {navItem.label[lang] || navItem.label['en']}
                                </motion.a>
                            ))}
                        </div>

                        {/* Decoration Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
