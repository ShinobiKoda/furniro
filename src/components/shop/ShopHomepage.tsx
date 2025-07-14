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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 16;

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedFurnitureDetails = furnitureDetails
    ? furnitureDetails.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

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
            <div className="w-[55px] h-[55px] bg-white flex items-center justify-center">
              <input
                type="number"
                className="border-none outline-none w-full h-full text-center"
                placeholder="16"
              />
            </div>
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
              {paginatedFurnitureDetails.map((furniture) => (
                <motion.div key={furniture.id} variants={fadeInUp}>
                  <FurnitureCard furniture={furniture} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === 3}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
