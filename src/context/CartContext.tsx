"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { FurnitureProps } from "@/types/type";

interface CartItem {
  furniture: FurnitureProps;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (furniture: FurnitureProps) => void;
  removeFromCart: (furnitureId: number) => void;
  updateQuantity: (furnitureId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
  getUniqueItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCartItems = localStorage.getItem('furniro-cart-items');
    if (savedCartItems) {
      try {
        const parsedItems = JSON.parse(savedCartItems);
        setCartItems(parsedItems);
      } catch (error) {
        console.error('Error parsing cart items from localStorage:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save cart items to localStorage whenever cartItems changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('furniro-cart-items', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  const addToCart = (furniture: FurnitureProps) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.furniture.id === furniture.id
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.furniture.id === furniture.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { furniture, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (furnitureId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.furniture.id !== furnitureId)
    );
  };

  const updateQuantity = (furnitureId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(furnitureId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.furniture.id === furnitureId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.furniture.discount_price || item.furniture.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getUniqueItemCount = () => {
    return cartItems.length;
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getItemCount,
    getUniqueItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
