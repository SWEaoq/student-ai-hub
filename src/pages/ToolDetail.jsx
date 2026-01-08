import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Terminal, MessageSquare } from 'lucide-react';
import { TOOLS, CONTENT } from '../data/content';
import FadeIn from '../components/animations/FadeIn';
import StaggerContainer from '../components/animations/StaggerContainer';

const ToolDetail = ({ lang }) => {
    const t = CONTENT[lang];
    const { id } = useParams();
    const navigate = useNavigate();
    const tool = TOOLS.find(t => t.id === id);

    if (!tool) {
        return <div className="text-center text-white mt-20">Tool not found</div>;
    }

    const isRTL = lang === 'ar';

    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 mb-12 sm:mb-20">
            <FadeIn delay={0.1}>
                <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-400 hover:text-white active:text-white mb-6 sm:mb-8 transition-colors min-h-[44px]">
                    <ArrowLeft className={`w-5 h-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                    {t.common.back}
                </button>
            </FadeIn>

            {/* Header */}
            <FadeIn delay={0.2}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
                    <div className="flex items-center gap-3 sm:gap-6">
                        <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-${tool.color}-500/20 to-transparent border border-${tool.color}-500/30 shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>
                            <tool.icon className={`w-8 h-8 sm:w-12 sm:h-12 text-${tool.color}-400`} />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-1 sm:mb-2">{tool.content[lang].name}</h1>
                            <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light">{tool.content[lang].description}</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        {tool.hasFreeTier && (
                            <a
                                href={tool.studentLink || tool.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 active:bg-purple-700 transition-transform hover:scale-105 active:scale-95 min-h-[44px] w-full sm:w-auto justify-center`}
                            >
                                {t.common.getFreeTier}
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                        <a
                            href={tool.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 active:bg-gray-200 transition-transform hover:scale-105 active:scale-95 min-h-[44px] w-full sm:w-auto justify-center`}
                        >
                            {t.common.visitWebsite}
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
                {/* Installation Guide */}
                <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 backdrop-blur-sm h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 text-gray-300">
                        <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />
                        <h2 className="text-xl sm:text-2xl font-bold">{t.common.installation}</h2>
                    </div>
                    <div className="space-y-3 sm:space-y-4 text-gray-300 leading-relaxed whitespace-pre-line font-mono text-xs sm:text-sm bg-black/30 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-white/5 flex-grow">
                        {tool.installation[lang]}
                    </div>
                </div>

                {/* Example Prompts */}
                <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 backdrop-blur-sm h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 text-gray-300">
                        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                        <h2 className="text-xl sm:text-2xl font-bold">{t.common.examplePrompts}</h2>
                    </div>
                    <div className="space-y-3 sm:space-y-4 flex-grow">
                        {tool.examplePrompts.map((item, index) => (
                            <div key={index} className="group p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/10 border border-white/5 transition-all cursor-pointer">
                                <h3 className="text-neon-purple font-bold mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wider">{item.title[lang]}</h3>
                                <p className="text-gray-300 text-xs sm:text-sm">{item.prompt[lang]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </StaggerContainer>
        </div>
    );
};

export default ToolDetail;
