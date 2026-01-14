
import React from 'react';
import ChatInterface from '../components/ui/ChatInterface';
import { useSiteContent } from '../hooks/useSiteContent';
import { Sparkles } from 'lucide-react';

const Chat = () => {
    const { lang } = useSiteContent();

    return (
        <div className="w-full max-w-4xl mx-auto px-4 pt-20 md:pt-32 pb-4 flex flex-col min-h-screen">
            {/* Header Section */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                     <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Sparkles className="text-purple-400" size={32} />
                        {lang === 'ar' ? 'مساعد الذكاء الاصطناعي' : 'AI Assistant'}
                    </h1>
                     <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-2xl">
                        {lang === 'ar' 
                            ? 'مساعدك الشخصي للتعلم والإنتاجية. اسألني عن أي شيء وسأرشدك لأفضل الأدوات.'
                            : 'Your personal guide for learning and productivity. Ask me anything and I will recommend the best tools.'}
                    </p>
                </div>
            </div>

            {/* Main Chat Interface */}
            <div className="flex-1 min-h-0"> {/* min-h-0 is crucial for nested flex scrolling */}
                <ChatInterface className="h-full w-full" />
            </div>
        </div>
    );
};

export default Chat;
