
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Sparkles, Copy, ExternalLink, Bot, User, Loader2, Layers } from 'lucide-react';
import { getChatRecommendation } from '../../lib/aiService';
// import { TOOLS } from '../../data/content'; 
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
                        {message.recipe.toolId && (
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
                        )}

                        {/* Reasoning */}
                        {message.recipe.reasoning && (
                             <div className={`px-3 py-2 text-xs text-gray-400 border-b border-white/5 bg-black/20 italic ${lang === 'ar' ? 'text-right' : ''}`}>
                                "{message.recipe.reasoning}"
                            </div>
                        )}

                        {/* Stack Recommendation */}
                        {message.recipe.stack && Array.isArray(message.recipe.stack) && message.recipe.stack.length > 0 && (
                            <div className="px-3 py-3 border-b border-white/5 bg-black/30">
                                <div className={`flex items-center gap-2 mb-2 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                                    <Layers size={12} className="text-blue-400" />
                                    <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                                        {lang === 'ar' ? 'التقنيات المقترحة (Stack)' : 'RECOMMENDED STACK'}
                                    </span>
                                </div>
                                <div className={`flex flex-wrap gap-2 ${lang === 'ar' ? 'justify-end' : ''}`}>
                                    {message.recipe.stack.map((tech, i) => (
                                        <span key={i} className="text-xs bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-1 rounded-md font-mono">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Prompt Display */}
                        {message.recipe.prompt && (
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
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const ChatInterface = ({ className = "" }) => {
    const { lang, tools } = useSiteContent(); // Get dynamic tools
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null); // Ref for the scrollable container
    const inputRef = useRef(null);

    // Scroll to bottom logic
    const scrollToBottom = () => {
        // Use the container ref to scroll instead of window scroll
        if (messagesContainerRef.current) {
            const { scrollHeight, clientHeight } = messagesContainerRef.current;
            messagesContainerRef.current.scrollTo({
                top: scrollHeight - clientHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    // Initial greeting
    useEffect(() => {
        const welcomeMessage = {
            id: 'welcome',
            role: 'assistant',
            text: lang === 'ar' 
                ? 'أهلاً بك! أنا مساعد الذكاء الاصطناعي 🎓. أخبرني ماذا تريد أن تنجز (مثلاً: "لخص لي هذا الملف"، "سوي لي عرض تقديمي"، "ساعدني في البرمجة") وسأنصحك بأفضل أداة مع "البرومبت" المناسب.' 
                : 'Hi there! I\'m your AI Guide 🎓. Tell me what you want to achieve (e.g., "Summarize this PDF", "Make a pitch deck", "Fix my code") and I\'ll suggest the best tool and prompt for the job.'
        };

        setMessages(prev => {
            if (prev.length === 0) {
                return [welcomeMessage];
            }
            // Update welcome message if it's the only message or if the first message is the welcome message
            if (prev.length > 0 && prev[0].id === 'welcome') {
                const newMessages = [...prev];
                newMessages[0] = welcomeMessage;
                return newMessages;
            }
            return prev;
        });
    }, [lang]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = { id: Date.now(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const recommendation = await getChatRecommendation(userMsg.text, tools, lang);
            
            let recipe = null;
            if (recommendation.toolId || (recommendation.stack && recommendation.stack.length > 0)) {
                 const tool = tools.find(t => t.id === recommendation.toolId) || {};
                 const toolName = tool.content?.[lang]?.name || tool.content?.['en']?.name || recommendation.toolId || 'AI Tool'; // Fallback name
                 const toolUrl = tool.website;

                 recipe = {
                    toolId: recommendation.toolId, // Add toolId specifically for UI check
                    toolName,
                    toolUrl,
                    reasoning: recommendation.reasoning,
                    prompt: recommendation.usagePrompt,
                    stack: recommendation.stack
                };
            }

            const aiMsg = {
                id: Date.now() + 1,
                role: 'assistant',
                text: recommendation.reply, 
                recipe: recipe
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
            // Focus back on input
            if (window.innerWidth > 768) {
               setTimeout(() => inputRef.current?.focus(), 100);
            }
        }
    };

    return (
        <div className={`flex flex-col h-full bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden ${className}`}>
             {/* Messages Area */}
            <div 
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 custom-scrollbar scroll-smooth"
            >
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
        </div>
    );
};

export default ChatInterface;
