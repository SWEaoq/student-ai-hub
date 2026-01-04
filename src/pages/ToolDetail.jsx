import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Terminal, MessageSquare } from 'lucide-react';
import { TOOLS } from '../data/content';
import FadeIn from '../components/animations/FadeIn';
import StaggerContainer from '../components/animations/StaggerContainer';

const ToolDetail = ({ lang }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const tool = TOOLS.find(t => t.id === id);

    if (!tool) {
        return <div className="text-center text-white mt-20">Tool not found</div>;
    }

    const isRTL = lang === 'ar';

    return (
        <div className="w-full max-w-4xl mx-auto px-4 pt-32 pb-20 mb-20">
            <FadeIn delay={0.1}>
                <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className={`w-5 h-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                    {lang === 'en' ? 'Back' : 'رجوع'}
                </button>
            </FadeIn>

            {/* Header */}
            <FadeIn delay={0.2}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                <div className="flex items-center gap-6">
                    <div className={`p-6 rounded-2xl bg-gradient-to-br from-${tool.color}-500/20 to-transparent border border-${tool.color}-500/30 shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>
                        <tool.icon className={`w-12 h-12 text-${tool.color}-400`} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black tracking-tight mb-2">{tool.content[lang].name}</h1>
                        <p className="text-xl text-gray-400 font-light">{tool.content[lang].description}</p>
                    </div>
                </div>

                <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95`}
                >
                    {lang === 'en' ? 'Visit Website' : 'زيارة الموقع'}
                    <ExternalLink className="w-4 h-4" />
                </a>
                </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Installation Guide */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6 text-gray-300">
                        <Terminal className="w-6 h-6" />
                        <h2 className="text-2xl font-bold">{lang === 'en' ? 'Installation' : 'التثبيت'}</h2>
                    </div>
                    <div className="space-y-4 text-gray-300 leading-relaxed whitespace-pre-line font-mono text-sm bg-black/30 p-6 rounded-xl border border-white/5">
                        {tool.installation[lang]}
                    </div>
                </div>

                {/* Example Prompts */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6 text-gray-300">
                        <MessageSquare className="w-6 h-6" />
                        <h2 className="text-2xl font-bold">{lang === 'en' ? 'Example Prompts' : 'أمثلة للأوامر'}</h2>
                    </div>
                    <div className="space-y-4">
                        {tool.examplePrompts.map((item, index) => (
                            <div key={index} className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all cursor-pointer">
                                <h3 className="text-neon-purple font-bold mb-2 text-sm uppercase tracking-wider">{item.title[lang]}</h3>
                                <p className="text-gray-300 text-sm">{item.prompt[lang]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </StaggerContainer>
        </div>
    );
};

export default ToolDetail;
