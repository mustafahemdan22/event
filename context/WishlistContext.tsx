'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, WishlistItem } from '@/types';

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {    const savedWishlist = localStorage.getItem('event-wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        setItems(parsedWishlist);
      } catch (e) {
        console.error('Failed to parse wishlist from localStorage', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save wishlist to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('event-wishlist', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      if (prev.some((item) => item.product.id === product.id)) {
        return prev;
      }
      return [...prev, { product }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const toggleItem = (product: Product) => {
    if (isInWishlist(product.id || '')) {
      removeItem(product.id || '');
    } else {
      addItem(product);
    }
  };

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        toggleItem,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
