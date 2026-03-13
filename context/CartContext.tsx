'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartItem, Product, ProductColor } from '@/types';

interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; size: string; color: ProductColor; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; size: string; colorHex: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: string; colorHex: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const initialState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
};

function calculateTotals(items: CartItem[]): { totalItems: number; subtotal: number } {
  return items.reduce(
    (acc, item) => ({
      totalItems: acc.totalItems + item.quantity,
      subtotal: acc.subtotal + item.product.price * item.quantity,
    }),
    { totalItems: 0, subtotal: 0 }
  );
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size, color, quantity = 1 } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.hex === color.hex
      );

      let newItems: CartItem[];
      if (existingIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          { product, quantity, selectedSize: size, selectedColor: color },
        ];
      }

      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'REMOVE_ITEM': {
      const { productId, size, colorHex } = action.payload;
      const newItems = state.items.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.hex === colorHex
          )
      );
      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, size, colorHex, quantity } = action.payload;
      if (quantity <= 0) {
        const newItems = state.items.filter(
          (item) =>
            !(
              item.product.id === productId &&
              item.selectedSize === size &&
              item.selectedColor.hex === colorHex
            )
        );
        const totals = calculateTotals(newItems);
        return { items: newItems, ...totals };
      }

      const newItems = state.items.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor.hex === colorHex
          ? { ...item, quantity }
          : item
      );
      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'CLEAR_CART':
      return initialState;

    case 'LOAD_CART': {
      const totals = calculateTotals(action.payload);
      return { items: action.payload, ...totals };
    }

    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addItem: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeItem: (productId: string, size: string, colorHex: string) => void;
  updateQuantity: (productId: string, size: string, colorHex: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('event-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('event-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: Product, size: string, color: ProductColor, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, size, color, quantity } });
  };

  const removeItem = (productId: string, size: string, colorHex: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, size, colorHex } });
  };

  const updateQuantity = (productId: string, size: string, colorHex: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, colorHex, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (productId: string) => {
    return state.items.some((item) => item.product.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems: state.totalItems,
        subtotal: state.subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
