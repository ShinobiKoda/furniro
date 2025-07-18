"use client";

import Image from "next/image";
import { User, Search, Heart } from "lucide-react";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import {
  fadeInUp,
  fadeIn,
  slideInFromRight,
  staggerChildren,
} from "../animations/motion";
import { useLikedItems } from "@/context/LikedItemsContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const { likedItems } = useLikedItems();

  return (
    <nav className="w-screen fixed top-0 left-0 bg-white z-50">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[1440px] mx-auto flex items-center justify-between p-4 lg:px-12"
      >
        <div className="flex items-center gap-2">
          <Image
            src="/images/furniro_logo.webp"
            alt="Logo"
            width={45}
            height={40}
          />
          <h1
            className={`font-bold text-2xl lg:text-[34px] ${montserrat.className}`}
          >
            Furniro
          </h1>
        </div>

        <div
          className={`w-7 h-6 flex flex-col lg:hidden gap-[5px] cursor-pointer hover:opacity-85 relative right-0 top-0 z-60 *:rounded-md ${
            isSidebarOpen ? "rotate-90" : ""
          }`}
          onClick={toggleSidebar}
        >
          <div
            className={`w-full h-1 bg-black transition-transform duration-100 ease-in-out ${
              isSidebarOpen ? "rotate-45 translate-y-[8px]" : ""
            }`}
          ></div>
          <div
            className={`w-full h-1 bg-black transition-opacity duration-100 ease-in-out ${
              isSidebarOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`w-full h-1 bg-black transition-transform duration-100 ease-in-out ${
              isSidebarOpen ? "-rotate-45 -translate-y-[9px]" : ""
            }`}
          ></div>
        </div>

        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 backdrop-blur-[2px] bg-white/20 z-40"
            onClick={closeSidebar}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          ></motion.div>
        )}

        <motion.div
          className={`fixed top-0 right-0 h-full w-[300px] bg-white p-8 z-50 *:hover:opacity-85 shadow-md rounded-md lg:hidden`}
          initial="hidden"
          animate={isSidebarOpen ? "visible" : "hidden"}
          variants={slideInFromRight}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.ul
            className="flex flex-col gap-8 mt-10"
            variants={staggerChildren}
            initial="hidden"
            animate={isSidebarOpen ? "visible" : "hidden"}
          >
            <motion.li variants={fadeInUp}>
              <Link href="/home" onClick={closeSidebar}>
                Home
              </Link>
            </motion.li>
            <motion.li variants={fadeInUp}>
              <Link href="/shop" onClick={closeSidebar}>
                Shop
              </Link>
            </motion.li>
            <motion.li variants={fadeInUp}>
              <Link href="/about" onClick={closeSidebar}>
                About
              </Link>
            </motion.li>
            <motion.li variants={fadeInUp}>
              <Link href="/contact" onClick={closeSidebar}>
                Contact
              </Link>
            </motion.li>
          </motion.ul>
        </motion.div>

        <motion.ul
          className="hidden lg:flex items-center gap-[4.7rem] font-medium text-base"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          <motion.li variants={fadeInUp}>
            <Link href="/home">Home</Link>
          </motion.li>
          <motion.li variants={fadeInUp}>
            <Link href="/shop">Shop</Link>
          </motion.li>
          <motion.li variants={fadeInUp}>
            <Link href="/about">About</Link>
          </motion.li>
          <motion.li variants={fadeInUp}>
            <Link href="/contact">Contact</Link>
          </motion.li>
        </motion.ul>

        <motion.div
          className="hidden lg:flex items-center gap-8 *:hover:opacity-80 cursor-pointer"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <Link href="/blog">
              <User />
            </Link>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Search />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <IoCartOutline className="text-2xl" />
          </motion.div>
          <motion.div variants={fadeInUp} className="relative">
            <Heart className="text-2xl" />
            {likedItems.size > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {likedItems.size}
              </span>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </nav>
  );
}
