import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Edit2, Save, X, Database, PenTool } from 'lucide-react';
import AIGenerator from './AIGenerator';

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

const AdminTools = () => {
    const [loading, setLoading] = useState(true);
    const [tools, setTools] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [formLang, setFormLang] = useState('en');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const fetchTools = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('tools').select('*').order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching tools:', error);
        } else {
            setTools(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTools();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this tool?')) return;
        const { error } = await supabase.from('tools').delete().eq('id', id);
        if (error) alert('Error deleting tool: ' + error.message);
        else fetchTools();
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let payload = {
                category: formData.category,
                url: formData.url,
                icon_name: formData.icon_name,
                has_free_tier: formData.has_free_tier !== false,
                color: formData.color || 'from-blue-500 to-blue-700', // Save color
                name: formData.en_name,
                tag_line: formData.en_tag,
                description: formData.en_description,
                content: {
                    en: {
                        name: formData.en_name,
                        description: formData.en_description,
                        tag: formData.en_tag
                    },
                    ar: {
                        name: formData.ar_name,
                        description: formData.ar_description,
                        tag: formData.ar_tag
                    }
                }
            };

            const query = editingItem 
                ? supabase.from('tools').update(payload).eq('id', editingItem.id)
                : supabase.from('tools').insert([payload]);

            const { error } = await query;
            if (error) throw error;

            setShowModal(false);
            fetchTools();
        } catch (error) {
            alert('Error saving tool: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (editingItem) {
            const content = editingItem.content || {};
            const en = content.en || {};
            const ar = content.ar || {};
            setFormData({
                category: editingItem.category,
                url: editingItem.url,
                icon_name: editingItem.icon_name,
                has_free_tier: editingItem.has_free_tier,
                color: editingItem.color, // Load color
                en_name: en.name || editingItem.name,
                en_description: en.description || editingItem.description,
                en_tag: en.tag || editingItem.tag_line,
                ar_name: ar.name,
                ar_description: ar.description,
                ar_tag: ar.tag,
            });
        } else {
            setFormData({});
        }
    }, [editingItem]);

    const filteredTools = tools.filter(tool => selectedCategory === 'all' || tool.category?.toLowerCase() === selectedCategory.toLowerCase());
    const categories = ['all', ...Array.from(new Set(tools.map(t => t.category).filter(Boolean)))];

    return (
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                        Tools List
                        <span className="text-sm font-normal text-zinc-400 bg-white/10 px-2.5 py-0.5 rounded-full ml-2 border border-white/5">
                            {loading ? '...' : filteredTools.length}
                        </span>
                    </h2>
                    <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    >
                        {categories.map(cat => <option key={cat} value={cat} className="bg-zinc-900">{cat === 'all' ? 'All Categories' : cat}</option>)}
                    </select>
                </div>
                <button 
                    onClick={() => { setEditingItem(null); setShowModal(true); }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] flex items-center gap-2"
                >
                    <Plus size={18} /> Add New Tool
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12 text-zinc-500">Loading tools...</div>
            ) : (
                <div className="border border-white/10 rounded-xl overflow-hidden bg-black/20">
                {filteredTools.map((tool) => (
                    <div key={tool.id} className="p-5 flex items-center justify-between hover:bg-white/5 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color || 'from-gray-700 to-gray-800'}`}></div>
                            <div>
                                <h3 className="font-bold text-white text-lg mb-1 group-hover:text-purple-400 transition-colors">{tool.name}</h3>
                                <p className="text-sm text-zinc-500 font-medium">
                                    <span className="bg-white/5 px-2 py-0.5 rounded text-xs mr-2 border border-white/5">{tool.category}</span>
                                    {tool.tag_line}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => { setEditingItem(tool); setShowModal(true); }} className="p-2.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/10">
                                <Edit2 size={18} />
                            </button>
                            <button onClick={() => handleDelete(tool.id).then(fetchTools)} className="p-2.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
                        <form onSubmit={handleSave}>
                            <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-md z-10">
                                <h3 className="text-xl font-bold text-white">{editingItem ? 'Edit' : 'Add New'} Tool</h3>
                                <button type="button" onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-white"><X size={20} /></button>
                            </div>
                            <div className="p-6 space-y-6">
                                <h4 className="text-sm font-bold text-purple-400 uppercase">1. Core Info</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <input className="bg-white/5 border border-white/10 rounded-xl p-3 text-white" placeholder="Category (e.g. writing)" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} required />
                                    <input className="bg-white/5 border border-white/10 rounded-xl p-3 text-white" placeholder="Icon Name (e.g. Zap)" value={formData.icon_name || ''} onChange={e => setFormData({...formData, icon_name: e.target.value})} />
                                </div>
                                <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white" placeholder="Website URL" value={formData.url || ''} onChange={e => setFormData({...formData, url: e.target.value})} />
                                
                                <h4 className="text-sm font-bold text-purple-400 uppercase">2. Color Theme</h4>
                                <div className="grid grid-cols-5 gap-2">
                                    {GRADIENTS.map(grad => (
                                        <button 
                                            key={grad.value}
                                            type="button"
                                            onClick={() => setFormData({...formData, color: grad.value})}
                                            className={`h-10 rounded-lg bg-gradient-to-br ${grad.value} relative ring-2 ring-offset-2 ring-offset-black ${formData.color === grad.value ? 'ring-white' : 'ring-transparent opacity-50 hover:opacity-100'}`}
                                            title={grad.label}
                                        />
                                    ))}
                                </div>

                                <div className="flex gap-2 mb-4 border-t border-white/10 pt-4">
                                     <button type="button" onClick={() => setFormLang('en')} className={`px-4 py-1.5 rounded-lg text-sm font-medium ${formLang === 'en' ? 'bg-purple-600' : 'bg-white/5'}`}>English</button>
                                     <button type="button" onClick={() => setFormLang('ar')} className={`px-4 py-1.5 rounded-lg text-sm font-medium ${formLang === 'ar' ? 'bg-purple-600' : 'bg-white/5'}`}>Arabic</button>
                                </div>
                                <div className="space-y-4">
                                    {/* Name Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Name ({formLang.toUpperCase()})
                                        </label>
                                        <div className="flex gap-2">
                                            <input 
                                                className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-white" 
                                                placeholder={`Enter tool name (${formLang.toUpperCase()})`} 
                                                value={formData[`${formLang}_name`] || ''} 
                                                onChange={e => setFormData({...formData, [`${formLang}_name`]: e.target.value})} 
                                                dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                                            />
                                            {formLang === 'en' && formData.en_name && (
                                                <AIGenerator
                                                    type="translation"
                                                    context={{ text: formData.en_name }}
                                                    lang="ar"
                                                    onGenerate={(text) => setFormData({...formData, ar_name: text})}
                                                    label="🌐"
                                                    className="shrink-0"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Tagline Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Short Tagline ({formLang.toUpperCase()})
                                        </label>
                                        <div className="flex gap-2">
                                            <input 
                                                className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-white" 
                                                placeholder={`Enter tagline (${formLang.toUpperCase()})`} 
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
                                                        label="✨"
                                                        className="shrink-0"
                                                    />
                                                )}
                                                {formLang === 'en' && formData.en_tag && (
                                                    <AIGenerator
                                                        type="translation"
                                                        context={{ text: formData.en_tag }}
                                                        lang="ar"
                                                        onGenerate={(text) => setFormData({...formData, ar_tag: text})}
                                                        label="🌐"
                                                        className="shrink-0"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Description ({formLang.toUpperCase()})
                                        </label>
                                        <div className="flex gap-2">
                                            <textarea 
                                                className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-white resize-none" 
                                                placeholder={`Enter description (${formLang.toUpperCase()})`} 
                                                rows={4} 
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
                                                        label="🎯"
                                                        className="shrink-0"
                                                    />
                                                )}
                                                {formLang === 'en' && formData.en_description && (
                                                    <AIGenerator
                                                        type="translation"
                                                        context={{ text: formData.en_description }}
                                                        lang="ar"
                                                        onGenerate={(text) => setFormData({...formData, ar_description: text})}
                                                        label="🌐"
                                                        className="shrink-0"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border-t border-white/10 flex justify-end gap-3">
                                <button onClick={() => setShowModal(false)} className="px-5 py-2.5 text-zinc-400 hover:text-white">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTools;
