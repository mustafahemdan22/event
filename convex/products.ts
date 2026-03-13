import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getFeaturedProducts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("featured"), true))
      .collect();
  },
});

export const getNewArrivals = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("newArrival"), true))
      .collect();
  },
});

export const getProducts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const getProductByManualId = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_manual_id", (q) => q.eq("id", args.id))
      .unique();
  },
});

export const getProductsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

export const seedProducts = mutation({
  args: {
    products: v.array(v.object({
      id: v.string(),
      name: v.string(),
      nameAr: v.string(),
      description: v.string(),
      descriptionAr: v.string(),
      price: v.number(),
      originalPrice: v.optional(v.number()),
      images: v.array(v.string()),
      category: v.string(),
      sizes: v.array(v.string()),
      colors: v.array(v.object({
        name: v.string(),
        nameAr: v.string(),
        hex: v.string(),
      })),
      inStock: v.boolean(),
      stock: v.number(),
      featured: v.optional(v.boolean()),
      newArrival: v.optional(v.boolean()),
      rating: v.number(),
      reviews: v.number(),
    })),
  },
  handler: async (ctx, args) => {
    for (const product of args.products) {
      const existing = await ctx.db
        .query("products")
        .withIndex("by_manual_id", (q) => q.eq("id", product.id))
        .unique();
      
      if (existing) {
        await ctx.db.patch(existing._id, product);
      } else {
        await ctx.db.insert("products", product);
      }
    }
  },
});
