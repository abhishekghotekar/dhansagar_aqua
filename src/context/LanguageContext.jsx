import React, { createContext, useState, useContext, useEffect } from 'react';
import { en } from '../translations/en';
import { mr } from '../translations/mr';
import { hi } from '../translations/hi';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(localStorage.getItem('preferredLang') || 'mr');
    
    const translations = {
        en: en,
        mr: mr,
        hi: hi
    };

    const t = (path) => {
        const keys = path.split('.');
        let result = translations[lang];
        keys.forEach(key => {
            if (result) result = result[key];
        });
        return result || path;
    };

    const changeLanguage = (newLang) => {
        setLang(newLang);
        localStorage.setItem('preferredLang', newLang);
    };

    return (
        <LanguageContext.Provider value={{ lang, t, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
