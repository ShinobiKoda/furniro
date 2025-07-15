"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LikedItemsContextProps {
  likedItems: Set<string>;
  toggleLike: (id: string) => void;
}

const LikedItemsContext = createContext<LikedItemsContextProps | undefined>(
  undefined
);

export const LikedItemsProvider = ({ children }: { children: ReactNode }) => {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedItems((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  return (
    <LikedItemsContext.Provider value={{ likedItems, toggleLike }}>
      {children}
    </LikedItemsContext.Provider>
  );
};

export const useLikedItems = () => {
  const context = useContext(LikedItemsContext);
  if (!context) {
    throw new Error("useLikedItems must be used within a LikedItemsProvider");
  }
  return context;
};
