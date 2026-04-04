import { getOptimizedCloudinaryUrl } from "./productImage";

export const categoryHeroImages: Record<string, string> = {
    men: "event/categories/men/header",
    women: "event/categories/women/header",
    kids: "event/categories/kids/header",
    shoes: "event/categories/shoes/header",
    jeans: "event/categories/jeans/header",
    lingerie: "event/categories/lingerie/header",
    accessories: "event/categories/accessories/header",
};

/**
 * Returns the correct Cloudinary image URL for a given category.
 * If the category ID does not exist, it returns a fallback image.
 */
export const getCategoryHeroImage = (category: string): string => {
    const publicId = categoryHeroImages[category] || "event/categories/all/header";
    return getOptimizedCloudinaryUrl(publicId, 1200); // Higher width for heroes
};
