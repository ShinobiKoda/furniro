"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FurnitureProps } from "@/types/type";
import { Heart } from "lucide-react";
import { CiShare2 } from "react-icons/ci";
import { BsArrowLeftRight } from "react-icons/bs";
import { useLikedItems } from "@/context/LikedItemsContext";
import { IoBagAddOutline } from "react-icons/io5";
import { useState } from "react";

export function FurnitureCard({ furniture }: { furniture: FurnitureProps }) {
  const { likedItems, toggleLike } = useLikedItems();
  const [imageError, setImageError] = useState(false);

  const isLiked = likedItems.has(furniture.id.toString());

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(furniture.id.toString());
  };

  return (
    <Link href={`/furniture/${furniture.id}`}>
      <div className="group flex flex-col gap-3 w-full bg-[#F4F5F7] relative max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div className="w-full max-w-sm min-h-[301px] relative overflow-hidden">
          {!imageError ? (
            <Image
              src={furniture.image_url}
              alt={furniture.name}
              width={300}
              height={200}
              className="w-full max-h-[301px] object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-[301px] bg-gray-300 flex items-center justify-center">
              <IoBagAddOutline size={80} className="text-gray-500" />
            </div>
          )}
          {furniture.discount_percent && (
            <span className="absolute top-4 right-4 h-12 w-12 rounded-full bg-red-400 text-white flex items-center justify-center font-medium text-base z-10">
              -{furniture.discount_percent}%
            </span>
          )}
          {furniture.new && (
            <span className="absolute top-4 left-4 h-12 w-12 rounded-full bg-[#2EC1AC] text-white flex items-center justify-center font-medium text-base z-10">
              New!
            </span>
          )}

          <div className="w-full px-4 py-3 border-t border-gray-200">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-3 *:hover:cursor-pointer">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full border transition-colors duration-200 ${
                    isLiked
                      ? "bg-red-50 border-red-200 text-red-500"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                  onClick={handleLikeToggle}
                >
                  <Heart
                    size={18}
                    className={`${isLiked ? "fill-red-500" : ""}`}
                  />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                >
                  <CiShare2 size={18} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                >
                  <BsArrowLeftRight size={16} />
                </motion.button>
              </div>
            </div>
          </div>

          <div className="w-full px-4 py-6">
            <p className="flex flex-col">
              <span className="font-semibold lg:text-2xl text-lg text-[#3A3A3A]">
                {furniture.name}
              </span>
              <span className="font-medium text-base text-[#898989]">
                {furniture.description}
              </span>
            </p>
            {furniture.discount_price ? (
              <p className="flex items-center justify-between">
                <span className="font-semibold lg:text-xl text-base text-[#3A3A3A]">
                  ₦{furniture.discount_price.toLocaleString()}
                </span>

                <span className="font-normal text-base text-[#B0B0B0] line-through">
                  ₦{furniture.price.toLocaleString()}
                </span>
              </p>
            ) : (
              <p className="font-semibold lg:text-xl text-base text-[#3A3A3A]">
                ₦{furniture.price.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
