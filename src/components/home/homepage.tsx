"use client";

import { motion } from "framer-motion";
import { zoomIn } from "../animations/motion";
import Image from "next/image";

const categories = ["Dining", "Living", "Bedroom"];

export function HomePage() {
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
            <span className="font-bold text-3xl lg:text-5xl text-[#B88E2F]">
              Discover Our New Collection
            </span>
          </p>
          <p className="font-medium lg:text-lg text-base">
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

      <div className="mt-[56.47px] w-full px-4 space-y-[62px]">
        <div className="text-center space-y-1">
          <h2 className="lg:text-[32px] font-bold text-2xl">
            Browse The Range
          </h2>
          <p className="text-base lg:text-2xl font-normal">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
        </div>

        <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 py-6">
          <div className="flex gap-5 justify-center max-w-[1440px] mx-auto">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] max-w-[300px] snap-center space-y-2"
              >
                <Image
                  src={`/images/furniro_${category.toLowerCase()}-illustration.webp`}
                  alt={`${category} category image`}
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover rounded-lg"
                />
                <p className="text-center">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
