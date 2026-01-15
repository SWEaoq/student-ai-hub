import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminTools = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [tools, setTools] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Helper to safely get value from item or content JSONB
    const getValue = (item, field, lang = 'en') => {
        if (!item) return '';
        // 1. Try direct column if it exists (e.g. item.name)
        if (item[field] && typeof item[field] === 'string') return item[field];
        // 2. Try content root (for shared fields)
        if (item.content && item.content[field]) return item.content[field];
        // 3. Try content lang specific
        if (item.content && item.content[lang] && item.content[lang][field]) return item.content[lang][field];
        
        return '';
    };

    const fetchTools = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('tools').select('*').order('id', { ascending: false });
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

    const filteredTools = tools.filter(tool => selectedCategory === 'all' || getValue(tool, 'category')?.toLowerCase() === selectedCategory.toLowerCase());
    const categories = ['all', ...Array.from(new Set(tools.map(t => getValue(t, 'category')).filter(Boolean)))];

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
                    onClick={() => navigate('/admin/tools/new')}
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
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getValue(tool, 'color') || 'from-gray-700 to-gray-800'}`}></div>
                            <div>
                                <h3 className="font-bold text-white text-lg mb-1 group-hover:text-purple-400 transition-colors">
                                    {getValue(tool, 'name', 'en') || 'Untitled Tool'}
                                </h3>
                                <p className="text-sm text-zinc-500 font-medium">
                                    <span className="bg-white/5 px-2 py-0.5 rounded text-xs mr-2 border border-white/5">{getValue(tool, 'category')}</span>
                                    {getValue(tool, 'tag', 'en') || getValue(tool, 'tag_line')}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => navigate(`/admin/tools/edit/${tool.id}`)} className="p-2.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/10">
                                <Edit2 size={18} />
                            </button>
                            <button onClick={() => handleDelete(tool.id)} className="p-2.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
};

export default AdminTools;
