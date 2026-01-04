import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Hero from '../components/Hero';
import ToolCard from '../components/ToolCard';
import { TOOLS } from '../data/content';
import StaggerContainer from '../components/animations/StaggerContainer';
import SearchBar from '../components/ui/SearchBar';
import EmptyState from '../components/ui/EmptyState';

const Tools = ({ lang }) => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTools = useMemo(() => {
        let tools = activeCategory === 'all'
            ? TOOLS
            : TOOLS.filter(tool => tool.category.toLowerCase() === activeCategory.toLowerCase());
        
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            tools = tools.filter(tool => {
                const content = tool.content[lang];
                return (
                    content.name.toLowerCase().includes(query) ||
                    content.description.toLowerCase().includes(query) ||
                    content.tag.toLowerCase().includes(query)
                );
            });
        }
        
        return tools;
    }, [activeCategory, searchQuery, lang]);

    const isRTL = lang === 'ar';

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-6 pt-32">
                <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className={`w-5 h-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                    {lang === 'en' ? 'Back' : 'رجوع'}
                </button>
            </div>

            <Hero
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                lang={lang}
                showFilters={true}
            />

            {/* Tool Grid Section */}
            <section className="px-6 pb-20 max-w-7xl mx-auto">
                <div className="mb-8">
                    <SearchBar
                        onSearch={setSearchQuery}
                        placeholder={lang === 'en' ? 'Search tools...' : 'ابحث عن الأدوات...'}
                    />
                </div>

                {filteredTools.length > 0 ? (
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTools.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} lang={lang} />
                        ))}
                    </StaggerContainer>
                ) : (
                    <EmptyState 
                        message={lang === 'en' ? 'No tools found. Try a different search.' : 'لم يتم العثور على أدوات. جرب بحثًا مختلفًا.'}
                    />
                )}
            </section>
        </div>
    );
};

export default Tools;
