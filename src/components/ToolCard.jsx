import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react'; // ExternalLink removed if not used, but wait, check if I need to remove the line or edit it. 
// Actually, ExternalLink is the only import from 'lucide-react' in that file?
// Checking file content from Step 17...
// line 4: import { ExternalLink } from 'lucide-react';
// Yes. So I can remove the whole line.
// import { CONTENT } from '../data/content'; // Removed static
import { useSiteContent } from '../hooks/useSiteContent';
import { enhancedCardHover, getAnimationConfig } from '../utils/animations';

const ToolCard = ({ tool }) => {
    const { lang } = useSiteContent();
    const { id, icon: Icon, color = 'blue' } = tool;
    const content = tool.content?.[lang] || tool.content?.['en'] || {};
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    // Fallback for color if it's a tailwind class string
    const gradientColor = (color && color.includes('from-')) ? color : `from-${color}-500 to-${color}-700`;
    const hoverConfig = getAnimationConfig(enhancedCardHover);

    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            initial="rest"
            whileHover="hover"
            variants={hoverConfig}
            className="h-full"
        >
            <Link
                ref={cardRef}
                to={`/tool/${id}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative bg-gray-900/50 border border-white/5 rounded-xl sm:rounded-2xl overflow-hidden hover:border-white/20 active:border-white/20 transition-all duration-300 hover:shadow-2xl flex flex-col h-full"
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
            >
            {/* Animated Border Glow that follows mouse */}
            <div 
                className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(176, 38, 255, 0.15), transparent 40%)`,
                }}
            />

            {/* Shimmer Effect Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>

            {/* Neon Top Border with Animation */}
            <motion.div 
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradientColor} opacity-0 group-hover:opacity-100`}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
            />

            {/* Animated Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-10 active:opacity-10 transition-opacity duration-300 pointer-events-none`} />

            <div className="p-4 sm:p-6 flex-grow relative z-10">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <motion.div 
                        className={`p-2 sm:p-3 rounded-lg bg-gradient-to-br ${gradientColor} bg-opacity-10 text-white`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/5 rounded text-[9px] sm:text-[10px] font-mono text-gray-400 uppercase tracking-wider border border-white/5">
                        {tool.category}
                    </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-purple-300 active:text-purple-300 transition-colors">
                    {content.name}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    {content.description}
                </p>
            </div>


        </Link>
        </motion.div>
    );
};

export default ToolCard;
