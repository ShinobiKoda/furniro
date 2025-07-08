"use client";

import React from "react";
import { motion } from "framer-motion";
import { zoomIn } from "../animations/motion";
import { useEffect, useState } from "react";
import { FetchFurnitureDetails } from "../../api/FetchFurnitureDetails";
import { FurnitureDetails } from "@/types/type";

export function HomePage() {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [furniture, setFurniture] = useState<FurnitureDetails[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFurniture = async () => {
      const { data, error } = await FetchFurnitureDetails();

      if (error) {
        setFetchError(error);
        setFurniture(null);
        console.log(error);
        setLoading(true);
      }

      if (data) {
        setFurniture(data);
        setLoading(false);
        setFetchError(null);
        console.log(data);
      }
    };
    fetchFurniture();
  }, []);

  return (
    <div className="w-full max-w-[1440px] mx-auto">
      <div className='bg-[url("/images/furniro_hero-bg.webp")] h-[700px] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center md:justify-end md:pr-8 px-3 md:px-0'>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={zoomIn}
          className="bg-[#FFF3E3] rounded-md p-6 flex flex-col gap-4 max-w-[543px]"
        >
          <p className="flex flex-col gap-1">
            <span className="font-semibold tracking-[0.5rem]">New Arrival</span>
            <span className="font-bold text-5xl text-[#B88E2F]">
              Discover Our New Collection
            </span>
          </p>
          <p>
            Explore our curated collection of furniture designed to elevate your
            living spaces with style and comfort.
          </p>
          <div className="w-full">
            <button className="bg-[#B88E2F] text-white font-semibold py-3 px-9 mt-8 cursor-pointer hover:opacity-85">
              BUY NOW
            </button>
          </div>
        </motion.div>
      </div>
      {loading && <p>Loading....</p>}
      {fetchError && <p>Some error: {fetchError}</p>}
      {furniture &&
        furniture?.map((item) => <p key={item.id}>Title: {item.title}</p>)}
    </div>
  );
}
