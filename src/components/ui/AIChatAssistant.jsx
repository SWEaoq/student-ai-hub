
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Sparkles } from 'lucide-react';
import { useSiteContent } from '../../hooks/useSiteContent';
import ChatInterface from './ChatInterface';

const AIChatAssistant = () => {
    const { lang } = useSiteContent();
    const [isOpen, setIsOpen] = useState(false);
    
    // We can't easily peek into messages length from here without lifting state up or using context.
    // For the notification dot, we might just show it initially or remove it for now to simplify.
    // Or we can assume if it's closed, show a dot if we want to prompt them. 
    // Let's keep it simple for now and maybe remove the dot or just show it if we want to nudge.
    // The original code used: !isOpen && messages.length <= 1
    // Since we don't have access to messages length here easily without prop drilling which isn't clean for this separation,
    // I'll leave the dot out for now or just make it time based? 
    // Let's just remove the dot logic for now to avoid complexity, or just show it always if closed as a "nudge"? 
    // The user didn't ask for the dot specifically.
    
    return (
        <div className={`fixed bottom-4 sm:bottom-8 z-50 ${lang === 'ar' ? 'left-4 sm:left-8' : 'right-4 sm:right-8'} font-sans`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-16 sm:bottom-20 mb-2 w-[90vw] sm:w-[380px] h-[500px] max-h-[70vh] flex flex-col origin-bottom-right"
                        style={{ [lang === 'ar' ? 'left' : 'right']: 0 }}
                    >
                        {/* Header with Close included in the ChatInterface wrapper or separate? 
                           ChatInterface is just the inside. We need the container shell here.
                        */}
                        <div className="bg-[#050505]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col h-full overflow-hidden">
                             {/* Header */}
                            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="text-purple-400" size={18} />
                                    <h3 className="font-bold text-white text-sm">
                                        {lang === 'ar' ? 'مساعد الذكاء الاصطناعي' : 'AI Guide'}
                                    </h3>
                                </div>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Chat Interface */}
                            <ChatInterface className="flex-1 border-0 rounded-none shadow-none bg-transparent" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAB Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg shadow-purple-900/30 flex items-center justify-center transition-all duration-300 relative z-50
                    ${isOpen ? 'bg-[#1a1a1a] text-white border border-white/10' : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'}
                `}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} fill="currentColor" className="opacity-90" />}
            </motion.button>
        </div>
    );
};

export default AIChatAssistant;
