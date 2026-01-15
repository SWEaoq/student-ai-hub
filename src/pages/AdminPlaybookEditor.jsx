import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Book, GripVertical, Trash2 } from 'lucide-react';
import AIGenerator from '../components/admin/AIGenerator';

const AdminPlaybookEditor = () => {
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
            fetchItem(id);
        } else {
            setFormData({
                en_steps: [],
                ar_steps: []
            });
        }
    }, [id]);

    const fetchItem = async (itemId) => {
        try {
            const { data, error } = await supabase.from('playbooks').select('*').eq('id', itemId).single();
            if (error) throw error;
            
            const content = data.content || {};
            // Helper to get value priority: content > direct
            const getField = (field, lang) => {
                 if (content[lang] && content[lang][field]) return content[lang][field];
                 if (content[field]) return content[field];
                 if (data[field]) {
                     if (typeof data[field] === 'string') return data[field];
                     if (data[field][lang]) return data[field][lang];
                 }
                 return '';
            };
            
            // Normalize steps to ensure they are strings
            const normalizeSteps = (steps) => {
                if (!Array.isArray(steps)) return [];
                return steps.map(step => {
                    if (typeof step === 'object' && step !== null) {
                        return step.content || '';
                    }
                    return String(step); 
                });
            };

            setFormData({
                id: data.id,
                en_title: getField('title', 'en'),
                ar_title: getField('title', 'ar'),
                en_desc: getField('description', 'en'),
                ar_desc: getField('description', 'ar'),
                en_steps: normalizeSteps(content.en?.steps),
                ar_steps: normalizeSteps(content.ar?.steps),
                link: getField('link', 'en'),
                image_url: getField('image_url', 'en'),
                category: getField('category', 'en')
            });
        } catch (error) {
            console.error('Error fetching playbook:', error);
            alert('Error loading playbook');
            navigate('/admin/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const content = {
                en: {
                    title: formData.en_title,
                    description: formData.en_desc,
                    steps: formData.en_steps.map(s => String(s)),
                    link: formData.link,
                    image_url: formData.image_url,
                    category: formData.category
                },
                ar: {
                    title: formData.ar_title,
                    description: formData.ar_desc,
                    steps: formData.ar_steps.map(s => String(s)),
                    link: formData.link,
                    image_url: formData.image_url,
                    category: formData.category
                },
                link: formData.link,
                image_url: formData.image_url,
                category: formData.category
            };

            const payload = { content };

            const query = id 
                ? supabase.from('playbooks').update(payload).eq('id', id)
                : supabase.from('playbooks').insert([payload]);

            const { error } = await query;
            if (error) throw error;
            
            navigate('/admin/dashboard'); 
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const addStep = () => {
        const stepsKey = `${formLang}_steps`;
        setFormData(prev => ({
            ...prev,
            [stepsKey]: [...(prev[stepsKey] || []), '']
        }));
    };

    const removeStep = (index) => {
        const stepsKey = `${formLang}_steps`;
        setFormData(prev => ({
            ...prev,
            [stepsKey]: prev[stepsKey].filter((_, i) => i !== index)
        }));
    };

    const updateStep = (index, value) => {
        const stepsKey = `${formLang}_steps`;
        const newSteps = [...(formData[stepsKey] || [])];
        newSteps[index] = value;
        setFormData(prev => ({ ...prev, [stepsKey]: newSteps }));
    };

    if (loading) return <div className="text-center py-20 text-zinc-500">Loading playbook...</div>;

    return (
        <div className="w-full max-w-4xl mx-auto p-6 md:p-12">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-zinc-400 hover:text-white">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Book size={32} className="text-emerald-400" />
                    {id ? 'Edit Playbook' : 'Create Playbook'}
                </h1>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                 {/* Language Switcher */}
                 <div className="flex justify-end sticky top-4 z-20">
                    <div className="flex gap-1 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-1 rounded-xl shadow-xl">
                        <button type="button" onClick={() => setFormLang('en')} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${formLang === 'en' ? 'bg-purple-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white'}`}>English</button>
                        <button type="button" onClick={() => setFormLang('ar')} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${formLang === 'ar' ? 'bg-purple-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white'}`}>Arabic</button>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                    <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-400">Title ({formLang})</label>
                            <div className="flex gap-2">
                                <input 
                                    className="flex-1 bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-600 focus:outline-none transition-all" 
                                    placeholder={`Title (${formLang})`} 
                                    value={formData[`${formLang}_title`] || ''} 
                                    onChange={e => setFormData({...formData, [`${formLang}_title`]: e.target.value})} 
                                    required 
                                    dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                                />
                                    <AIGenerator
                                    type="translation"
                                    context={{ text: formData[formLang === 'en' ? 'ar_title' : 'en_title'] }}
                                    lang={formLang}
                                    onGenerate={(text) => setFormData({...formData, [`${formLang}_title`]: text})}
                                    disabled={!formData[formLang === 'en' ? 'ar_title' : 'en_title']}
                                    className="shrink-0"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-400">Description ({formLang})</label>
                            <div className="flex gap-2 items-start">
                                <textarea 
                                    className="flex-1 bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-600 focus:outline-none transition-all resize-none" 
                                    placeholder={`Description (${formLang})`} 
                                    value={formData[`${formLang}_desc`] || ''} 
                                    onChange={e => setFormData({...formData, [`${formLang}_desc`]: e.target.value})} 
                                    rows={3} 
                                    dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                                />
                                <div className="flex flex-col gap-2 shrink-0">
                                    {formLang === 'en' && formData.category && formData[`${formLang}_title`] && (
                                            <AIGenerator
                                            type="description"
                                            context={{ 
                                                toolName: formData.en_title,
                                                category: formData.category
                                            }}
                                            lang="en"
                                            onGenerate={(text) => setFormData({...formData, en_desc: text})}
                                            label="Draft"
                                            className="shrink-0"
                                        />
                                    )}
                                        <AIGenerator
                                        type="translation"
                                        context={{ text: formData[formLang === 'en' ? 'ar_desc' : 'en_desc'] }}
                                        lang={formLang}
                                        onGenerate={(text) => setFormData({...formData, [`${formLang}_desc`]: text})}
                                        disabled={!formData[formLang === 'en' ? 'ar_desc' : 'en_desc']}
                                        className="shrink-0"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-zinc-400">Image URL</label>
                                <input className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-600 focus:outline-none transition-all" placeholder="Image URL" value={formData.image_url || ''} onChange={e => setFormData({...formData, image_url: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-zinc-400">Link URL (Optional)</label>
                                <input className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-600 focus:outline-none transition-all" placeholder="Link URL" value={formData.link || ''} onChange={e => setFormData({...formData, link: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-zinc-400">Category</label>
                                <input className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-600 focus:outline-none transition-all" placeholder="Category" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} />
                            </div>
                        </div>

                        {/* Steps Editor */}
                        <div className="border-t border-white/10 pt-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                <h4 className="font-bold text-white flex items-center gap-2">
                                    <GripVertical size={20} className="text-purple-400" />
                                    {formLang === 'en' ? 'Steps' : 'الخطوات'}
                                </h4>
                                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                                    <AIGenerator
                                        type="steps"
                                        context={{ 
                                            title: formData[`${formLang}_title`],
                                            category: formData.category
                                        }}
                                        lang={formLang}
                                        onGenerate={(steps) => setFormData(prev => ({...prev, [`${formLang}_steps`]: steps}))}
                                        label={formLang === 'ar' ? 'توليد الخطوات AI' : 'Generate Steps (AI)'}
                                        className="w-full md:w-auto"
                                        disabled={!formData[`${formLang}_title`] || !formData.category}
                                    />
                                    <button type="button" onClick={addStep} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-bold flex-1 md:flex-none whitespace-nowrap transition-colors">
                                        + {formLang === 'en' ? 'Add Step' : 'إضافة خطوة'}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                {(formData[`${formLang}_steps`] || []).map((step, idx) => (
                                    <div key={idx} className="flex gap-2 items-start group">
                                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs text-zinc-500 mt-2 shrink-0 border border-white/5">
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <textarea
                                                className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-600 focus:outline-none text-sm transition-all"
                                                placeholder={`Step ${idx + 1} details...`}
                                                value={step}
                                                onChange={(e) => updateStep(idx, e.target.value)}
                                                rows={2}
                                                dir={formLang === 'ar' ? 'rtl' : 'ltr'}
                                            />
                                        </div>
                                        <button type="button" onClick={() => removeStep(idx)} className="text-zinc-500 hover:text-red-400 mt-2 p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                {(formData[`${formLang}_steps`] || []).length === 0 && (
                                    <div className="text-center py-8 text-zinc-600 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                                        No steps added yet. Click "Add Step" or use AI Generator.
                                    </div>
                                )}
                            </div>
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

export default AdminPlaybookEditor;
