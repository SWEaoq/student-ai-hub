import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Save, Move, Link as LinkIcon } from 'lucide-react';

const AdminNavigation = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLinks = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('navigation').select('*').order('order', { ascending: true });
        if (error) console.error('Error fetching nav:', error);
        else setLinks(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    const handleAdd = async () => {
        const newLink = {
            label: { en: 'New Link', ar: 'رابط جديد' },
            path: '/',
            order: links.length + 1,
            is_button: false
        };
        const { data, error } = await supabase.from('navigation').insert([newLink]).select();
        if (error) alert('Error adding link');
        else setLinks([...links, data[0]]);
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this link?')) return;
        const { error } = await supabase.from('navigation').delete().eq('id', id);
        if (error) alert('Error deleting link');
        else setLinks(links.filter(l => l.id !== id));
    };

    const handleUpdate = async (id, field, value) => {
        // Optimistic update
        const updatedLinks = links.map(l => l.id === id ? { ...l, ...value } : l);
        setLinks(updatedLinks);

        // Debounce or just fire update (simple implementation)
        await supabase.from('navigation').update(value).eq('id', id);
    };

    const handleLabelChange = (id, lang, text) => {
        const link = links.find(l => l.id === id);
        const newLabel = { ...link.label, [lang]: text };
        handleUpdate(id, 'label', { label: newLabel });
    };

    return (
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <LinkIcon className="text-blue-400" size={24} />
                    Navigation Links
                </h2>
                <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                    <Plus size={16} /> Add Link
                </button>
            </div>

            <div className="space-y-3">
                {links.map((link, index) => (
                    <div key={link.id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col md:flex-row gap-4 items-center">
                        <div className="bg-white/5 p-2 rounded cursor-move text-zinc-500">
                            <Move size={16} />
                        </div>
                        
                        <div className="flex-1 grid md:grid-cols-2 gap-2 w-full">
                            <input 
                                className="bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white"
                                placeholder="English Label"
                                value={link.label.en || ''}
                                onChange={(e) => handleLabelChange(link.id, 'en', e.target.value)}
                            />
                            <input 
                                className="bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white text-right"
                                placeholder="Arabic Label"
                                dir="rtl"
                                value={link.label.ar || ''}
                                onChange={(e) => handleLabelChange(link.id, 'ar', e.target.value)}
                            />
                        </div>

                        <div className="flex-1">
                             <input 
                                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-zinc-300 font-mono"
                                placeholder="/path"
                                value={link.path}
                                onChange={(e) => handleUpdate(link.id, 'path', { path: e.target.value })}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={link.is_button} 
                                    onChange={(e) => handleUpdate(link.id, 'is_button', { is_button: e.target.checked })}
                                    className="rounded bg-black/40 border-white/10 text-purple-600 focus:ring-purple-500"
                                />
                                Button?
                            </label>
                            <button onClick={() => handleDelete(link.id)} className="text-red-400 hover:bg-red-500/10 p-2 rounded">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminNavigation;
