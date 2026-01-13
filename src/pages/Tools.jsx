import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Hero from '../components/Hero';
import ToolCard from '../components/ToolCard';
import { CONTENT } from '../data/content';
import StaggerContainer from '../components/animations/StaggerContainer';
import SearchBar from '../components/ui/SearchBar';
import EmptyState from '../components/ui/EmptyState';
import { supabase } from '../lib/supabase';
import { ICON_MAP } from '../lib/iconMap';

const Tools = ({ lang }) => {
    // Ensure t is defined with a fallback
    const t = CONTENT[lang] || CONTENT['en'];
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);

    // Predefined gradients for fallback
    const FALLBACK_GRADIENTS = [
        'from-blue-500 to-blue-700',
        'from-purple-500 to-purple-700',
        'from-green-500 to-green-700',
        'from-red-500 to-red-700',
        'from-orange-500 to-orange-700',
        'from-cyan-500 to-cyan-700',
        'from-pink-500 to-pink-700',
        'from-indigo-500 to-indigo-700',
        'from-teal-500 to-teal-700'
    ];

    // Fetch tools from Supabase
    useEffect(() => {
        const fetchTools = async () => {
            try {
                const { data, error } = await supabase.from('tools').select('*');
                if (error) {
                    console.error('Error fetching tools:', error);
                } else if (data) {
                    const processedTools = data.map((tool, index) => {
                        // Use DB color if valid, otherwise pick deterministically based on ID/Index
                        let assignedColor = tool.color;
                        if (!assignedColor || !assignedColor.includes('from-')) {
                            // Assign varied colors based on index
                            const hash = index % FALLBACK_GRADIENTS.length;
                            assignedColor = FALLBACK_GRADIENTS[hash];
                        }

                        return {
                            ...tool,
                            color: assignedColor,
                            icon: ICON_MAP[tool.icon_name] || Sparkles // Fallback icon
                        };
                    });
                    setTools(processedTools);
                }
            } catch (err) {
                console.error('Unexpected error fetching tools:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTools();
    }, []);

    const filteredTools = useMemo(() => {
        if (!tools) return [];
        
        // Safely filter by category
        let filtered = activeCategory === 'all'
            ? tools
            : tools.filter(tool => tool.category && tool.category.toLowerCase() === activeCategory.toLowerCase());

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(tool => {
                // Check if content structure matches expected JSON
                const content = tool.content?.[lang] || tool.content?.['en'];
                if (!content) return false;
                
                return (
                    content.name?.toLowerCase().includes(query) ||
                    content.description?.toLowerCase().includes(query) ||
                    content.tag?.toLowerCase().includes(query)
                );
            });
        }

        return filtered;
    }, [activeCategory, searchQuery, lang, tools]);

    const isRTL = lang === 'ar';

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-32">
                <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-400 hover:text-white active:text-white mb-6 sm:mb-8 transition-colors min-h-[44px]">
                    <ArrowLeft className={`w-5 h-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                    {t.common.back}
                </button>
            </div>

            <Hero
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                lang={lang}
                showFilters={true}
            />

            {/* Tool Grid Section */}
            <section className="px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20 max-w-7xl mx-auto">
                <div className="mb-6 sm:mb-8">
                    <SearchBar
                        onSearch={setSearchQuery}
                        placeholder={t.common.searchPlaceholder}
                    />
                </div>

                {loading ? (
                    <div className="min-h-[40vh] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                ) : filteredTools.length > 0 ? (
                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
                        {filteredTools.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} lang={lang} />
                        ))}
                    </StaggerContainer>
                ) : (
                    <EmptyState
                        message={t.common.noResults}
                    />
                )}
            </section>
        </div>
    );
};

export default Tools;
