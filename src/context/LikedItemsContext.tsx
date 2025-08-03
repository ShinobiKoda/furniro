"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface LikedItemsContextProps {
  likedItems: Set<string>;
  toggleLike: (id: string) => void;
}

const LikedItemsContext = createContext<LikedItemsContextProps | undefined>(
  undefined
);

export const LikedItemsProvider = ({ children }: { children: ReactNode }) => {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [isInitialized, setIsInitialized] = useState(false);

  // Load liked items from localStorage on component mount
  useEffect(() => {
    const savedLikedItems = localStorage.getItem("furniro-liked-items");
    if (savedLikedItems) {
      try {
        const parsedItems = JSON.parse(savedLikedItems);
        setLikedItems(new Set(parsedItems));
      } catch (error) {
        console.error("Error parsing liked items from localStorage:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save liked items to localStorage whenever likedItems changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(
        "furniro-liked-items",
        JSON.stringify(Array.from(likedItems))
      );
    }
  }, [likedItems, isInitialized]);

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
