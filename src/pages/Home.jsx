import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, BookOpen, Terminal, GraduationCap, MessageCircle } from 'lucide-react'; // Fallback icons
import { supabase } from '../lib/supabase';
import { ICON_MAP } from '../lib/iconMap';
import Hero from '../components/Hero';
import StaggerContainer from '../components/animations/StaggerContainer';
import AnimatedCard from '../components/animations/AnimatedCard';
// import { CONTENT } from '../data/content'; // Removed static
import { useSiteContent } from '../hooks/useSiteContent';

const Home = () => {
    const { lang, getText } = useSiteContent();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const { data, error } = await supabase
                    .from('home_cards')
                    .select('*')
                    .order('order', { ascending: true });
                
                if (error) throw error;

                if (data) {
                    const processedCards = data.map(card => ({
                        ...card,
                        title: card.title[lang] || card.title['en'],
                        desc: card.description[lang] || card.description['en'],
                        icon: ICON_MAP[card.icon_name] || Zap,
                        isFeatured: card.is_featured
                    }));
                    // Add Chatbot Card
                    processedCards.push({
                        id: 'chatbot-card',
                        title: lang === 'ar' ? 'المساعد الذكي' : 'AI Assistant',
                        desc: lang === 'ar' ? 'اسأل المساعد الذكي عن أي شيء تحتاج مساعدة فيه.' : 'Ask the AI Assistant regarding anything you need help with.',
                        icon: MessageCircle,
                        color: 'purple',
                        link: '/chat',
                        isFeatured: false
                    });

                    setCards(processedCards);
                }
            } catch (error) {
                console.error('Error fetching home cards:', error);
                // Fallback or empty state
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, [lang]);

    return (
        <div className="w-full">
            <Hero lang={lang} showFilters={false} />

            <section className="px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20 max-w-7xl mx-auto pt-8">
                <StaggerContainer className={`grid grid-cols-1 sm:grid-cols-2 ${cards.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} gap-4 sm:gap-6 items-stretch`}>
                    {cards.map((card) => (
                        <AnimatedCard
                            key={card.id}
                            enableHover={true}
                            className={`h-full ${card.isFeatured ? 'sm:col-span-2 md:col-span-1 lg:col-span-2' : ''}`}
                        >
                            <Link
                                to={card.link}
                                className={`group relative p-6 sm:p-8 ${card.isFeatured ? 'md:p-10' : ''} rounded-2xl sm:rounded-3xl bg-gradient-to-br ${card.isFeatured ? 'from-purple-500/20 via-pink-500/20 to-red-500/20 border-2 border-purple-500/30' : 'bg-white/5 border border-white/10'} hover:bg-white/10 active:bg-white/10 transition-all duration-300 overflow-hidden flex flex-col h-full`}
                            >
                                <div className={`absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 ${card.isFeatured ? 'w-40 h-40 sm:w-48 sm:h-48' : ''} bg-${card.color}-500/20 rounded-full blur-[40px] sm:blur-[60px] group-hover:bg-${card.color}-500/30 transition-all`} />

                                {card.isFeatured && (
                                    <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                                        ⭐ {getText('common.gem')}
                                    </div>
                                )}

                                <div className={`w-12 h-12 sm:w-14 sm:h-14 ${card.isFeatured ? 'sm:w-16 sm:h-16' : ''} rounded-xl sm:rounded-2xl bg-${card.color}-500/20 flex items-center justify-center mb-4 sm:mb-6 text-${card.color}-400 group-hover:scale-110 transition-transform`}>
                                    <card.icon size={card.isFeatured ? 32 : 24} className={card.isFeatured ? 'sm:w-10 sm:h-10' : 'sm:w-7 sm:h-7'} />
                                </div>

                                <h3 className={`${card.isFeatured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'} font-bold text-white mb-2 sm:mb-3`}>{card.title}</h3>
                                <p className={`${card.isFeatured ? 'text-base sm:text-lg' : 'text-sm sm:text-base'} text-gray-400 leading-relaxed flex-grow`}>{card.desc}</p>
                            </Link>
                        </AnimatedCard>
                    ))}
                </StaggerContainer>
            </section>

            {/* VibeQuest Spotlight Section */}
            <section className="px-4 sm:px-6 py-8 sm:py-12 max-w-7xl mx-auto">
                <div className="relative rounded-3xl overflow-hidden">
                    {/* Background with gradient and mesh */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/50 to-pink-900/50 backdrop-blur-xl border border-white/10" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    
                    {/* Glowing orbs */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center p-8 sm:p-12">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-purple-200">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                </span>
                                {lang === 'ar' ? 'جديد! تجربة غامرة' : 'New! Immersive Experience'}
                            </div>
                            
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                                VibeQuest <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">21</span>
                            </h2>
                            
                            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                                {lang === 'ar' 
                                    ? 'انطلق في رحلة تعليمية تفاعلية. اكتشف، تعلم، وارتقِ بمهاراتك في بيئة ثلاثية الأبعاد مذهلة.'
                                    : 'Embark on an interactive learning journey. Explore, learn, and level up your skills in a stunning 3D environment.'}
                            </p>

                            <div className="flex flex-wrap gap-4 pt-2">
                                <a 
                                    href="https://vibequest21.vercel.app" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-white/10 flex items-center gap-2"
                                >
                                    {lang === 'ar' ? 'ابدأ الرحلة' : 'Start the Quest'}
                                    <Zap size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
                                </a>
                            </div>
                        </div>

                        <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:scale-110 transition-transform duration-700" />
                            {/* Placeholder for visual visual - using a game-like composition */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center space-y-4">
                                    <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(168,85,247,0.3)] animate-bounce">
                                        <GraduationCap size={40} className="text-white" />
                                    </div>
                                    <div className="text-2xl font-bold text-white tracking-widest uppercase">Level Up</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
