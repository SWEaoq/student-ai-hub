import React from 'react';
import Hero from '../components/Hero';
import ToolCard from '../components/ToolCard';
import PromptVault from '../components/PromptVault';
import { TOOLS } from '../data/content';

const Home = ({ lang, activeCategory, setActiveCategory }) => {
    const filteredTools = activeCategory === 'all'
        ? TOOLS
        : TOOLS.filter(tool => tool.category.toLowerCase() === activeCategory.toLowerCase());

    return (
        <div className="w-full">
            <Hero
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                lang={lang}
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

            <PromptVault lang={lang} />
        </div>
    );
};

export default Home;
