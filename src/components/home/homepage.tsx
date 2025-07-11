"use client";

import { motion } from "framer-motion";
import { zoomIn, fadeInUp, staggerChildren } from "../animations/motion";
import Image from "next/image";
import { FetchFurnitureDetails } from "@/api/FetchFurnitureDetails";
import { useState, useEffect } from "react";
import { FurnitureCard } from "../FurnitureCard";
import { FurnitureDetails } from "@/types/type";
import { SkeletonLoader } from "../animations/SkeletonLoader";

const categories = ["Dining", "Living", "Bedroom"];

export function HomePage() {
  const [furnitureDetails, setFurnitureDetails] = useState<FurnitureDetails[]>(
    []
  );

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getFurnitureDetails = async () => {
      const { data, error } = await FetchFurnitureDetails();

      if (error) {
        console.log(error);
      }

      if (data) {
        console.log(data);
        setFurnitureDetails(data);
        setLoading(false);
      }
    };

    getFurnitureDetails();
  }, []);

  return (
    <div className="w-full">
      <div className='bg-[url("/images/furniro_hero-bg.webp")] h-[700px] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center md:justify-end md:pr-8 px-3 md:px-0'>
        <div className="w-full max-w-[1440px] mx-auto flex justify-end">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={zoomIn}
            className="bg-[#FFF3E3] rounded-md p-6 flex flex-col gap-4 max-w-[543px]"
          >
            <p className="flex flex-col gap-1">
              <span className="font-semibold tracking-[0.5rem]">
                New Arrival
              </span>
              <span className="font-bold text-3xl lg:text-5xl text-[#B88E2F]">
                Discover Our New Collection
              </span>
            </p>
            <p className="font-medium lg:text-lg text-base">
              Explore our curated collection of furniture designed to elevate
              your living spaces with style and comfort.
            </p>
            <div className="w-full">
              <button className="bg-[#B88E2F] text-white font-semibold py-3 px-9 mt-8 cursor-pointer hover:opacity-85">
                BUY NOW
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="my-[56.47px] w-full px-4 space-y-[62px]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="text-center space-y-1"
        >
          <motion.h2
            variants={fadeInUp}
            className="lg:text-[32px] font-bold text-2xl"
          >
            Browse The Range
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base lg:text-2xl font-normal text-[#666666]"
          >
            Discover a variety of furniture styles to suit every room and taste.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4"
        >
          <div className="flex gap-5 justify-start max-w-[1440px] mx-auto lg:justify-center">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex-shrink-0 w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] max-w-[300px] snap-center space-y-[30px]"
              >
                <Image
                  src={`/images/furniro_${category.toLowerCase()}-illustration.webp`}
                  alt={`${category} category image`}
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover rounded-lg cursor-grab"
                />
                <p className="text-center font-semibold lg:text-2xl text-lg">
                  {category}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-center flex-col gap-8">
        <h2 className="font-bold lg;text-[40px] text-2xl">Our Products</h2>
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full px-4 items-center justify-center max-w-[1440px] mx-auto gap-8 min-h-[50vh]">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        )}
        {furnitureDetails && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:grid-cols-4 w-full px-4 items-center justify-center max-w-[1440px] mx-auto"
          >
            {furnitureDetails.map((furniture) => (
              <motion.div key={furniture.id} variants={fadeInUp}>
                <FurnitureCard furniture={furniture} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
