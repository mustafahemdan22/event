import { mutation } from "./_generated/server";
import en from "../locales/en.json";
import ar from "../locales/ar.json";

// Categories data from translations
const CATEGORIES = Object.entries(en.categories).filter(([slug]) => slug !== 'all').map(([slug, data]: [string, any]) => {
  const arData = (ar.categories as any)[slug];
  return {
    slug,
    name: arData.name,
    nameEn: data.name,
    heroImagePublicId: `Event/categories/${slug}/header.jpg`,
    description: arData.description,
    descriptionEn: data.description,
    sortOrder: ['men', 'women', 'kids', 'shoes', 'jeans', 'lingerie', 'accessories'].indexOf(slug) + 1 || 10,
  };
});

/**
 * Seed mutation to safely populate Categories and Products in the Convex database.
 * Run this by executing: `npx convex run seed`
 */
export default mutation({
  handler: async (ctx) => {
    // === 🚨 ADDED EXPERIMENTAL WIPE 🚨 ===
    // Wipe all existing products to ensure the new ones (with new images) replace the old ones.
    const allExistingProducts = await ctx.db.query("products").collect();
    for (const prod of allExistingProducts) {
      await ctx.db.delete(prod._id);
    }
    
    // Also wipe categories to clear out any removed 
    const allExistingCategories = await ctx.db.query("categories").collect();
    for (const cat of allExistingCategories) {
      await ctx.db.delete(cat._id);
    }
    // ===================================

    let categoriesInserted = 0;
    let productsInserted = 0;

    for (const cat of CATEGORIES) {
      // 1. Insert Category
      await ctx.db.insert("categories", {
        slug: cat.slug,
        name: cat.name,
        nameEn: cat.nameEn,
        heroImagePublicId: cat.heroImagePublicId,
        description: cat.description,
        descriptionEn: cat.descriptionEn,
        sortOrder: cat.sortOrder,
      });
      categoriesInserted++;

      // 2. Fetch seed data for products from locales
      const enProducts = (en.productData as any)[cat.slug] || [];
      const arProducts = (ar.productData as any)[cat.slug] || [];
      
      if (enProducts.length === 0) continue;

      for (let i = 0; i < 25; i++) {
        // Reuse products and append a sequence if we exceed the available seed data length
        const baseProductEn = enProducts[i % enProducts.length];
        const baseProductAr = arProducts[i % arProducts.length];
        const isDuplicate = i >= enProducts.length;

        const productNameArabic = isDuplicate ? `${baseProductAr.name} - إصدار ${i + 1}` : baseProductAr.name;
        const productNameEnglish = isDuplicate ? `${baseProductEn.name} - V${i + 1}` : baseProductEn.name;

        await ctx.db.insert("products", {
          name: productNameArabic, // Fallback for old schema compatibility
          nameEn: productNameEnglish,
          nameAr: productNameArabic,
          // Generate a random, realistic price
          price: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
          category: cat.slug,
          description: baseProductAr.description,
          descriptionEn: baseProductEn.description,
          descriptionAr: baseProductAr.description,
          brand: "Event",
          stock: Math.floor(Math.random() * 100) + 10,
          unit: "Piece",
          rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), // Rating between 3.5 and 5.0
          reviews: Math.floor(Math.random() * 100),
          // Assign exactly ONE image based on the specific index in the generation loop (1-indexed)
          images: [
            `Event/categories/${cat.slug}/products/${(i + 1).toString().padStart(2, '0')}.jpg`
          ],
          subtitle: "Premium Collection",
          inStock: true,
          featured: i < 4, // Make first 4 featured
          newArrival: i < 8, // Make first 8 new arrivals
        });
        productsInserted++;
      }
    }

    // Print a report matching requirements
    const reportStr = `🌱 SEED REPORT 🌱\nCategories Inserted: ${categoriesInserted} \nProducts Inserted: ${productsInserted}`;
    console.log(reportStr);

    return {
      success: true,
      message: "Seed completed successfully",
      categoriesInserted,
      productsInserted,
    };
  },
});

