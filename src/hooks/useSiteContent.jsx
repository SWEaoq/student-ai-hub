import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CONTENT } from '../data/content'; // Fallback restored

const SiteContentContext = createContext();

const resolveInitialLang = () => {
    if (typeof window === 'undefined') return 'en';
    const stored = window.localStorage.getItem('aihub_lang');
    if (stored === 'en' || stored === 'ar') return stored;
    const browserLang = window.navigator?.language || '';
    return browserLang.toLowerCase().startsWith('ar') ? 'ar' : 'en';
};

export const SiteContentProvider = ({ children }) => {
    const [lang, setLang] = useState(resolveInitialLang);
    const [settings, setSettings] = useState({});
    const [navigation, setNavigation] = useState([]);
    const [tools, setTools] = useState([]); // Add tools state
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

                // Fetch Tools (Dynamic)
                const { data: toolsData, error: toolsError } = await supabase
                    .from('tools')
                    .select('*');
                
                if (toolsError) throw toolsError;

                setSettings(settingsMap);
                setNavigation(navData || []);
                setTools(toolsData || []); // Set tools state
                
            } catch (error) {
                console.error('Error fetching site content:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGlobalContent();
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem('aihub_lang', lang);
    }, [lang]);

    // Helper to get text by key and language
    const getText = (key, defaultText = '') => {
        // 1. Try DB Settings
        const dbValue = settings[key]?.[lang];
        if (dbValue) return dbValue;

        // 2. Fallback to Local Content
        try {
            const parts = key.split('.');
            let current = CONTENT[lang];
            for (const part of parts) {
                if (current === undefined || current === null) break;
                current = current[part];
            }
            if (current !== undefined && typeof current !== 'object') return current;
        } catch (e) {
            console.warn(`Error resolving content for key: ${key}`, e);
        }

        return defaultText;
    };

    return (
        <SiteContentContext.Provider value={{ lang, setLang, settings, navigation, tools, loading, getText }}>
            {children}
        </SiteContentContext.Provider>
    );
};

export const useSiteContent = () => {
    return useContext(SiteContentContext);
};
