// convex/translations.ts
import { categoryHeroImages } from "./constants";
import en from "../locales/en.json";
import ar from "../locales/ar.json";

export const categoryTranslations: Record<string, { ar: string; en: string; image: string }> = Object.keys(en.categories)
    .filter(slug => slug !== 'all')
    .reduce((acc, slug) => {
        const enData = (en.categories as any)[slug];
        const arData = (ar.categories as any)[slug];
        acc[slug] = {
            ar: arData.name,
            en: enData.name,
            image: (categoryHeroImages as any)[slug] || "categories/all/header"
        };
        return acc;
    }, {} as Record<string, any>);

export const getCategoryData = (category: string) => {
    const key = category.toLowerCase();
    const trans = categoryTranslations[key];
    return {
        ar: trans?.ar || category,
        en: trans?.en || category,
        image: trans?.image || "categories/all/header",
    };
};

export const getCategoryName = (category: string, language: 'ar' | 'en') => {
    const trans = categoryTranslations[category.toLowerCase()];
    if (trans) {
        return language === 'ar' ? trans.ar : trans.en;
    }
    // Fallback to capitalized category if no translation exists
    return category.charAt(0).toUpperCase() + category.slice(1);
};

