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
    // localStorage'dan dili al veya varsayılan TR'yi kullan
    const saved = localStorage.getItem('language');
    return saved || 'TR';
  });

  // Dil değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = TRANSLATIONS[language];

  const changeLanguage = (lang) => {
    if (LANGUAGES[lang]) {
      setLanguage(lang);
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
