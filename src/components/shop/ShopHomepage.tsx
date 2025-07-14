"use client";

import { NavDisplay } from "@/components/NavDisplay";
import { motion } from "framer-motion";
import { zoomIn, fadeInUp, staggerChildren } from "../animations/motion";
import { FilterIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { FetchFurnitures } from "@/api/FetchFurnitureDetails";
import { FurnitureCard } from "../FurnitureCard";
import { FurnitureProps } from "@/types/type";
import { SkeletonLoader } from "../animations/SkeletonLoader";

interface ShopHomepageProps {
  pathSegments: string[];
}

export function ShopHomepage({ pathSegments }: ShopHomepageProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [furnitureDetails, setFurnitureDetails] = useState<
    FurnitureProps[] | null
  >(null);

  useEffect(() => {
    const getFurnitureDetails = async () => {
      const { data, error } = await FetchFurnitures();

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
      <header
        className="w-full bg-cover bg-center bg-no-repeat h-[316px]"
        style={{ backgroundImage: "url('/images/furniro_shop-hero-bg.svg')" }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={zoomIn}
          className="flex flex-col gap-2 w-full h-full justify-center items-center"
        >
          <h1 className="font-medium lg:text-5xl text-3xl capitalize">
            {pathSegments[pathSegments.length - 1] || "Shop"}
          </h1>
          <NavDisplay pathSegments={pathSegments} />
        </motion.div>
      </header>

      <div className="bg-[#F9F1E7] w-full flex items-center justify-between p-4 lg:px-12">
        <div className="flex items-center gap-4">
          <p className="flex items-center gap-3">
            <FilterIcon />
            <span className="font-normal lg:text-xl text-lg">Filter</span>
          </p>
          <div className="w-4 h-full bg-[#9F9F9F]"></div>
          <p className="hidden lg:block font-regular text-base">
            Showing <span>1-16</span> of <span>32</span> results
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex font-normal text-xl lg:items-center lg:gap-2">
            <p>Show</p>
            <input type="number" className="w-[55px] h-[55px] bg-white p-2" placeholder="16"/>
          </div>
          <div className="font-normal lg:text-xl text-lg flex items-center gap-2">
            <p>Sort by</p>
            <select name="" id="" className="bg-white p-3">
              <option value="default">Default</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-[46px] w-full">
        <div className="flex items-center justify-center flex-col gap-8 mb-[69px]">
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
              className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:grid-cols-4 w-full px-4 lg:px-12 items-center justify-center max-w-[1440px] mx-auto"
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
    </div>
  );
}
