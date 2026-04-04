import { Category } from '@/types';
import en from '@/locales/en.json';
import ar from '@/locales/ar.json';

const categorySlugs = ['men', 'women', 'kids', 'shoes', 'lingerie', 'jeans', 'accessories'];

export const categories: Category[] = categorySlugs.map((slug, index) => {
    const enData = (en.categories as any)[slug];
    const arData = (ar.categories as any)[slug];
    
    return {
        id: `cat-${index + 1}`,
        slug,
        name: enData.name,
        nameAr: arData.name,
        description: enData.description,
        descriptionAr: arData.description,
        image: `Event/categories/${slug}/header.jpg`,
        productCount: 0,
    };
});


export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find((cat) => cat.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
    return categories.find((cat) => cat.id === id);
}

