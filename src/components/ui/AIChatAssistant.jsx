import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Copy, ExternalLink, Bot, User, Loader2 } from 'lucide-react';
import { getChatRecommendation } from '../../lib/aiService';
import { TOOLS } from '../../data/content'; 
import { useSiteContent } from '../../hooks/useSiteContent';

const MessageBubble = ({ message, lang }) => {
    const isUser = message.role === 'user';
    const [copied, setCopied] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isUser ? 'bg-purple-600' : 'bg-gradient-to-br from-cyan-500 to-blue-600'}`}>
                {isUser ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
            </div>

            {/* Content */}
            <div className={`flex flex-col gap-2 max-w-[85%]`}>
                {/* Text Bubble */}
                {message.text && (
                     <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        isUser 
                            ? 'bg-purple-600 text-white rounded-tr-none' 
                            : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                    } ${lang === 'ar' && !isUser ? 'text-right' : ''}`}>
                        {message.text}
                    </div>
                )}

                {/* Recipe Card (AI Recommendation) */}
                {message.recipe && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden mt-1"
                    >
                        {/* Header: Tool Info */}
                        <div className="p-3 border-b border-white/10 flex items-center gap-3 bg-white/5">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10">
                                <Sparkles size={14} className="text-purple-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                                    {lang === 'ar' ? 'الأداة المقترحة' : 'Recommended Tool'}
                                </div>
                                <div className="text-sm font-bold text-white truncate">
                                    {message.recipe.toolName}
                                </div>
                            </div>
                            {message.recipe.toolUrl && (
                                <a 
                                    href={message.recipe.toolUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                    title={lang === 'ar' ? 'فتح الأداة' : 'Open Tool'}
                                >
                                    <ExternalLink size={14} />
                                </a>
                            )}
                        </div>

                        {/* Reasoning */}
                        {message.recipe.reasoning && (
                             <div className={`px-3 py-2 text-xs text-gray-400 border-b border-white/5 bg-black/20 italic ${lang === 'ar' ? 'text-right' : ''}`}>
                                "{message.recipe.reasoning}"
                            </div>
                        )}

                        {/* Prompt Display */}
                        <div className="p-3 bg-black/40">
                            <div className="text-[10px] uppercase text-gray-500 font-bold mb-2 tracking-wider">
                                {lang === 'ar' ? 'البرومبت (الأمر)' : 'THE PROMPT'}
                            </div>
                            <div className={`text-xs sm:text-sm font-mono text-gray-300 bg-white/5 rounded-lg p-3 border border-white/5 leading-relaxed whitespace-pre-wrap ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                                {message.recipe.prompt}
                            </div>
                            
                            <button
                                onClick={() => handleCopy(message.recipe.prompt)}
                                className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all active:scale-95"
                            >
                                {copied ? <Sparkles size={14} /> : <Copy size={14} />}
                                {copied 
                                    ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') 
                                    : (lang === 'ar' ? 'نسخ واستخدام' : 'Copy Prompt')}
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const AIChatAssistant = () => {
    const { lang } = useSiteContent();
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Initial greeting
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{
                id: 'welcome',
                role: 'assistant',
                text: lang === 'ar' 
                    ? 'أهلاً بك! أنا مساعد الطلاب الذكي 🎓. أخبرني ماذا تريد أن تنجز (مثلاً: "لخص لي هذا الكتاب"، "سوي لي كويز"، "ساعدني في البرمجة") وسأنصحك بأفضل أداة مع "البرومبت" المناسب.' 
                    : 'Hi there! I\'m your Student AI Guide 🎓. Tell me what you want to achieve (e.g., "Summarize this PDF", "Make a quiz", "Fix my code") and I\'ll suggest the best tool and prompt for the job.'
            }]);
        }
    }, [lang, messages.length]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = { id: Date.now(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const recommendation = await getChatRecommendation(userMsg.text, TOOLS, lang);
            
            // Find tool details
            const tool = TOOLS.find(t => t.id === recommendation.toolId) || {};
            const toolName = tool.content?.[lang]?.name || tool.content?.['en']?.name || recommendation.toolId;
            const toolUrl = tool.website;

            const aiMsg = {
                id: Date.now() + 1,
                role: 'assistant',
                text: recommendation.reply, 
                recipe: {
                    toolName,
                    toolUrl,
                    reasoning: recommendation.reasoning,
                    prompt: recommendation.usagePrompt
                }
            };
            
            setMessages(prev => [...prev, aiMsg]);

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'assistant',
                text: lang === 'ar' 
                    ? 'عذراً، واجهت مشكلة في الاتصال. حاول مرة أخرى لاحقاً.' 
                    : 'Sorry, I encountered an error connecting to the AI. Please try again.'
            }]);
        } finally {
            setLoading(false);
            // Focus back on input? maybe not on mobile
            if (window.innerWidth > 768) {
               setTimeout(() => inputRef.current?.focus(), 100);
            }
        }
    };

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
                        className="absolute bottom-16 sm:bottom-20 mb-2 w-[90vw] sm:w-[380px] h-[500px] max-h-[70vh] bg-[#050505]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden origin-bottom-right"
                        style={{ [lang === 'ar' ? 'left' : 'right']: 0 }}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-2">
                                <Sparkles className="text-purple-400" size={18} />
                                <h3 className="font-bold text-white text-sm">
                                    {lang === 'ar' ? 'مساعد الذكاء الاصطناعي' : 'Student AI Guide'}
                                </h3>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            {messages.map((msg) => (
                                <MessageBubble key={msg.id} message={msg} lang={lang} />
                            ))}
                            {loading && (
                                <div className="flex gap-3 mb-4">
                                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                                        <Bot size={14} className="text-white" />
                                    </div>
                                    <div className="bg-white/10 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                                        <Loader2 size={16} className="text-gray-400 animate-spin" />
                                        <span className="text-xs text-gray-400">{lang === 'ar' ? 'جاري التفكير...' : 'Thinking...'}</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-white/5 shrink-0">
                            <div className="relative flex items-center">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={lang === 'ar' ? 'اكتب سؤالك هنا...' : 'Ask for help...'}
                                    className={`w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 ${lang === 'ar' ? 'pl-10' : 'pr-10'} text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors`}
                                    disabled={loading}
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || loading}
                                    className={`absolute ${lang === 'ar' ? 'left-2' : 'right-2'} p-1.5 rounded-lg bg-purple-600 text-white disabled:opacity-50 disabled:bg-transparent disabled:text-gray-600 transition-all hover:scale-105 active:scale-95`}
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </form>
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
                
                {/* Notification Dot (if closed and unread - simplistic version just shows pulser initially) */}
                {!isOpen && messages.length <= 1 && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
};

export default AIChatAssistant;
