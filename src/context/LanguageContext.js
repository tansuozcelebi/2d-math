import React, { createContext, useState, useEffect } from 'react';
import { TR } from '../locales/TR';
import { EN } from '../locales/EN';
import { DE } from '../locales/DE';

export const LanguageContext = createContext();

const LANGUAGES = {
  TR: { code: 'TR', name: 'Türkçe', flag: '🇹🇷' },
  EN: { code: 'EN', name: 'English', flag: '🇬🇧' },
  DE: { code: 'DE', name: 'Deutsch', flag: '🇩🇪' }
};

const TRANSLATIONS = {
  TR,
  EN,
  DE
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Read legacy/new keys, normalize to upper-case, fallback to TR
    const saved = localStorage.getItem('selectedLanguage') || localStorage.getItem('language');
    const normalized = saved ? saved.toUpperCase() : 'TR';
    return LANGUAGES[normalized] ? normalized : 'TR';
  });

  // Persist both old and new keys for compatibility
  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
    localStorage.setItem('language', language);
  }, [language]);

  const t = TRANSLATIONS[language] || TRANSLATIONS.TR;

  const changeLanguage = (lang) => {
    const normalized = lang?.toUpperCase();
    if (normalized && LANGUAGES[normalized]) {
      setLanguage(normalized);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        languages: LANGUAGES,
        changeLanguage,
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
