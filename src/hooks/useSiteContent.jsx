import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CONTENT } from '../data/content'; // Fallback

const SiteContentContext = createContext();

export const SiteContentProvider = ({ children }) => {
    const [lang, setLang] = useState('en');
    const [settings, setSettings] = useState({});
    const [navigation, setNavigation] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGlobalContent = async () => {
            try {
                setLoading(true);
                
                // Fetch Site Settings
                const { data: settingsData, error: settingsError } = await supabase
                    .from('site_settings')
                    .select('*');

                if (settingsError) throw settingsError;

                // Transform settings array to object for easier access
                // e.g., { "hero_title_1": { en: "...", ar: "..." } }
                const settingsMap = {};
                if (settingsData) {
                    settingsData.forEach(item => {
                        settingsMap[item.key] = item.value;
                    });
                }

                // Fetch Navigation
                const { data: navData, error: navError } = await supabase
                    .from('navigation')
                    .select('*')
                    .order('order', { ascending: true });

                if (navError) throw navError;

                setSettings(settingsMap);
                setNavigation(navData || []);
                
            } catch (error) {
                console.error('Error fetching site content:', error);
                // Fallback to local content is strictly for emergencies, 
                // but ideally we want to rely on DB.
            } finally {
                setLoading(false);
            }
        };

        fetchGlobalContent();
    }, []);

    // Helper to get text by key and language
    const getText = (key, defaultText = '') => {
        return settings[key]?.[lang] || defaultText;
    };

    return (
        <SiteContentContext.Provider value={{ lang, setLang, settings, navigation, loading, getText }}>
            {children}
        </SiteContentContext.Provider>
    );
};

export const useSiteContent = () => {
    return useContext(SiteContentContext);
};
