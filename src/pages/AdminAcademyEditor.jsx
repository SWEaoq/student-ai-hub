import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, GraduationCap, Video } from 'lucide-react';
import AIGenerator from '../components/admin/AIGenerator';

const AdminAcademyEditor = () => {
    const { type, id } = useParams(); // type: 'category' or 'tutorial'
    const navigate = useNavigate();
    const [loading, setLoading] = useState(!!id);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({});
    const [formLang, setFormLang] = useState('en');
    const [categories, setCategories] = useState([]);

    // Helper to safely get value from item or content JSONB
    const getValue = (item, field, lang = 'en') => {
        if (!item) return '';
        if (item[field] && typeof item[field] === 'string') return item[field];
        if (item.content && item.content[field]) return item.content[field];
        if (item.content && item.content[lang] && item.content[lang][field]) return item.content[lang][field];
        return '';
    };

    useEffect(() => {
        const init = async () => {
            if (type === 'tutorial') {
                // Fetch categories for dropdown
                const { data: cats } = await supabase.from('academy_categories').select('*').order('id');
                setCategories(cats || []);
            }

            if (id) {
                await fetchItem(id);
            }
            setLoading(false);
        };
        init();
    }, [id, type]);

    const fetchItem = async (itemId) => {
        try {
            const table = type === 'category' ? 'academy_categories' : 'academy_tutorials';
            const { data, error } = await supabase.from(table).select('*').eq('id', itemId).single();
            if (error) throw error;
            
            setFormData({
                id: data.id,
                icon_name: getValue(data, 'icon_name'),
                en_title: getValue(data, 'name', 'en') || getValue(data, 'title', 'en'),
                ar_title: getValue(data, 'name', 'ar') || getValue(data, 'title', 'ar'),
                en_desc: getValue(data, 'description', 'en'),
                ar_desc: getValue(data, 'description', 'ar'),
                category_id: getValue(data, 'category'),
                link: getValue(data, 'link')
            });
        } catch (error) {
            console.error('Error fetching item:', error);
            alert('Error loading item');
            navigate('/admin/dashboard');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const table = type === 'category' ? 'academy_categories' : 'academy_tutorials';
            let payload = {};

            const content = {
                en: {
                    name: formData.en_title,
                    description: formData.en_desc
                },
                ar: {
                    name: formData.ar_title,
                    description: formData.ar_desc
                }
            };

            if (type === 'category') {
                content.icon_name = formData.icon_name;
                payload = { content };
            } else {
                content.category = formData.category_id;
                content.link = formData.link;
                payload = { content };
            }

            const query = id 
                ? supabase.from(table).update(payload).eq('id', id)
                : supabase.from(table).insert([payload]);

            const { error } = await query;
            if (error) throw error;
            
            navigate('/admin/dashboard'); // Or back to academy list
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-center py-20 text-zinc-500">Loading...</div>;

    const isCategory = type === 'category';

    return (
        <div className="w-full max-w-4xl mx-auto p-6 md:p-12">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-zinc-400 hover:text-white">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    {isCategory ? <GraduationCap size={32} className="text-yellow-400" /> : <Video size={32} className="text-blue-400" />}
                    {id ? 'Edit' : 'Create'} {isCategory ? 'Category' : 'Tutorial'}
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
                                className="flex-1 bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all" 
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

                    {isCategory ? (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-zinc-400">Description ({formLang})</label>
                                <div className="flex gap-2 items-start">
                                    <textarea 
                                        className="flex-1 bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all resize-none" 
                                        placeholder={`Description (${formLang})`} 
                                        value={formData[`${formLang}_desc`] || ''} 
                                        onChange={e => setFormData({...formData, [`${formLang}_desc`]: e.target.value})} 
                                        rows={4} 
                                        dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                                    />
                                    <div className="flex flex-col gap-2 shrink-0">
                                        {formLang === 'en' && formData[`${formLang}_title`] && (
                                            <AIGenerator
                                                type="description"
                                                context={{ 
                                                    toolName: formData.en_title,
                                                    category: "Academy Category"
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
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-zinc-400">Icon Name</label>
                                <div className="flex gap-2">
                                    <input 
                                        className="flex-1 bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all" 
                                        placeholder="Icon Name (Lucide)" 
                                        value={formData.icon_name || ''} 
                                        onChange={e => setFormData({...formData, icon_name: e.target.value})} 
                                    />
                                    {formData.en_title && (
                                        <AIGenerator
                                            type="icon"
                                            context={{ 
                                                name: formData.en_title,
                                                description: formData.en_desc || formData.en_title
                                            }}
                                            lang="en"
                                            onGenerate={(text) => setFormData({...formData, icon_name: text})}
                                            className="shrink-0"
                                        />
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-zinc-400">Video Link</label>
                                <input 
                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all" 
                                    placeholder="Video Link (YouTube, etc.)" 
                                    value={formData.link || ''} 
                                    onChange={e => setFormData({...formData, link: e.target.value})} 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-zinc-400">Category</label>
                                <select 
                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all" 
                                    value={formData.category_id || ''} 
                                    onChange={e => setFormData({...formData, category_id: e.target.value})} 
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c.id} value={c.id} className="bg-zinc-900">{getValue(c, 'name', 'en') || 'Untitled'}</option>)}
                                </select>
                            </div>
                        </>
                    )}
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

export default AdminAcademyEditor;
