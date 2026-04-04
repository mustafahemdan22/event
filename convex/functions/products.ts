import { mutation, query } from "../_generated/server";
import { v } from "convex/values";
import en from "../../locales/en.json";
import ar from "../../locales/ar.json";

// Add a single product
export const createProduct = mutation({
  args: {
    name: v.string(),
    nameEn: v.string(),
    price: v.number(),
    images: v.array(v.string()),
    category: v.string(),
    description: v.string(),
    descriptionEn: v.string(),
    brand: v.string(),
    stock: v.number(),
    unit: v.string(),
    rating: v.number(),
    reviews: v.number(),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("products", {
      ...args,
      category: args.category.trim().toLowerCase(),
    });
  },
});

export const getProducts = query({
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const getNewArrivals = query({
  handler: async (ctx) => {
    const flagged = await ctx.db.query("products").collect();
    const newArrivals = flagged.filter((p) => p.newArrival === true);
    if (newArrivals.length > 0) return newArrivals.slice(0, 8);
    return flagged
      .sort((a, b) => b._creationTime - a._creationTime)
      .slice(0, 8);
  },
});

export const getFeaturedProducts = query({
  handler: async (ctx) => {
    const all = await ctx.db.query("products").collect();
    const featured = all.filter((p) => p.featured === true);
    if (featured.length > 0) return featured.slice(0, 8);
    return all
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
  },
});

export const getProductById = query({
  args: { productId: v.string() },
  handler: async ({ db }, args) => {
    if (!args.productId) return null;
    try {
      const id = db.normalizeId("products", args.productId);
      if (!id) return null;
      return await db.get(id);
    } catch {
      return null;
    }
  },
});

export const getProductByManualId = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    if (!args.id) return null;
    const all = await ctx.db.query("products").collect();
    const match = all.find((p) => p.id === args.id);
    if (match) return match;
    try {
      const normalizedId = ctx.db.normalizeId("products", args.id);
      if (!normalizedId) return null;
      return await ctx.db.get(normalizedId);
    } catch {
      return null;
    }
  },
});

export const getProductsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const category = args.category.trim().toLowerCase();
    return await ctx.db
      .query("products")
      .withIndex("by_category", (q) =>
        q.eq("category", category)
      )
      .collect();
  },
});

export const deleteProduct = mutation({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.productId);
    return { deleted: true };
  },
});

export const updateProductImage = mutation({
  args: {
    productId: v.id("products"),
    images: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.productId, {
      images: args.images
    });
    return { success: true };
  },
});

export const migrateToStrictCloudinary = mutation({
  args: {},
  handler: async (ctx) => {
    const allProducts = await ctx.db.query("products").collect();
    let updated = 0;
    for (const product of allProducts) {
      const legacyImage = (product as any).image;
      let finalImages = product.images || [];
      if (legacyImage && !finalImages.includes(legacyImage)) {
        finalImages = [legacyImage, ...finalImages];
      }
      finalImages = finalImages.filter(img => img && !img.includes('coming-soon'));
      finalImages = finalImages.map(img => {
        if (img.startsWith('http') || img.includes('/')) return img;
        return `products/${product.category}/${img}`;
      });
      finalImages = [...new Set(finalImages)];
      const patchData: any = { images: finalImages };
      if (legacyImage !== undefined) {
        patchData.image = undefined;
      }
      await ctx.db.patch(product._id, patchData);
      updated++;
    }
    return `Successfully migrated ${updated} products.`;
  },
});

export const seedProductsFromLocales = mutation({
  args: {},
  handler: async (ctx) => {
    const existingProds = await ctx.db.query("products").collect();
    for (const prod of existingProds) {
      await ctx.db.delete(prod._id);
    }
    let count = 0;
    const productData = en.productData as any;
    const arProductData = ar.productData as any;
    for (const [category, items] of Object.entries(productData)) {
      const arItems = arProductData[category] || [];
      for (let i = 0; i < (items as any[]).length; i++) {
        const item = (items as any[])[i];
        const arItem = arItems[i] || item;
        await ctx.db.insert("products", {
          name: arItem.name,
          nameEn: item.name,
          nameAr: arItem.name,
          description: arItem.description,
          descriptionEn: item.description,
          descriptionAr: arItem.description,
          category: category,
          price: 1000,
          brand: "Event",
          stock: 10,
          unit: "piece",
          rating: 5,
          reviews: 0,
          images: [`Event/categories/${category}/products/${(i + 1).toString().padStart(2, '0')}.jpg`],
          inStock: true
        });
        count++;
      }
    }
    return `Successfully seeded ${count} products!`;
  },
});
