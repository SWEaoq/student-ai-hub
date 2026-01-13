import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, BookOpen, Terminal, GraduationCap } from 'lucide-react'; // Fallback icons
import { supabase } from '../lib/supabase';
import { ICON_MAP } from '../lib/iconMap';
import Hero from '../components/Hero';
import StaggerContainer from '../components/animations/StaggerContainer';
import AnimatedCard from '../components/animations/AnimatedCard';
import { CONTENT } from '../data/content';

const Home = ({ lang }) => {
    const t = CONTENT[lang] || CONTENT['en'];
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

            <section className="px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20 max-w-7xl mx-auto">
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
                                        ⭐ {t.common.gem}
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
        </div>
    );
};

export default Home;
