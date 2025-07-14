"use client";

import { NavDisplay } from "@/components/NavDisplay";
import { motion } from "framer-motion";
import { zoomIn } from "../animations/motion";

interface ShopHomepageProps {
  pathSegments: string[];
}

export function ShopHomepage({ pathSegments }: ShopHomepageProps) {
  return (
    <div className="w-full">
      <header
        className="w-full bg-cover bg-center bg-no-repeat h-[316px] hidden lg:block"
        style={{ backgroundImage: "url('/images/furniro_shop-hero-bg.svg')" }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={zoomIn}
          className="flex flex-col gap-2 w-full h-full justify-center items-center"
        >
          <h1 className="font-medium text-5xl capitalize">
            {pathSegments[pathSegments.length - 1] || "Shop"}
          </h1>
          <NavDisplay pathSegments={pathSegments} />
        </motion.div>
      </header>

      <header className="lg:hidden">
        
      </header>
    </div>
  );
}
