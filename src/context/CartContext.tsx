"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/services/products";


import { fetchCartItems, addItemToCart, removeItemFromCart } from "@/services/cart";
import { PaginatedResponse } from "@/types/type";
import { CartItem } from "@/services/cart";

interface CartContextType {
  cartItems: CartItem[] | null;
  addToCart: (furniture: Product) => Promise<void>;
  removeFromCart: (itemId: number) => void;
  // updateQuantity: (furnitureId: number, quantity: number) => void;
  // clearCart: () => void;
  // getTotalPrice: () => number;
  // getItemCount: () => number;
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
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // useEffect(() => {
  //   const savedCartItems = localStorage.getItem("furniro-cart-items");
  //   if (savedCartItems) {
  //     try {
  //       const parsedItems = JSON.parse(savedCartItems);
  //       setCartItems(parsedItems);
  //     } catch (error) {
  //       console.error("Error parsing cart items from localStorage:", error);
  //     }
  //   }
  //   setIsInitialized(true);
  // }, []);

  // useEffect(() => {
  //   if (isInitialized) {
  //     localStorage.setItem("furniro-cart-items", JSON.stringify(cartItems));
  //   }
  // }, [cartItems, isInitialized]);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const data = await fetchCartItems();

        setCartItems(data);
      } catch (error) {
        console.error("Failed to fetch Cart items", error);
      }
    }
    getCartItems();
  }, []);

  const addToCart = async (furniture: Product) => {

    if (!furniture) return;

    const previousItems = cartItems;

    const existingItem = cartItems?.find((item) => item.product_id === furniture.id);

    if (existingItem) {
      if (!furniture) return;
      setCartItems((prev) => prev!.map((item) => item.product_id === furniture.id ? { ...item, quantity: item.quantity + 1 } : item))
    } else {
      const optimisticItem: CartItem = {
        id: Math.random(),
        cart_id: -1,
        product_id: furniture.id,
        quantity: 1,
        product: furniture
      }

      setCartItems((prev)=> (prev ? [...prev, optimisticItem]: [optimisticItem]));
    }

    try {
      await addItemToCart(furniture.id);
      const data = await fetchCartItems();
      setCartItems(data);
    } catch (error) {
      setCartItems(previousItems);
      console.error("Failed to add item to cart", error);
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      if (!cartItems) return;
      await removeItemFromCart(itemId);
      const data = await fetchCartItems();
      setCartItems(data);
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  // const updateQuantity = (furnitureId: number, quantity: number) => {
  //   if (quantity <= 0) {
  //     removeFromCart(furnitureId);
  //     return;
  //   }

  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.furniture.id === furnitureId ? { ...item, quantity } : item
  //     )
  //   );
  // };

  // const clearCart = () => {
  //   setCartItems([]);
  // };

  // const getTotalPrice = () => {
  //   return cartItems.reduce((total, item) => {
  //     const price = item.furniture.compare_at_price || item.furniture.price;
  //     return total + price * item.quantity;
  //   }, 0);
  // };

  // const getItemCount = () => {
  //   return cartItems.reduce((total, item) => total + item.quantity, 0);
  // };

  const getUniqueItemCount = () => {
    return cartItems?.length ?? 0;
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    // updateQuantity,
    // clearCart,
    // getTotalPrice,
    // getItemCount,
    getUniqueItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
