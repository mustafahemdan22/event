import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    id: v.string(), // Manual ID from static data (e.g., 'men-1')
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
  }).index("by_category", ["category"])
    .index("by_manual_id", ["id"]),
});
