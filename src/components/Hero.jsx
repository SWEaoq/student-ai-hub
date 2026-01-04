import React from 'react';
import { Zap, PenTool, Presentation, Code, Layout } from 'lucide-react';
import { CONTENT } from '../data/content';
import FadeIn from './animations/FadeIn';

const Hero = ({ activeCategory, setActiveCategory, lang, showFilters = true }) => {
    const t = CONTENT[lang];

    const categories = [
        { id: 'all', label: t.categories.all, icon: <Zap /> },
        { id: 'writing', label: t.categories.writing, icon: <PenTool /> },
        { id: 'slides', label: t.categories.slides, icon: <Presentation /> },
        { id: 'design', label: t.categories.design, icon: <Code /> },
        { id: 'productivity', label: t.categories.productivity, icon: <Layout /> }
    ];

    return (
        <section className="pt-32 pb-16 px-6 relative overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {/* Background Glows */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-5xl mx-auto text-center relative z-10">
                <FadeIn delay={0.1}>
                    <h1 className={`text-6xl md:text-8xl font-black text-white mb-6 ${lang === 'ar' ? 'leading-[1.4] py-6' : 'tracking-tight leading-none'}`}>
                        {t.hero.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 pb-2 inline-block">{t.hero.title1_accent}</span>
                        <br />
                        {t.hero.title2} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 pb-2 inline-block">{t.hero.title2_accent}</span>
                    </h1>
                </FadeIn>

                <FadeIn delay={0.3}>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                        {t.hero.subtitle}
                    </p>
                </FadeIn>

                {/* Category Filter Pills */}
                {showFilters && (
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`
                                    group relative px-6 py-3 rounded-xl border flex items-center gap-2 transition-all duration-300
                                    ${activeCategory.toLowerCase() === cat.id
                                        ? 'bg-white/10 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                                        : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}
                                `}
                            >
                                {React.cloneElement(cat.icon, { size: 18 })}
                                <span className={`font-semibold ${lang === 'ar' ? 'font-sans' : ''}`}>{cat.label}</span>
                                {activeCategory.toLowerCase() === cat.id && (
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-ping" />
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;
