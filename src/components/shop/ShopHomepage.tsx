"use client";

import { NavDisplay } from "@/components/NavDisplay";
import { motion } from "framer-motion";
import { zoomIn, fadeInUp, staggerChildren } from "../animations/motion";
import { BsSliders, BsGridFill, BsViewList } from "react-icons/bs";
import { Services } from "../Services";
import { useState, useEffect, useRef } from "react";
import { FetchFurnitures } from "@/api/FetchFurnitureDetails";
import { FurnitureCard } from "../FurnitureCard";
import { FurnitureProps } from "@/types/type";
import { SkeletonLoader } from "../animations/SkeletonLoader";
import { Footer } from "../Footer";
import Image from "next/image";

interface ShopHomepageProps {
  pathSegments: string[];
}

export function ShopHomepage({ pathSegments }: ShopHomepageProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [furnitureDetails, setFurnitureDetails] = useState<
    FurnitureProps[] | null
  >(null);
  const [sortedFurnitureDetails, setSortedFurnitureDetails] = useState<
    FurnitureProps[] | null
  >(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("default");
  const itemsPerPage = 16;
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getFurnitureDetails = async () => {
      const { data, error } = await FetchFurnitures();

      if (error) {
        console.log(error);
      }

      if (data) {
        console.log(data);
        setFurnitureDetails(data);
        setSortedFurnitureDetails(data);
        setLoading(false);
      }
    };

    getFurnitureDetails();
  }, []);

  const sortFurniture = (
    data: FurnitureProps[],
    sortType: string
  ): FurnitureProps[] => {
    const sortedData = [...data];

    switch (sortType) {
      case "alphabetical":
        return sortedData.sort((a, b) => a.name.localeCompare(b.name));
      case "price-low":
        return sortedData.sort((a, b) => a.price - b.price);
      case "price-high":
        return sortedData.sort((a, b) => b.price - a.price);
      case "tag-chair":
        return sortedData.filter((item) => item.tag.toLowerCase() === "chair");
      case "tag-sofa":
        return sortedData.filter((item) => item.tag.toLowerCase() === "sofa");
      case "tag-decor":
        return sortedData.filter((item) => item.tag.toLowerCase() === "decor");
      case "tag-kitchen":
        return sortedData.filter(
          (item) => item.tag.toLowerCase() === "kitchen"
        );
      case "tag-bed":
        return sortedData.filter((item) => item.tag.toLowerCase() === "bed");
      case "tag-dresser":
        return sortedData.filter(
          (item) => item.tag.toLowerCase() === "dresser"
        );
      case "tag-stand":
        return sortedData.filter((item) => item.tag.toLowerCase() === "stand");
      case "tag-shelf":
        return sortedData.filter((item) => item.tag.toLowerCase() === "shelf");
      case "tag-tv":
        return sortedData.filter((item) => item.tag.toLowerCase() === "tv");
      case "tag-table":
        return sortedData.filter((item) => item.tag.toLowerCase() === "table");
      case "tag-shoe":
        return sortedData.filter((item) => item.tag.toLowerCase() === "shoe");
      default:
        return sortedData;
    }
  };

  const handleSortChange = (sortType: string) => {
    setSortBy(sortType);
    setCurrentPage(1); 

    if (furnitureDetails) {
      const sorted = sortFurniture(furnitureDetails, sortType);
      setSortedFurnitureDetails(sorted);
    }
  };

  useEffect(() => {
    if (furnitureDetails) {
      const sorted = sortFurniture(furnitureDetails, sortBy);
      setSortedFurnitureDetails(sorted);
    }
  }, [furnitureDetails, sortBy]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    if (productsRef.current) {
      const yOffset = -200;
      const y =
        productsRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const paginatedFurnitureDetails = sortedFurnitureDetails
    ? sortedFurnitureDetails.slice(
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
          <Image
            src="/images/furniro_path-logo.svg"
            alt="Furniro Logo"
            height={77}
            width={77}
          />
          <h1 className="font-medium lg:text-5xl text-3xl capitalize">
            {pathSegments[pathSegments.length - 1] || "Shop"}
          </h1>
          <NavDisplay pathSegments={pathSegments} />
        </motion.div>
      </header>

      <div className="bg-[#F9F1E7] w-full">
        <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between p-4 lg:px-12">
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-3">
              <BsSliders
                size={25}
                className="hover:opacity-85 cursor-pointer"
              />
              <span className="font-normal lg:text-xl text-lg">Filter</span>
            </p>
            <div className="items-center gap-4 h-full hidden lg:flex">
              <BsGridFill
                size={25}
                className="hover:opacity-85 cursor-pointer"
              />
              <BsViewList
                size={25}
                className="hover:opacity-85 cursor-pointer"
              />
              <div className="w-px h-8 bg-[#9F9F9F]"></div>
            </div>
            <p className="hidden lg:block font-regular text-base">
              Showing <span>{(currentPage - 1) * itemsPerPage + 1}</span>-
              <span>
                {Math.min(
                  currentPage * itemsPerPage,
                  sortedFurnitureDetails?.length || 0
                )}
              </span>{" "}
              of <span>{sortedFurnitureDetails?.length || 0}</span> results
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-normal lg:text-xl text-lg flex items-center gap-4">
              <p className="text-black hidden lg:block">Sort by</p>
              <div className="relative">
                <select
                  name="sort"
                  id="sort"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="appearance-none bg-white border rounded-md px-4 py-3 pr-10 font-normal text-base lg:text-lg cursor-pointer hover:border-[#B88E2F] transition-colors duration-200 min-w-[160px]"
                >
                  <option value="default">Default</option>
                  <option value="alphabetical">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <optgroup label="Filter by Category">
                    <option value="tag-chair">Chairs</option>
                    <option value="tag-sofa">Sofas</option>
                    <option value="tag-table">Tables</option>
                    <option value="tag-bed">Beds</option>
                    <option value="tag-decor">Decor</option>
                    <option value="tag-kitchen">Kitchen</option>
                    <option value="tag-dresser">Dressers</option>
                    <option value="tag-stand">Stands</option>
                    <option value="tag-shelf">Shelves</option>
                    <option value="tag-tv">TV Units</option>
                    <option value="tag-shoe">Shoe Storage</option>
                  </optgroup>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                  <svg
                    className="h-4 w-4 text-[#9F9F9F]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={productsRef} className="mt-[46px] w-full mb-[85px]">
        <div className="flex items-center justify-center flex-col gap-8 mb-[40px]">
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full px-4 items-center justify-center max-w-[1440px] mx-auto gap-8 min-h-[50vh]">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonLoader key={index} />
              ))}
            </div>
          )}
          {sortedFurnitureDetails && sortedFurnitureDetails.length > 0 && (
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
          {sortedFurnitureDetails && sortedFurnitureDetails.length === 0 && (
            <div className="flex items-center justify-center h-[300px]">
              <p className="text-xl text-[#9F9F9F] font-medium">
                No products found for this category
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {sortedFurnitureDetails &&
            sortedFurnitureDetails.length > itemsPerPage && (
              <>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[#F9F1E7] rounded disabled:opacity-50 font-light text-lg lg:text-xl cursor-pointer disabled:cursor-not-allowed hover:bg-[#B88E2F] hover:text-white transition-colors duration-200"
                >
                  Prev
                </button>
                {Array.from(
                  {
                    length: Math.ceil(
                      (sortedFurnitureDetails?.length || 0) / itemsPerPage
                    ),
                  },
                  (_, i) => i + 1
                )
                  .slice(0, 5)
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded font-normal lg:text-xl text-lg cursor-pointer hover:opacity-85 transition-colors duration-200 ${
                        currentPage === page
                          ? "bg-[#B88E2F] text-white"
                          : "bg-[#F9F1E7] hover:bg-[#B88E2F] hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(
                      (sortedFurnitureDetails?.length || 0) / itemsPerPage
                    )
                  }
                  className="px-4 py-2 bg-[#F9F1E7] rounded disabled:opacity-50 font-light text-lg lg:text-xl cursor-pointer disabled:cursor-not-allowed hover:bg-[#B88E2F] hover:text-white transition-colors duration-200"
                >
                  Next
                </button>
              </>
            )}
        </div>
      </div>

      <Services />
      <Footer />
    </div>
  );
}
