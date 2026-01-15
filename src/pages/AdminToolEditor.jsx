import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Trash2 } from 'lucide-react';
import AIGenerator from '../components/admin/AIGenerator';

const GRADIENTS = [
    { label: 'Blue', value: 'from-blue-500 to-blue-700' },
    { label: 'Purple', value: 'from-purple-500 to-purple-700' },
    { label: 'Green', value: 'from-green-500 to-green-700' },
    { label: 'Red', value: 'from-red-500 to-red-700' },
    { label: 'Orange', value: 'from-orange-500 to-orange-700' },
    { label: 'Cyan', value: 'from-cyan-500 to-cyan-700' },
    { label: 'Pink', value: 'from-pink-500 to-pink-700' },
    { label: 'Indigo', value: 'from-indigo-500 to-indigo-700' },
    { label: 'Teal', value: 'from-teal-500 to-teal-700' },
    { label: 'Yellow', value: 'from-yellow-400 to-orange-500' },
];

const AdminToolEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(!!id);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({});
    const [formLang, setFormLang] = useState('en');

    // Helper to safely get value from item or content JSONB
    const getValue = (item, field, lang = 'en') => {
        if (!item) return '';
        if (item[field] && typeof item[field] === 'string') return item[field];
        if (item.content && item.content[field]) return item.content[field];
        if (item.content && item.content[lang] && item.content[lang][field]) return item.content[lang][field];
        return '';
    };

    useEffect(() => {
        if (id) {
            fetchTool(id);
        } else {
            setFormData({
                en_prompts: [],
                ar_prompts: [],
                color: 'from-blue-500 to-blue-700',
                has_free_tier: true
            });
        }
    }, [id]);

    const fetchTool = async (toolId) => {
        try {
            const { data, error } = await supabase.from('tools').select('*').eq('id', toolId).single();
            if (error) throw error;
            
            const tool = data;
            const getPrompts = (lang) => {
                if (tool.content?.[lang]?.examplePrompts) return tool.content[lang].examplePrompts;
                if (tool.examplePrompts && Array.isArray(tool.examplePrompts)) {
                    // Handle legacy localized prompts (array of objects with title: {en, ar})
                    if (tool.examplePrompts.length > 0 && typeof tool.examplePrompts[0].title === 'object') {
                         return tool.examplePrompts.map(p => ({
                            title: p.title?.[lang] || '',
                            prompt: p.prompt?.[lang] || ''
                        }));
                    }
                    // Handle very old flat prompts (assume EN)
                    if (lang === 'en') return tool.examplePrompts;
                    return [];
                }
                return [];
            };

            setFormData({
                id: tool.id, // Keep ID for update
                category: getValue(tool, 'category'),
                id: tool.id, // Keep ID for update
                category: getValue(tool, 'category'),
                url: tool.website || getValue(tool, 'url'), // Prioritize top-level website column
                icon_name: getValue(tool, 'icon_name'),
                icon_name: getValue(tool, 'icon_name'),
                has_free_tier: tool.has_free_tier !== undefined ? tool.has_free_tier : (tool.content?.has_free_tier !== undefined ? tool.content.has_free_tier : true),
                color: getValue(tool, 'color') || 'from-blue-500 to-blue-700',
                en_name: getValue(tool, 'name', 'en'),
                en_description: getValue(tool, 'description', 'en'),
                en_tag: getValue(tool, 'tag', 'en') || getValue(tool, 'tag_line', 'en'),
                en_installation: getValue(tool, 'installation', 'en'),
                en_prompts: getPrompts('en'),
                
                ar_name: getValue(tool, 'name', 'ar'),
                ar_description: getValue(tool, 'description', 'ar'),
                ar_tag: getValue(tool, 'tag', 'ar') || getValue(tool, 'tag_line', 'ar'),
                ar_installation: getValue(tool, 'installation', 'ar'),
                ar_prompts: getPrompts('ar'),
            });
        } catch (error) {
            console.error('Error fetching tool:', error);
            alert('Error loading tool');
            navigate('/admin/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            let payload = {
                content: {
                    en: {
                        name: formData.en_name,
                        description: formData.en_description,
                        tag: formData.en_tag,
                        category: formData.category,
                        url: formData.url,
                        icon_name: formData.icon_name,
                        installation: formData.en_installation,
                        examplePrompts: formData.en_prompts
                    },
                    ar: {
                        name: formData.ar_name,
                        description: formData.ar_description,
                        tag: formData.ar_tag,
                        category: formData.category,
                        url: formData.url,
                        icon_name: formData.icon_name,
                        installation: formData.ar_installation,
                        examplePrompts: formData.ar_prompts
                    },
                    category: formData.category,
                    url: formData.url,
                    icon_name: formData.icon_name,
                    color: formData.color || 'from-blue-500 to-blue-700',
                    has_free_tier: formData.has_free_tier !== false,
                    examplePrompts: formData.en_prompts
                },
                website: formData.url, // Save to top-level website column
                category: formData.category, // Also save top-level fields for easier querying
                icon_name: formData.icon_name,
                color: formData.color || 'from-blue-500 to-blue-700',
                hasFreeTier: formData.has_free_tier !== false // Match column name found in debug dump
            };

            const query = id 
                ? supabase.from('tools').update(payload).eq('id', id)
                : supabase.from('tools').insert([{
                    ...payload,
                    id: crypto.randomUUID()
                }]);

            const { error } = await query;
            if (error) throw error;

            navigate('/admin/dashboard'); // Or wherever the tools list is
        } catch (error) {
            alert('Error saving tool: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const addPrompt = () => {
        const key = `${formLang}_prompts`;
        setFormData(prev => ({
            ...prev,
            [key]: [...(prev[key] || []), { title: '', prompt: '' }]
        }));
    };

    const removePrompt = (index) => {
        const key = `${formLang}_prompts`;
        setFormData(prev => ({
            ...prev,
            [key]: prev[key].filter((_, i) => i !== index)
        }));
    };

    const updatePrompt = (index, field, value) => {
        const key = `${formLang}_prompts`;
        const newPrompts = [...(formData[key] || [])];
        newPrompts[index] = { ...newPrompts[index], [field]: value };
        setFormData(prev => ({ ...prev, [key]: newPrompts }));
    };

    if (loading) return <div className="text-center py-20 text-zinc-500">Loading tool...</div>;

    return (
        <div className="w-full max-w-5xl mx-auto p-6 md:p-12">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-zinc-400 hover:text-white">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-3xl font-bold text-white">{id ? 'Edit Tool' : 'Create New Tool'}</h1>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                 {/* Language Switcher */}
                <div className="flex justify-end sticky top-4 z-20">
                    <div className="flex gap-1 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-1 rounded-xl shadow-xl">
                        <button type="button" onClick={() => setFormLang('en')} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${formLang === 'en' ? 'bg-purple-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white'}`}>English</button>
                        <button type="button" onClick={() => setFormLang('ar')} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${formLang === 'ar' ? 'bg-purple-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white'}`}>Arabic</button>
                    </div>
                </div>

                {/* Section 1: Classification */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        Classification
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-400">Category</label>
                            <input 
                                className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500/50 outline-none transition-all" 
                                placeholder="e.g. productivity" 
                                value={formData.category || ''} 
                                onChange={e => setFormData({...formData, category: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-400">Icon Name (Lucide)</label>
                            <div className="flex gap-2">
                                <input 
                                    className="flex-1 bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500/50 outline-none transition-all" 
                                    placeholder="e.g. Zap" 
                                    value={formData.icon_name || ''} 
                                    onChange={e => setFormData({...formData, icon_name: e.target.value})} 
                                />
                                {(formData.en_name || formData.category) && (
                                    <AIGenerator
                                        type="icon"
                                        context={{ 
                                            name: formData.en_name || formData.category, 
                                            description: formData.en_description || formData.en_name || formData.category
                                        }}
                                        lang="en"
                                        onGenerate={(text) => setFormData({...formData, icon_name: text})}
                                        className="shrink-0"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-400">Website URL</label>
                        <input 
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500/50 outline-none transition-all" 
                            placeholder="https://example.com" 
                            value={formData.url || ''} 
                            onChange={e => setFormData({...formData, url: e.target.value})} 
                        />
                    </div>
                </div>

                {/* Section 2: Branding */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        Branding & Color
                    </h2>
                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
                        {GRADIENTS.map(grad => (
                            <button 
                                key={grad.value}
                                type="button"
                                onClick={() => setFormData({...formData, color: grad.value})}
                                className={`h-12 rounded-xl bg-gradient-to-br ${grad.value} relative ring-2 ring-offset-2 ring-offset-[#0a0a0a] transition-all hover:scale-105 ${formData.color === grad.value ? 'ring-white scale-105' : 'ring-transparent opacity-60 hover:opacity-100'}`}
                                title={grad.label}
                            />
                        ))}
                    </div>
                </div>

                {/* Section 3: Content */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Content ({formLang.toUpperCase()})
                    </h2>
                    
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-400">Tool Name</label>
                        <div className="flex gap-2">
                            <input 
                                className="flex-1 bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-500/50 outline-none transition-all font-bold text-lg" 
                                placeholder={`Enter tool name (${formLang.toUpperCase()})`} 
                                value={formData[`${formLang}_name`] || ''} 
                                onChange={e => setFormData({...formData, [`${formLang}_name`]: e.target.value})} 
                                dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                            />
                            <AIGenerator
                                type="translation"
                                context={{ text: formData[formLang === 'en' ? 'ar_name' : 'en_name'] }}
                                lang={formLang}
                                onGenerate={(text) => setFormData({...formData, [`${formLang}_name`]: text})}
                                disabled={!formData[formLang === 'en' ? 'ar_name' : 'en_name']}
                                className="shrink-0"
                            />
                        </div>
                    </div>

                    {/* Tagline */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-400">Tagline (Short)</label>
                        <div className="flex gap-2">
                            <input 
                                className="flex-1 bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500/50 outline-none transition-all" 
                                placeholder={`Catchy tagline...`} 
                                value={formData[`${formLang}_tag`] || ''} 
                                onChange={e => setFormData({...formData, [`${formLang}_tag`]: e.target.value})} 
                                dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                            />
                            <div className="flex gap-2 shrink-0">
                                {formLang === 'en' && formData.en_name && (
                                    <AIGenerator
                                        type="tagline"
                                        context={{ 
                                            toolName: formData.en_name,
                                            description: formData.en_description || ''
                                        }}
                                        lang="en"
                                        onGenerate={(text) => setFormData({...formData, en_tag: text})}
                                        label="✨ Idea"
                                        className="shrink-0"
                                    />
                                )}
                                <AIGenerator
                                    type="translation"
                                    context={{ text: formData[formLang === 'en' ? 'ar_tag' : 'en_tag'] }}
                                    lang={formLang}
                                    onGenerate={(text) => setFormData({...formData, [`${formLang}_tag`]: text})}
                                    disabled={!formData[formLang === 'en' ? 'ar_tag' : 'en_tag']}
                                    className="shrink-0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-400">Full Description</label>
                        <div className="flex gap-2 items-start">
                            <textarea 
                                className="flex-1 bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500/50 outline-none transition-all min-h-[150px] resize-y" 
                                placeholder={`Detailed description...`} 
                                value={formData[`${formLang}_description`] || ''} 
                                onChange={e => setFormData({...formData, [`${formLang}_description`]: e.target.value})} 
                                dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                            />
                            <div className="flex flex-col gap-2 shrink-0">
                                {formLang === 'en' && formData.en_name && formData.category && (
                                    <AIGenerator
                                        type="description"
                                        context={{ 
                                            toolName: formData.en_name,
                                            category: formData.category
                                        }}
                                        lang="en"
                                        onGenerate={(text) => setFormData({...formData, en_description: text})}
                                        label="✍️ Draft"
                                        className="shrink-0"
                                    />
                                )}
                                <AIGenerator
                                    type="translation"
                                    context={{ text: formData[formLang === 'en' ? 'ar_description' : 'en_description'] }}
                                    lang={formLang}
                                    onGenerate={(text) => setFormData({...formData, [`${formLang}_description`]: text})}
                                    disabled={!formData[formLang === 'en' ? 'ar_description' : 'en_description']}
                                    className="shrink-0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Installation */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-400">Installation Guide</label>
                        <div className="flex gap-2 items-start">
                            <textarea 
                                className="flex-1 bg-black/20 border border-white/10 rounded-xl p-3 text-white font-mono text-sm focus:ring-2 focus:ring-purple-500/50 outline-none transition-all min-h-[120px]" 
                                placeholder={`1. Go to settings...`} 
                                value={formData[`${formLang}_installation`] || ''} 
                                onChange={e => setFormData({...formData, [`${formLang}_installation`]: e.target.value})} 
                                dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                            />
                            <AIGenerator
                                type="translation"
                                context={{ text: formData[formLang === 'en' ? 'ar_installation' : 'en_installation'] }}
                                lang={formLang}
                                onGenerate={(text) => setFormData({...formData, [`${formLang}_installation`]: text})}
                                disabled={!formData[formLang === 'en' ? 'ar_installation' : 'en_installation']}
                                className="shrink-0"
                            />
                        </div>
                    </div>
                </div>
                
                {/* Section 4: Prompts */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                            Example Prompts
                        </h2>
                        <button type="button" onClick={addPrompt} className="text-sm bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 px-4 py-2 rounded-lg transition-colors border border-purple-500/20 font-bold">
                            + Add Prompt
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        {(formData[`${formLang}_prompts`] || []).map((prompt, idx) => (
                            <div key={idx} className="bg-black/20 border border-white/10 rounded-xl p-6 transition-all hover:bg-black/30">
                                <div className="flex gap-4 mb-4">
                                    <div className="flex-1 space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase">Title</label>
                                        <input 
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-bold focus:ring-1 focus:ring-purple-500 outline-none"
                                            placeholder="Prompt Title (e.g. LITERATURE REVIEW)"
                                            value={prompt.title || ''}
                                            onChange={e => updatePrompt(idx, 'title', e.target.value)}
                                            dir={formLang === 'ar' ? 'rtl' : 'ltr'}
                                        />
                                    </div>
                                    <button type="button" onClick={() => removePrompt(idx)} className="self-start mt-6 p-2 text-zinc-500 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Prompt</label>
                                    <textarea 
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm min-h-[100px] focus:ring-1 focus:ring-purple-500 outline-none"
                                        placeholder="Enter the prompt text here..."
                                        value={prompt.prompt || ''}
                                        onChange={e => updatePrompt(idx, 'prompt', e.target.value)}
                                        dir={formLang === 'ar' ? 'rtl' : 'ltr'}
                                    />
                                </div>
                            </div>
                        ))}
                        {(formData[`${formLang}_prompts`] || []).length === 0 && (
                            <div className="text-center py-12 text-zinc-500 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
                                No example prompts added yet.
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                    <button 
                        type="button" 
                        onClick={() => navigate('/admin/dashboard')} 
                        className="px-6 py-3 text-zinc-400 hover:text-white transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        disabled={submitting}
                        className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-lg shadow-purple-900/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {submitting ? 'Saving...' : 'Save Changes'}
                        <Save size={20} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminToolEditor;
