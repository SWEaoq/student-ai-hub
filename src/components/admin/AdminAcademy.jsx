import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Edit2, Save, X, GraduationCap, BookOpen, Video } from 'lucide-react';

const AdminAcademy = () => {
    const [categories, setCategories] = useState([]);
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('categories'); // 'categories' | 'tutorials'
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [formLang, setFormLang] = useState('en');

    const fetchData = async () => {
        setLoading(true);
        const { data: cats, error: err1 } = await supabase.from('academy_categories').select('*').order('id');
        const { data: tuts, error: err2 } = await supabase.from('academy_tutorials').select('*').order('id');
        
        if (err1 || err2) console.error(err1, err2);
        else {
            console.log('Academy Data:', { cats, tuts });
            setCategories(cats || []);
            setTutorials(tuts || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id, table) => {
        if (!confirm('Delete this item?')) return;
        const { error } = await supabase.from(table).delete().eq('id', id);
        if (error) alert(error.message);
        else fetchData();
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const table = activeSection === 'categories' ? 'academy_categories' : 'academy_tutorials';
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

            if (activeSection === 'categories') {
                payload = {
                    icon_name: formData.icon_name,
                    content: content
                };
            } else {
                payload = {
                    category: formData.category_id,
                    link: formData.link,
                    content: content
                };
            }

            const query = editingItem 
                ? supabase.from(table).update(payload).eq('id', editingItem.id)
                : supabase.from(table).insert([payload]);

            const { error } = await query;
            if (error) throw error;
            
            setShowModal(false);
            fetchData();
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (editingItem) {
            const content = editingItem.content || {};
            setFormData({
                icon_name: editingItem.icon_name,
                en_title: content.en?.name || (typeof editingItem.title === 'string' ? editingItem.title : editingItem.title?.en),
                ar_title: content.ar?.name || (typeof editingItem.title === 'string' ? editingItem.title : editingItem.title?.ar),
                en_desc: content.en?.description || (typeof editingItem.description === 'string' ? editingItem.description : editingItem.description?.en),
                ar_desc: content.ar?.description || (typeof editingItem.description === 'string' ? editingItem.description : editingItem.description?.ar),
                category_id: editingItem.category,
                link: editingItem.link
            });
        } else {
            setFormData({});
        }
    }, [editingItem]);

    const getItemName = (item) => {
        if (item.content?.en?.name) return item.content.en.name;
        if (typeof item.title === 'string') return item.title;
        if (item.title?.en) return item.title.en;
        return 'Untitled';
    };

    const getItemDescription = (item) => {
        if (item.content?.en?.description) return item.content.en.description;
        if (typeof item.description === 'string') return item.description;
        if (item.description?.en) return item.description.en;
        return '';
    };

    return (
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl mt-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <GraduationCap className="text-yellow-400" size={24} />
                        Academy Manager
                    </h2>
                    <div className="flex gap-2">
                        <button onClick={() => setActiveSection('categories')} className={`px-3 py-1 rounded-lg text-sm ${activeSection === 'categories' ? 'bg-purple-600 text-white' : 'bg-white/5 text-zinc-400'}`}>Categories</button>
                        <button onClick={() => setActiveSection('tutorials')} className={`px-3 py-1 rounded-lg text-sm ${activeSection === 'tutorials' ? 'bg-purple-600 text-white' : 'bg-white/5 text-zinc-400'}`}>Tutorials</button>
                    </div>
                </div>
                <button 
                    onClick={() => { setEditingItem(null); setShowModal(true); }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                >
                    <Plus size={16} /> Add {activeSection === 'categories' ? 'Category' : 'Tutorial'}
                </button>
            </div>

            {loading ? <div className="text-zinc-500 text-center py-8">Loading...</div> : (
                <div className="grid md:grid-cols-2 gap-4">
                    {activeSection === 'categories' ? categories.map(cat => (
                        <div key={cat.id} className="bg-white/5 p-4 rounded-xl border border-white/10 group">
                            <div className="flex justify-between items-start mb-2">
                                <span className="bg-yellow-500/20 text-yellow-500 p-2 rounded-lg">{cat.icon_name}</span>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => { setEditingItem(cat); setShowModal(true); }}><Edit2 className="text-zinc-400 hover:text-white" size={16} /></button>
                                    <button onClick={() => handleDelete(cat.id, 'academy_categories')}><Trash2 className="text-red-400 hover:text-red-300" size={16} /></button>
                                </div>
                            </div>
                            <h3 className="font-bold text-white mb-1">
                                {getItemName(cat)}
                            </h3>
                            <p className="text-sm text-zinc-400">
                                {getItemDescription(cat)}
                            </p>
                        </div>
                    )) : tutorials.map(tut => (
                         <div key={tut.id} className="bg-white/5 p-4 rounded-xl border border-white/10 group flex items-center gap-4">
                            <div className="bg-blue-500/20 text-blue-400 p-3 rounded-full"><Video size={20} /></div>
                            <div className="flex-1">
                                <h3 className="font-bold text-white mb-1">
                                    {getItemName(tut)}
                                </h3>
                                <a href={tut.link} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">{tut.link}</a>
                                <p className="text-xs text-zinc-500 mt-1">
                                    In: {(() => {
                                        const cat = categories.find(c => c.id === tut.category);
                                        return cat ? getItemName(cat) : 'Unknown Category';
                                    })()}
                                </p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => { setEditingItem(tut); setShowModal(true); }}><Edit2 className="text-zinc-400 hover:text-white" size={16} /></button>
                                <button onClick={() => handleDelete(tut.id, 'academy_tutorials')}><Trash2 className="text-red-400 hover:text-red-300" size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <h3 className="text-xl font-bold text-white mb-4">{editingItem ? 'Edit' : 'Add'} {activeSection === 'categories' ? 'Category' : 'Tutorial'}</h3>
                             
                             <div className="flex gap-2 border-b border-white/10 pb-4">
                                <button type="button" onClick={() => setFormLang('en')} className={`px-3 py-1 rounded text-sm ${formLang === 'en' ? 'bg-purple-600' : 'bg-white/5'}`}>EN</button>
                                <button type="button" onClick={() => setFormLang('ar')} className={`px-3 py-1 rounded text-sm ${formLang === 'ar' ? 'bg-purple-600' : 'bg-white/5'}`}>AR</button>
                             </div>

                             <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" placeholder={`Title (${formLang})`} value={formData[`${formLang}_title`] || ''} onChange={e => setFormData({...formData, [`${formLang}_title`]: e.target.value})} required dir={formLang === 'ar' ? 'rtl' : 'ltr'} />

                             {activeSection === 'categories' && (
                                <>
                                    <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" placeholder={`Description (${formLang})`} value={formData[`${formLang}_desc`] || ''} onChange={e => setFormData({...formData, [`${formLang}_desc`]: e.target.value})} rows={3} dir={formLang === 'ar' ? 'rtl' : 'ltr'} />
                                    <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" placeholder="Icon Name (Lucide)" value={formData.icon_name || ''} onChange={e => setFormData({...formData, icon_name: e.target.value})} />
                                </>
                             )}

                             {activeSection === 'tutorials' && (
                                <>
                                    <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" placeholder="Video Link" value={formData.link || ''} onChange={e => setFormData({...formData, link: e.target.value})} />
                                    <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" value={formData.category_id || ''} onChange={e => setFormData({...formData, category_id: e.target.value})} required>
                                        <option value="">Select Category</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{getItemName(c)}</option>)}
                                    </select>
                                </>
                             )}

                             <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-zinc-400">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-purple-600 rounded-lg text-white font-bold">Save</button>
                             </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAcademy;
