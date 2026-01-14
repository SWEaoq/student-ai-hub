import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Edit2, Save, X, Book } from 'lucide-react';

const AdminPlaybook = () => {
    const [playbooks, setPlaybooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [formLang, setFormLang] = useState('en');

    const fetchPlaybooks = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('playbooks').select('*').order('id', { ascending: false });
        if (error) console.error(error);
        else {
            console.log('Playbooks Data:', data);
            setPlaybooks(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPlaybooks();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Delete this playbook?')) return;
        const { error } = await supabase.from('playbooks').delete().eq('id', id);
        if (error) alert(error.message);
        else fetchPlaybooks();
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                title: { en: formData.en_title, ar: formData.ar_title },
                description: { en: formData.en_desc, ar: formData.ar_desc },
                link: formData.link,
                image_url: formData.image_url,
                category: formData.category
            };

            const query = editingItem 
                ? supabase.from('playbooks').update(payload).eq('id', editingItem.id)
                : supabase.from('playbooks').insert([payload]);

            const { error } = await query;
            if (error) throw error;
            
            setShowModal(false);
            fetchPlaybooks();
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (editingItem) {
            setFormData({
                en_title: editingItem.title?.en,
                ar_title: editingItem.title?.ar,
                en_desc: editingItem.description?.en,
                ar_desc: editingItem.description?.ar,
                link: editingItem.link,
                image_url: editingItem.image_url,
                category: editingItem.category
            });
        } else {
            setFormData({});
        }
    }, [editingItem]);

    return (
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Book className="text-emerald-400" size={24} />
                    Playbooks
                </h2>
                <button 
                    onClick={() => { setEditingItem(null); setShowModal(true); }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                >
                    <Plus size={16} /> Add Playbook
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {playbooks.map((item) => (
                    <div key={item.id} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden group">
                        <div className="h-40 bg-zinc-800 relative">
                            {item.image_url ? (
                                <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-600"><Book size={48} /></div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 p-1 rounded-lg">
                                <button onClick={() => { setEditingItem(item); setShowModal(true); }} className="text-white hover:text-purple-400"><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                            </div>
                        </div>
                        <div className="p-4">
                            <span className="text-xs font-bold text-emerald-400 mb-1 block uppercase tracking-wider">{item.category}</span>
                            <h3 className="font-bold text-white mb-2">
                                {typeof item.title === 'string' ? item.title : (item.title?.en || item.content?.en?.title || 'Untitled')}
                            </h3>
                            <p className="text-sm text-zinc-400 line-clamp-2">
                                {typeof item.description === 'string' ? item.description : (item.description?.en || item.content?.en?.description || '')}
                            </p>
                            <a href={item.link} target="_blank" rel="noreferrer" className="mt-3 block text-purple-400 text-xs hover:underline">View Playbook &rarr;</a>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <h3 className="text-xl font-bold text-white mb-4">{editingItem ? 'Edit' : 'Add'} Playbook</h3>
                             
                             <div className="flex gap-2 border-b border-white/10 pb-4">
                                <button type="button" onClick={() => setFormLang('en')} className={`px-3 py-1 rounded text-sm ${formLang === 'en' ? 'bg-purple-600' : 'bg-white/5'}`}>EN</button>
                                <button type="button" onClick={() => setFormLang('ar')} className={`px-3 py-1 rounded text-sm ${formLang === 'ar' ? 'bg-purple-600' : 'bg-white/5'}`}>AR</button>
                             </div>

                             <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" placeholder={`Title (${formLang})`} value={formData[`${formLang}_title`] || ''} onChange={e => setFormData({...formData, [`${formLang}_title`]: e.target.value})} required dir={formLang === 'ar' ? 'rtl' : 'ltr'} />
                             <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" placeholder={`Description (${formLang})`} value={formData[`${formLang}_desc`] || ''} onChange={e => setFormData({...formData, [`${formLang}_desc`]: e.target.value})} rows={3} dir={formLang === 'ar' ? 'rtl' : 'ltr'} />

                             <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" placeholder="Category (e.g. Finance)" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} />
                             <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" placeholder="Link URL" value={formData.link || ''} onChange={e => setFormData({...formData, link: e.target.value})} />
                             <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" placeholder="Image URL" value={formData.image_url || ''} onChange={e => setFormData({...formData, image_url: e.target.value})} />

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

export default AdminPlaybook;
