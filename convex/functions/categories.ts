import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

export const listCategories = query({
  args: {},
  handler: async (ctx) => {
    // Prefer stable ordering if sortOrder exists; otherwise return as stored.
    const all = await ctx.db.query("categories").collect();
    return all.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  },
});

export const getCategoryBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const slug = args.slug.trim().toLowerCase();
    if (!slug) return null;
    return await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
  },
});

export const createCategory = mutation({
  args: {
    slug: v.string(),
    name: v.string(),
    nameEn: v.string(),
    heroImagePublicId: v.string(),
    description: v.optional(v.string()),
    descriptionEn: v.optional(v.string()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const slug = args.slug.trim().toLowerCase();
    if (!slug) throw new Error("slug is required");

    const existing = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (existing) throw new Error(`Category "${slug}" already exists`);

    return await ctx.db.insert("categories", { ...args, slug });
  },
});

export const deleteCategoryBySlug = mutation({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const slug = args.slug.trim().toLowerCase();
    const existing = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (!existing) return { deleted: false };

    await ctx.db.delete(existing._id);
    return { deleted: true };
  },
});

export const seedCategories = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing categories to ensure fresh start with correct paths
    const existingCats = await ctx.db.query("categories").collect();
    for (const cat of existingCats) {
      await ctx.db.delete(cat._id);
    }

    let count = 0;


    const categoriesToSeed = [
      { slug: 'men', name: 'رجال', nameEn: 'Men', heroImagePublicId: 'event/categories/men/header', sortOrder: 1 },
      { slug: 'women', name: 'نساء', nameEn: 'Women', heroImagePublicId: 'event/categories/women/header', sortOrder: 2 },
      { slug: 'kids', name: 'أطفال', nameEn: 'Kids', heroImagePublicId: 'event/categories/kids/header', sortOrder: 3 },
      { slug: 'shoes', name: 'أحذية', nameEn: 'Shoes', heroImagePublicId: 'event/categories/shoes/header', sortOrder: 4 },
      { slug: 'jeans', name: 'جينز', nameEn: 'Jeans', heroImagePublicId: 'event/categories/jeans/header', sortOrder: 5 },
      { slug: 'lingerie', name: 'ملابس داخلية', nameEn: 'Lingerie', heroImagePublicId: 'event/categories/lingerie/header', sortOrder: 6 },
      { slug: 'accessories', name: 'إكسسوارات', nameEn: 'Accessories', heroImagePublicId: 'event/categories/accessories/header', sortOrder: 7 },
    ];

    for (const cat of categoriesToSeed) {
      await ctx.db.insert("categories", cat);
      count++;
    }

    return `Successfully seeded ${count} categories!`;
  },
});
