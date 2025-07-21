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
  const [currentPage, setCurrentPage] = useState<number>(1);
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
        setLoading(false);
      }
    };

    getFurnitureDetails();
  }, []);

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
                  furnitureDetails?.length || 0
                )}
              </span>{" "}
              of <span>{furnitureDetails?.length || 0}</span> results
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex font-normal text-xl lg:items-center lg:gap-2">
              <p>Show</p>
              <div className="w-[55px] h-[55px] bg-white flex items-center justify-center text-center">
                <input
                  type="number"
                  className="border-none outline-none w-full h-full text-center text-[#9F9F9F] cursor-not-allowed"
                  placeholder="16"
                  min={16}
                  disabled
                />
              </div>
            </div>
            <div className="font-normal lg:text-xl text-lg flex items-center gap-2">
              <p>Sort by</p>
              <div className="px-2 py-4 bg-white">
                <select name="sort" id="sort" className="outline-none border-none  cursor-pointer w-full">
                  <option value="default">Default</option>
                  <option value="alphabetical">Name</option>
                </select>
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
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#F9F1E7] rounded disabled:opacity-50 font-light text-lg lg:text-xl cursor-pointer disabled:cursor-not-allowed"
          >
            Prev
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded font-normal lg:text-xl text-lg cursor-pointer hover:opacity-85 ${
                currentPage === page
                  ? "bg-[#B88E2F] text-white"
                  : "bg-[#F9F1E7]"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === 3}
            className="px-4 py-2 bg-[#F9F1E7] rounded disabled:opacity-50 font-light text-lg lg:text-xl cursor-pointer disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      <Services />
      <Footer />
    </div>
  );
}
