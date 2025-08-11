"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useLikedItems } from "@/context/LikedItemsContext";
import { useCart } from "@/context/CartContext";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FurnitureProps } from "@/types/type";
import { FetchFurnitureById } from "@/api/FetchFurnitureById";

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WishlistModal({ isOpen, onClose }: WishlistModalProps) {
  const { likedItems, toggleLike } = useLikedItems();
  const { addToCart, cartItems } = useCart();
  const [wishlistItems, setWishlistItems] = useState<FurnitureProps[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlistItems = useCallback(async () => {
    setLoading(true);
    const items: FurnitureProps[] = [];

    for (const itemId of Array.from(likedItems)) {
      try {
        const { data } = await FetchFurnitureById(itemId);
        if (data) {
          items.push(data);
        }
      } catch (error) {
        console.error(`Error fetching furniture with id ${itemId}:`, error);
      }
    }

    setWishlistItems(items);
    setLoading(false);
  }, [likedItems]);

  useEffect(() => {
    if (isOpen && likedItems.size > 0) {
      fetchWishlistItems();
    }
  }, [isOpen, likedItems, fetchWishlistItems]);

  const handleRemoveFromWishlist = (itemId: string) => {
    toggleLike(itemId);
  };

  const handleAddToCart = (furniture: FurnitureProps) => {
    addToCart(furniture);
  };

  const isInCart = (furnitureId: number) => {
    return cartItems.some((item) => item.furniture.id === furnitureId);
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Wishlist ({likedItems.size})
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="p-6 space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : likedItems.size === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <Heart className="w-16 h-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Your wishlist is empty
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Start adding items you love to your wishlist
                    </p>
                    <Link
                      href="/shop"
                      onClick={onClose}
                      className="bg-[#B88E2F] text-white px-6 py-3 rounded-lg hover:bg-[#A67C29] transition-colors"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="p-6 space-y-4">
                    {wishlistItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <Link
                          href={`/furniture/${item.id}`}
                          onClick={onClose}
                          className="flex-shrink-0"
                        >
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </Link>

                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/furniture/${item.id}`}
                            onClick={onClose}
                            className="block"
                          >
                            <h4 className="font-medium text-gray-900 truncate hover:text-[#B88E2F] transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-500 truncate">
                              {item.description}
                            </p>
                          </Link>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              {item.discount_price ? (
                                <>
                                  <span className="font-semibold text-[#B88E2F]">
                                    ₦{item.discount_price.toLocaleString()}
                                  </span>
                                  <span className="text-sm text-gray-500 line-through">
                                    ₦{item.price.toLocaleString()}
                                  </span>
                                </>
                              ) : (
                                <span className="font-semibold text-[#B88E2F]">
                                  ₦{item.price.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-3">
                            <button
                              onClick={() => handleAddToCart(item)}
                              disabled={isInCart(item.id)}
                              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isInCart(item.id)
                                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                  : "bg-[#B88E2F] text-white hover:bg-[#A67C29]"
                              }`}
                            >
                              <ShoppingCart className="w-4 h-4" />
                              {isInCart(item.id) ? "In Cart" : "Add to Cart"}
                            </button>

                            <button
                              onClick={() =>
                                handleRemoveFromWishlist(item.id.toString())
                              }
                              className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                              title="Remove from wishlist"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {likedItems.size > 0 && !loading && (
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex gap-3">
                    <Link
                      href="/shop"
                      onClick={onClose}
                      className="flex-1 bg-white text-[#B88E2F] border border-[#B88E2F] px-4 py-3 rounded-lg text-center font-medium hover:bg-[#B88E2F] hover:text-white transition-colors"
                    >
                      Continue Shopping
                    </Link>
                    <Link
                      href="/cart"
                      onClick={onClose}
                      className="flex-1 bg-[#B88E2F] text-white px-4 py-3 rounded-lg text-center font-medium hover:bg-[#A67C29] transition-colors flex items-center justify-center"
                    >
                      Cart
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
