"use client";

import Image from "next/image";
import { User, Search } from "lucide-react";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeIn,
  slideInFromRight,
  staggerChildren,
} from "../animations/motion";

export function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <motion.nav
      className="w-full p-4 flex items-center justify-between relative max-w-[1440px] mx-auto"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2">
        <Image
          src="/images/furniro_logo.webp"
          alt="Logo"
          width={45}
          height={40}
        />
        <h1 className="font-bold text-3xl">FURNIRO</h1>
      </div>

      <div
        className={`w-7 h-6 flex flex-col md:hidden gap-[5px] cursor-pointer hover:opacity-85 relative right-0 top-0 z-60 *:rounded-md ${
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
        className={`fixed top-0 right-0 h-full w-[300px] bg-white p-8 z-50 *:hover:opacity-85 shadow-md rounded-md md:hidden`}
        initial="hidden"
        animate={isSidebarOpen ? "visible" : "hidden"}
        variants={slideInFromRight}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.ul
          className="flex flex-col gap-8 mt-10"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
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
        className="hidden md:flex items-center gap-[4.7rem] font-medium text-lg"
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
        className="hidden md:flex items-center gap-8 *:hover:opacity-80 cursor-pointer"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeInUp}>
          <User />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Search />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <FaCartShopping className="text-2xl" />
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}
