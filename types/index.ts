// Product Types
export interface Product {
  _id?: string;
  id?: string;
  name: string;
  nameEn?: string;
  nameAr?: string;
  description: string;
  descriptionEn?: string;
  descriptionAr?: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  sizes?: string[];
  colors?: ProductColor[];
  inStock?: boolean;
  stock: number;
  featured?: boolean;
  newArrival?: boolean;
  rating: number;
  reviews: number;
  subtitle?: string;
  badge?: string;
}


export interface ProductColor {
  name: string;
  nameAr?: string;
  hex: string;
}


// Category Types
export interface Category {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  image: string;
  productCount: number;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: ProductColor;
}

// Wishlist Types
export interface WishlistItem {
  product: Product;
}

// Blog Types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  image: string;
  author: string;
  authorAr: string;
  date: string;
  category: string;
  categoryAr: string;
}

// Filter Types
export interface ProductFilters {
  category?: string;
  priceRange?: [number, number];
  sizes?: string[];
  colors?: string[];
  sortBy?: 'price-asc' | 'price-desc' | 'name' | 'newest';
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

// Locale Types
export type Locale = 'en' | 'ar';
