import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { CONTENT } from '../data/content';
import { cardHover, getAnimationConfig } from '../utils/animations';

const ToolCard = ({ tool, lang }) => {
    const t = CONTENT[lang];
    const { id, icon: Icon, color, website } = tool;
    const content = tool.content[lang];

    // Fallback for color if it's a tailwind class string
    const gradientColor = color.includes('from-') ? color : `from-${color}-500 to-${color}-700`;
    const hoverConfig = getAnimationConfig(cardHover);

    return (
        <motion.div
            initial="rest"
            whileHover="hover"
            variants={hoverConfig}
            className="h-full"
        >
            <Link
                to={`/tool/${id}`}
                className="group relative bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-xl flex flex-col h-full"
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
            >
            {/* Neon Top Border */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradientColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${gradientColor} bg-opacity-10 text-white`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-400 uppercase tracking-wider border border-white/5">
                        {tool.category}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {content.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    {content.description}
                </p>
            </div>

            <div className="px-6 py-4 border-t border-white/5 flex justify-between items-center bg-black/20 mt-auto">
                {tool.hasFreeTier && (
                    <span className="text-xs text-gray-500 font-mono">{t.cards.freeTier}</span>
                )}
                {!tool.hasFreeTier && (
                    <span className="text-xs text-gray-600 font-mono">Premium</span>
                )}
                <div className="text-white hover:text-purple-400 transition-colors">
                    <ExternalLink size={16} />
                </div>
            </div>
        </Link>
        </motion.div>
    );
};

export default ToolCard;
