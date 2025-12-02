import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { CONTENT, PROMPTS } from '../data/content';

const PromptVault = ({ lang }) => {
    const t = CONTENT[lang];
    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex items-center gap-4 mb-10">
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1 opacity-50" />
                <h2 className="text-3xl font-black text-white text-center uppercase tracking-widest">
                    {t.vault.title} <span className="text-purple-500">{t.vault.title_accent}</span>
                </h2>
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1 opacity-50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PROMPTS.map((prompt, index) => {
                    const content = prompt.content[lang];
                    return (
                        <div key={index} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 relative group">
                            <div className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} text-xs font-mono text-gray-600 px-2 py-1 border border-white/5 rounded`}>
                                {content.tag}
                            </div>
                            <h3 className={`text-lg font-bold text-white mb-4 ${lang === 'ar' ? 'pl-16' : 'pr-16'}`}>
                                {content.title}
                            </h3>
                            <div className="bg-white/5 rounded-lg p-4 font-mono text-sm text-gray-300 leading-relaxed min-h-[120px] mb-4 border border-white/5 group-hover:border-white/10 transition-colors">
                                "{content.text}"
                            </div>
                            <button
                                onClick={() => handleCopy(content.text, index)}
                                className={`
                                    w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all
                                    ${copiedIndex === index
                                        ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                                        : 'bg-white/10 text-white hover:bg-purple-600 hover:text-white'}
                                `}
                            >
                                {copiedIndex === index ? (
                                    <>
                                        <Check size={16} /> {t.vault.copied}
                                    </>
                                ) : (
                                    <>
                                        <Copy size={16} /> {t.vault.copy}
                                    </>
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default PromptVault;
