"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../animations/motion";

export function HomePage() {
  return (
    <div className="w-full max-w-[1440px] mx-auto">
      {/* Hero Section */}
      <div className='bg-[url("/images/furniro_hero-bg.webp")] h-[700px] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center md:justify-end md:pr-8 px-3 md:px-0'>
        <motion.div
          className="bg-[#FFF3E3] rounded-md p-6 flex flex-col gap-4 max-w-[543px]"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <p className="flex flex-col gap-1">
            <span className="font-semibold tracking-[0.5rem]">New Arrival</span>
            <span className="font-bold text-5xl text-[#B88E2F]">
              Discover Our New Collection
            </span>
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa in,
            iusto animi odit ducimus saepe eveniet doloremque.
          </p>
          <div className="w-full">
            <button className="bg-[#B88E2F] text-white font-semibold py-3 px-9 mt-8 cursor-pointer hover:opacity-85">
              BUY NOW
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
