import React from 'react';
// import { CONTENT } from '../data/content'; // Removed static
import { useSiteContent } from '../hooks/useSiteContent';

const FilterBar = ({ activeCategory, setActiveCategory }) => {
    const { getText } = useSiteContent();
    const categories = ['all', 'writing', 'coding', 'slides', 'productivity', 'design', 'research'];

    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12 px-4">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === cat
                            ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:border-white/30'
                        }`}
                >
                    {getText(`filters.${cat}`, cat)}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;
