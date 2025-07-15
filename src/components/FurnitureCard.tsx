"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FurnitureProps } from "@/types/type";
import { Heart } from "lucide-react";
import { CiShare2 } from "react-icons/ci";
import { BsArrowLeftRight } from "react-icons/bs";

export function FurnitureCard({ furniture }: { furniture: FurnitureProps }) {
  return (
    <div className="group flex flex-col gap-3 w-full bg-[#F4F5F7] relative max-w-sm mx-auto">
      <div className="w-full max-w-sm min-h-[301px] relative overflow-hidden">
        <Image
          src={furniture.image_url}
          alt={furniture.name}
          width={300}
          height={200}
          className="w-full max-h-[301px]"
        />
        {furniture.discount_percent && (
          <span className="absolute top-4 right-4 h-12 w-12 rounded-full bg-red-400 text-white flex items-center justify-center font-medium text-base">
            -{furniture.discount_percent}%
          </span>
        )}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-12 p-4 *:cursor-pointer">
          <motion.button
            whileTap={{ scale: 0.85 }}
            className="bg-white px-6 py-2 shadow-md hover:bg-gray-200 font-semibold text-base text-[#B88E2F]"
          >
            Add to Cart
          </motion.button>
          <div className="flex gap-2 *:cursor-pointer *:hover:opacity-80">
            <button className="text-white font-semibold text-base flex items-center gap-2">
              <CiShare2 size={22} /> Share
            </button>
            <button className="text-white font-semibold text-base flex items-center gap-2">
              <BsArrowLeftRight size={20}/> Compare
            </button>
            <button className="text-white font-semibold text-base flex items-center gap-2">
              <Heart /> Like
            </button>
          </div>
        </div>
        {/* End Hover Overlay */}
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
  );
}
