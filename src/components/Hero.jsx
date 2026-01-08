import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, PenTool, Presentation, Code, Layout, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTENT, TOOLS } from '../data/content';
import FadeIn from './animations/FadeIn';
import MagicSearch from './ui/MagicSearch';

// Animated Gradient Text Component
const AnimatedGradientText = ({ children, className = '' }) => {
    return (
        <span
            className={`${className} bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-text`}
            style={{
                backgroundSize: '200% auto',
                animation: 'gradient-text 3s linear infinite',
            }}
        >
            {children}
        </span>
    );
};

// Particle Burst Component
const ParticleBurst = ({ x, y, onComplete }) => {
    const particles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        angle: (i * 360) / 12,
        distance: 50 + Math.random() * 30,
    }));

    return (
        <div className="absolute pointer-events-none" style={{ left: x, top: y }}>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute w-2 h-2 bg-purple-400 rounded-full"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                        x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
                        y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance,
                        opacity: 0,
                        scale: 0,
                    }}
                    transition={{
                        duration: 0.6,
                        ease: 'easeOut',
                    }}
                    onAnimationComplete={onComplete}
                />
            ))}
        </div>
    );
};

const Hero = ({ activeCategory, setActiveCategory, lang, showFilters = true }) => {
    const t = CONTENT[lang];
    const [particleBursts, setParticleBursts] = useState([]);
    const [previousCategory, setPreviousCategory] = useState(activeCategory);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const categories = [
        { id: 'all', label: t.categories.all, icon: <Zap /> },
        { id: 'writing', label: t.categories.writing, icon: <PenTool /> },
        { id: 'slides', label: t.categories.slides, icon: <Presentation /> },
        { id: 'design', label: t.categories.design, icon: <Code /> },
        { id: 'productivity', label: t.categories.productivity, icon: <Layout /> }
    ];

    // Search Handler
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const results = TOOLS.filter(tool => {
            const name = tool.content[lang].name.toLowerCase();
            const desc = tool.content[lang].description.toLowerCase();
            const tag = tool.content[lang].tag.toLowerCase();
            return name.includes(lowerQuery) || desc.includes(lowerQuery) || tag.includes(lowerQuery);
        }).slice(0, 5); // Limit to 5 results

        setSearchResults(results);
    };

    // Handle category change with particle burst
    const handleCategoryClick = (catId, event) => {
        if (catId !== activeCategory) {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            const burstId = Date.now();
            setParticleBursts([...particleBursts, { id: burstId, x, y }]);

            setTimeout(() => {
                setParticleBursts((prev) => prev.filter((b) => b.id !== burstId));
            }, 600);
        }

        setActiveCategory(catId);
        setPreviousCategory(catId);
    };

    return (
        <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 relative overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {/* Enhanced Background Glows - Scaled down on mobile */}
            <motion.div
                className="absolute top-20 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-600/20 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] pointer-events-none"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-20 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-blue-600/20 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] pointer-events-none"
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.2, 0.25, 0.2],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                }}
            />

            <div className="max-w-5xl mx-auto text-center relative z-10">
                <FadeIn delay={0.1}>
                    <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6 ${lang === 'ar' ? 'leading-[1.4] py-4 sm:py-6' : 'tracking-tight leading-none'}`}>
                        {t.hero.title1} <AnimatedGradientText className="pb-2 inline-block">{t.hero.title1_accent}</AnimatedGradientText>
                        <br />
                        {t.hero.title2} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 pb-2 inline-block animate-gradient-text-2">{t.hero.title2_accent}</span>
                    </h1>
                </FadeIn>

                <FadeIn delay={0.3}>
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10 px-4 sm:px-0 font-light leading-relaxed">
                        {t.hero.subtitle}
                    </p>
                </FadeIn>

                {/* Magic Search Section */}
                <div className="relative max-w-2xl mx-auto mb-12 sm:mb-16 px-4 z-50">
                    <MagicSearch
                        placeholder={t.common.searchPlaceholder || "Search tools (e.g. 'writing', 'presentation')..."}
                        onSearch={handleSearch}
                        lang={lang}
                    />

                    {/* Search Results Dropdown */}
                    <AnimatePresence>
                        {searchQuery && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 right-0 mt-2 mx-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/40 z-50"
                            >
                                {searchResults.length > 0 ? (
                                    <div className="py-2">
                                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                            <Sparkles size={12} className="text-purple-400" />
                                            {lang === 'en' ? 'Top Results' : 'أفضل النتائج'}
                                        </div>
                                        {searchResults.map((tool) => (
                                            <Link
                                                key={tool.id}
                                                to={`/tool/${tool.id}`}
                                                className="block px-4 py-3 hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shadow-lg`}>
                                                            <tool.icon size={20} />
                                                        </div>
                                                        <div className="text-left">
                                                            <h4 className="text-white font-medium group-hover:text-purple-400 transition-colors">
                                                                {tool.content[lang].name}
                                                            </h4>
                                                            <p className="text-xs text-gray-400">
                                                                {tool.content[lang].tag}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <ArrowRight size={16} className="text-gray-500 group-hover:text-white transform group-hover:translate-x-1 transition-all" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center text-gray-400">
                                        <p>{t.common.noResults}</p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Category Filter Pills with Enhanced Animations */}
                {showFilters && !searchQuery && (
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 relative px-4 sm:px-0">
                        <AnimatePresence>
                            {particleBursts.map((burst) => (
                                <ParticleBurst key={burst.id} x={burst.x} y={burst.y} />
                            ))}
                        </AnimatePresence>

                        {categories.map((cat) => {
                            const isActive = activeCategory.toLowerCase() === cat.id;
                            return (
                                <motion.button
                                    key={cat.id}
                                    onClick={(e) => handleCategoryClick(cat.id, e)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`
                                        group relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border flex items-center gap-1.5 sm:gap-2 transition-all duration-300 overflow-hidden min-h-[44px]
                                        ${isActive
                                            ? 'bg-white/10 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                                            : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/30 hover:text-white active:border-white/30 active:text-white'}
                                    `}
                                >
                                    {/* Enhanced Glow Effect for Active Category */}
                                    {isActive && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                                            animate={{
                                                opacity: [0.3, 0.5, 0.3],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    )}

                                    {/* Icon */}
                                    <motion.div
                                        animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                                        transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 2 }}
                                    >
                                        {React.cloneElement(cat.icon, { size: 16, className: "sm:w-[18px] sm:h-[18px]" })}
                                    </motion.div>

                                    <span className={`text-sm sm:text-base font-semibold relative z-10 ${lang === 'ar' ? 'font-sans' : ''}`}>{cat.label}</span>

                                    {isActive && (
                                        <motion.span
                                            className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full"
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                opacity: [1, 0.5, 1],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;
