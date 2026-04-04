'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale } from '@/types';
import en from '@/locales/en.json';
import ar from '@/locales/ar.json';

type TranslationsType = typeof en;

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: TranslationsType;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
}

const translations: Record<Locale, TranslationsType> = {
  en,
  ar: ar as TranslationsType,
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('event-locale') as Locale | null;
    if (savedLocale && ['en', 'ar'].includes(savedLocale)) {
      setLocaleState(savedLocale);
    }
    setIsLoaded(true);
  }, []);

  // Apply direction to document
  useEffect(() => {
    if (isLoaded) {
      const dir = locale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', locale);
      localStorage.setItem('event-locale', locale);
    }
  }, [locale, isLoaded]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'ar' : 'en');
  };

  const t = translations[locale];
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const isRTL = locale === 'ar';

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
        toggleLocale,
        t,
        dir,
        isRTL,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

// Helper function to get localized text from product/category/blog objects
export function getLocalizedText(
  obj: { name?: string; nameEn?: string; nameAr?: string; title?: string; titleEn?: string; titleAr?: string; description?: string; descriptionEn?: string; descriptionAr?: string },
  field: 'name' | 'title' | 'description',
  locale: Locale
): string {
  if (locale === 'ar') {
    if (field === 'name' && obj.nameAr) return obj.nameAr;
    if (field === 'title' && obj.titleAr) return obj.titleAr;
    if (field === 'description' && obj.descriptionAr) return obj.descriptionAr;
  } else {
    // English
    if (field === 'name' && obj.nameEn) return obj.nameEn;
    if (field === 'title' && obj.titleEn) return obj.titleEn;
    if (field === 'description' && obj.descriptionEn) return obj.descriptionEn;
  }
  // Fallback to base field if specific locale field is missing
  if (field === 'name' && obj.name) return obj.name;
  if (field === 'title' && obj.title) return obj.title;
  if (field === 'description' && obj.description) return obj.description;
  return '';
}
