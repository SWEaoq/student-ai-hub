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
            if (!item) {
                setLoading(false);
                return;
            }

            // Check if embedding exists and is valid
            let hasValidEmbedding = false;
            let parsedEmbedding = null;
            
            if (item.embedding) {
                // Try to parse if it's a string
                if (typeof item.embedding === 'string') {
                    try {
                        parsedEmbedding = JSON.parse(item.embedding);
                    } catch {
                        parsedEmbedding = null;
                    }
                } else if (Array.isArray(item.embedding)) {
                    parsedEmbedding = item.embedding;
                }
                
                // Validate it's a proper array with numbers
                if (parsedEmbedding && Array.isArray(parsedEmbedding) && parsedEmbedding.length > 0) {
                    // Check if it's actually numbers (not empty or invalid)
                    const isValid = parsedEmbedding.every(val => typeof val === 'number' && !isNaN(val));
                    if (isValid) {
                        hasValidEmbedding = true;
                    }
                }
            }

            // If no valid embedding, try to generate one on the fly OR use category fallback
            if (!hasValidEmbedding) {
                console.log('[Recommendations] No embedding found for item:', item.id, '- generating on the fly...');
                try {
                    const { findSimilarItems } = await import('../utils/embeddings');
                    const { generateEmbedding } = await import('../lib/aiService');
                    const { generateAndStoreEmbedding } = await import('../utils/embeddings');
                    
                    // Generate embedding on the fly
                    const content = item.content?.[lang] || item.content?.['en'] || {};
                    const textToEmbed = [
                        content.name || item.name || '',
                        content.description || item.description || '',
                        content.tag || item.tag_line || '',
                        item.category || ''
                    ].filter(Boolean).join(' ');
                    
                    if (textToEmbed.trim()) {
                        console.log('[Recommendations] Generating embedding for:', textToEmbed.substring(0, 50) + '...');
                        const embedding = await generateEmbedding(textToEmbed);
                        
                        // Store embedding for future use (async, don't wait)
                        generateAndStoreEmbedding(item, type).catch(err => {
                            console.warn('[Recommendations] Failed to store embedding:', err);
                        });
                        
                        // Find similar items using the generated embedding
                        console.log('[Recommendations] Finding similar items...');
                        const results = await findSimilarItems(embedding, type, {
                            limit: limit + 1,
                            threshold: 0.4, // Lower threshold since we're generating on the fly
                            excludeId: item.id,
                        });
                        
                        console.log('[Recommendations] Found', results.length, 'similar items');
                        
                        // If no results with embeddings, try category-based fallback
                        if (results.length === 0) {
                            console.log('[Recommendations] No embeddings found, trying category-based fallback...');
                            const { supabase } = await import('../lib/supabase');
                            const { data: categoryTools } = await supabase
                                .from(type === 'tool' ? 'tools' : 'prompts')
                                .select('*')
                                .eq('category', item.category)
                                .neq('id', item.id)
                                .limit(limit);
                            
                            if (categoryTools && categoryTools.length > 0) {
                                const filtered = categoryTools
                                    .slice(0, limit)
                                    .map(rec => ({
                                        ...rec,
                                        icon: type === 'tool' ? (ICON_MAP[rec.icon_name] || Sparkles) : null,
                                    }));
                                console.log('[Recommendations] Found', filtered.length, 'items by category');
                                setRecommendations(filtered);
                            } else {
                                setRecommendations([]);
                            }
                        } else {
                            const filtered = results
                                .filter(rec => rec.id !== item.id)
                                .slice(0, limit)
                                .map(rec => ({
                                    ...rec,
                                    icon: type === 'tool' ? (ICON_MAP[rec.icon_name] || Sparkles) : null,
                                }));
                            
                            setRecommendations(filtered);
                        }
                    } else {
                        console.warn('[Recommendations] No text to embed');
                        setRecommendations([]);
                    }
                } catch (err) {
                    console.error('[Recommendations] Error generating embedding or finding similar:', err);
                    
                    // Fallback to category-based recommendations
                    if (item.category) {
                        try {
                            const { supabase } = await import('../lib/supabase');
                            const { data: categoryItems } = await supabase
                                .from(type === 'tool' ? 'tools' : 'prompts')
                                .select('*')
                                .eq('category', item.category)
                                .neq('id', item.id)
                                .limit(limit);
                            
                            if (categoryItems && categoryItems.length > 0) {
                                const categoryFiltered = categoryItems
                                    .slice(0, limit)
                                    .map(rec => ({
                                        ...rec,
                                        icon: type === 'tool' ? (ICON_MAP[rec.icon_name] || Sparkles) : null,
                                    }));
                                console.log('[Recommendations] Using category fallback:', categoryFiltered.length, 'items');
                                setRecommendations(categoryFiltered);
                            } else {
                                setRecommendations([]);
                            }
                        } catch (fallbackErr) {
                            console.error('[Recommendations] Category fallback failed:', fallbackErr);
                            setRecommendations([]);
                        }
                    } else {
                        setRecommendations([]);
                    }
                } finally {
                    setLoading(false);
                }
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Parse embedding if it's a string
                let embedding = item.embedding;
                if (typeof embedding === 'string') {
                    try {
                        embedding = JSON.parse(embedding);
                    } catch {
                        console.warn('[Recommendations] Failed to parse embedding string, generating new one');
                        // Fall through to generate new embedding
                        embedding = null;
                    }
                }

                // If embedding is still invalid, generate new one
                if (!embedding || !Array.isArray(embedding) || embedding.length === 0) {
                    console.log('[Recommendations] Invalid embedding format, generating new one...');
                    // Fall through to the on-the-fly generation logic below
                    throw new Error('Invalid embedding format');
                }

                const results = await findSimilarItems(
                    parsedEmbedding,
                    type,
                    {
                        limit: limit + 1, // +1 to account for excluding current item
                        threshold: 0.5,
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

                // If no results, try category fallback
                if (filtered.length === 0 && item.category) {
                    console.log('[Recommendations] No AI results, trying category fallback...');
                    const { supabase } = await import('../lib/supabase');
                    const { data: categoryItems } = await supabase
                        .from(type === 'tool' ? 'tools' : 'prompts')
                        .select('*')
                        .eq('category', item.category)
                        .neq('id', item.id)
                        .limit(limit);
                    
                    if (categoryItems && categoryItems.length > 0) {
                        const categoryFiltered = categoryItems
                            .slice(0, limit)
                            .map(rec => ({
                                ...rec,
                                icon: type === 'tool' ? (ICON_MAP[rec.icon_name] || Sparkles) : null,
                            }));
                        setRecommendations(categoryFiltered);
                    } else {
                        setRecommendations([]);
                    }
                } else {
                    setRecommendations(filtered);
                }
            } catch (err) {
                console.error('Error fetching recommendations:', err);
                
                // If error is about invalid embedding, try category fallback
                if (err.message.includes('embedding') && item.category) {
                    console.log('[Recommendations] Embedding error, using category fallback...');
                    try {
                        const { supabase } = await import('../lib/supabase');
                        const { data: categoryItems } = await supabase
                            .from(type === 'tool' ? 'tools' : 'prompts')
                            .select('*')
                            .eq('category', item.category)
                            .neq('id', item.id)
                            .limit(limit);
                        
                        if (categoryItems && categoryItems.length > 0) {
                            const categoryFiltered = categoryItems
                                .slice(0, limit)
                                .map(rec => ({
                                    ...rec,
                                    icon: type === 'tool' ? (ICON_MAP[rec.icon_name] || Sparkles) : null,
                                }));
                            setRecommendations(categoryFiltered);
                        } else {
                            setRecommendations([]);
                        }
                    } catch (fallbackErr) {
                        console.error('[Recommendations] Category fallback also failed:', fallbackErr);
                        setError(null); // Don't show error, just show nothing
                        setRecommendations([]);
                    }
                } else {
                    setError(err.message);
                    setRecommendations([]);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [item, type, limit, lang]);

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

    if (error) {
        // Log error but don't show to user (silent fail)
        console.warn('[Recommendations] Error:', error);
        return null;
    }

    if (recommendations.length === 0) {
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
