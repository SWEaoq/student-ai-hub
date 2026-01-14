import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { findSimilarItems } from '../utils/embeddings';
import { ICON_MAP } from '../lib/iconMap';
import ToolCard from './ToolCard';
import AnimatedCard from './animations/AnimatedCard';
import FadeIn from './animations/FadeIn';

/**
 * Recommendations Component
 * Displays recommended tools or prompts based on similarity
 * @param {Object} item - The current item (tool or prompt)
 * @param {string} type - 'tool' or 'prompt'
 * @param {string} lang - Language ('en' or 'ar')
 * @param {number} limit - Number of recommendations (default: 4)
 */
const Recommendations = ({ item, type, lang, limit = 4 }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (!item || !item.embedding) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const results = await findSimilarItems(
                    item.embedding,
                    type,
                    {
                        limit: limit + 1, // +1 to account for excluding current item
                        threshold: 0.6,
                        excludeId: item.id,
                    }
                );

                // Filter out the current item and limit results
                const filtered = results
                    .filter(rec => rec.id !== item.id)
                    .slice(0, limit)
                    .map(rec => ({
                        ...rec,
                        icon: type === 'tool' ? (ICON_MAP[rec.icon_name] || Sparkles) : null,
                    }));

                setRecommendations(filtered);
            } catch (err) {
                console.error('Error fetching recommendations:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [item, type, limit]);

    if (loading) {
        return (
            <FadeIn>
                <div className="mt-12">
                    <h3 className="text-xl font-bold text-white mb-6">
                        {lang === 'ar' ? 'أدوات مشابهة' : 'Similar Tools'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(limit)].map((_, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse">
                                <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-white/10 rounded w-full mb-1"></div>
                                <div className="h-3 bg-white/10 rounded w-2/3"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </FadeIn>
        );
    }

    if (error || recommendations.length === 0) {
        return null; // Don't show section if no recommendations
    }

    if (type === 'tool') {
        return (
            <FadeIn delay={0.3}>
                <div className="mt-12 sm:mt-16">
                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                            {lang === 'ar' ? 'أدوات مشابهة' : 'Similar Tools'}
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {recommendations.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} lang={lang} />
                        ))}
                    </div>
                </div>
            </FadeIn>
        );
    }

    // For prompts
    return (
        <FadeIn delay={0.3}>
            <div className="mt-12 sm:mt-16">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">
                    {lang === 'ar' ? 'أوامر مشابهة' : 'Similar Prompts'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {recommendations.map((prompt) => {
                        const content = prompt.content?.[lang] || prompt.content?.['en'] || {};
                        if (!content.title) return null;

                        return (
                            <AnimatedCard key={prompt.id} enableHover={true} className="h-full">
                                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 sm:p-6 relative group h-full flex flex-col">
                                    <div className={`absolute top-3 sm:top-4 ${lang === 'ar' ? 'left-3 sm:left-4' : 'right-3 sm:right-4'} text-[10px] sm:text-xs font-mono text-gray-600 px-2 py-1 border border-white/5 rounded`}>
                                        {content.tag || prompt.category}
                                    </div>
                                    <h3 className={`text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 ${lang === 'ar' ? 'pl-14 sm:pl-16' : 'pr-14 sm:pr-16'}`}>
                                        {content.title}
                                    </h3>
                                    <div className="bg-white/5 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm text-gray-300 leading-relaxed min-h-[80px] mb-3 sm:mb-4 border border-white/5 flex-grow">
                                        "{content.text?.substring(0, 150)}{content.text?.length > 150 ? '...' : ''}"
                                    </div>
                                    <Link
                                        to={`/prompts#${prompt.id}`}
                                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                                    >
                                        {lang === 'ar' ? 'عرض الأمر' : 'View Prompt'}
                                        <ArrowRight size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
                                    </Link>
                                </div>
                            </AnimatedCard>
                        );
                    })}
                </div>
            </div>
        </FadeIn>
    );
};

export default Recommendations;
