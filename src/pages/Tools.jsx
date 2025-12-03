import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Hero from '../components/Hero';
import ToolCard from '../components/ToolCard';
import { TOOLS } from '../data/content';

const Tools = ({ lang }) => {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredTools = activeCategory === 'all'
        ? TOOLS
        : TOOLS.filter(tool => tool.category.toLowerCase() === activeCategory.toLowerCase());

    const isRTL = lang === 'ar';

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-6 pt-32">
                <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className={`w-5 h-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                    {lang === 'en' ? 'Back to Hub' : 'العودة إلى المركز'}
                </Link>
            </div>

            <Hero
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                lang={lang}
                showFilters={true}
            />

            {/* Tool Grid Section */}
            <section className="px-6 pb-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTools.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} lang={lang} />
                    ))}
                </div>

                {filteredTools.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p>No tools found for this category yet. We are adding more soon!</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Tools;
