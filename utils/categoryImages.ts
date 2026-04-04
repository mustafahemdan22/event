
import { getOptimizedCloudinaryUrl } from "./productImage";


export type CategoryAssets = {
    header: string;
};

export const categoriesImages: Record<string, CategoryAssets> = {
    men: { header: "event/categories/men/header" },
    women: { header: "event/categories/women/header" },
    kids: { header: "event/categories/kids/header" },
    shoes: { header: "event/categories/shoes/header" },
    jeans: { header: "event/categories/jeans/header" },
    lingerie: { header: "event/categories/lingerie/header" },
    accessories: { header: "event/categories/accessories/header" },
};

/**
 * Helper to get images for a specific category.
 * Provides fallback defaults if the category slug is unmapped.
 */
export function getCategoryAssets(slug: string): CategoryAssets {
    const normalizedSlug = slug.toLowerCase();

    const result = categoriesImages[normalizedSlug] || {
        header: "event/categories/all",
    };

    return {
        header: getOptimizedCloudinaryUrl(result.header, 1200),
    };
}
