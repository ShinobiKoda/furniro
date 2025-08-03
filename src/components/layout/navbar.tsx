"use client";

import Image from "next/image";
import { User, Search, Heart, Home, Store, Info, Mail } from "lucide-react";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Montserrat } from "next/font/google";
import {
  fadeInUp,
  fadeIn,
  slideInFromRight,
  staggerChildren,
} from "../animations/motion";
import { useLikedItems } from "@/context/LikedItemsContext";
import { useCart } from "@/context/CartContext";
import { CartModal } from "../CartModal";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const { likedItems } = useLikedItems();
  const { getUniqueItemCount } = useCart();

  return (
    <nav className="w-screen fixed top-0 left-0 bg-white z-50">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
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
            <Link href="/home">Furniro</Link>
          </h1>
        </div>

        <div
          className={`w-7 h-6 flex-col lg:hidden gap-[5px] cursor-pointer hover:opacity-85 relative right-0 top-0 z-60 *:rounded-md ${
            isSidebarOpen ? "rotate-90" : ""
          } ${isCartOpen ? "hidden" : "flex"}`}
          onClick={toggleSidebar}
        >
          {/* Cart count badge on hamburger */}
          {getUniqueItemCount() > 0 && (
            <span
              className={`absolute -top-2 -right-2 bg-[#B88E2F] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full z-10 transition-transform duration-100 ease-in-out ${
                isSidebarOpen ? "-rotate-90" : ""
              }`}
            >
              {getUniqueItemCount()}
            </span>
          )}
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
          className={`fixed top-0 right-0 h-full w-[300px] bg-white p-8 z-50 shadow-2xl rounded-l-2xl lg:hidden`}
          initial="hidden"
          animate={isSidebarOpen ? "visible" : "hidden"}
          variants={slideInFromRight}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            className="flex items-center justify-center mb-8"
            variants={fadeInUp}
            initial="hidden"
            animate={isSidebarOpen ? "visible" : "hidden"}
          >
            <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          </motion.div>

          <motion.div
            className="mb-8"
            variants={staggerChildren}
            initial="hidden"
            animate={isSidebarOpen ? "visible" : "hidden"}
          >
            <motion.h3
              className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4"
              variants={fadeInUp}
            >
              Navigation
            </motion.h3>
            <motion.ul className="space-y-4">
              <motion.li variants={fadeInUp}>
                <Link
                  href="/home"
                  onClick={closeSidebar}
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 hover:text-[#B88E2F] rounded-lg transition-all duration-200 group"
                >
                  <Home className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span>Home</span>
                  <span className="w-2 h-2 bg-[#B88E2F] rounded-full ml-auto opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>
              </motion.li>
              <motion.li variants={fadeInUp}>
                <Link
                  href="/shop"
                  onClick={closeSidebar}
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 hover:text-[#B88E2F] rounded-lg transition-all duration-200 group"
                >
                  <Store className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span>Shop</span>
                  <span className="w-2 h-2 bg-[#B88E2F] rounded-full ml-auto opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>
              </motion.li>
              <motion.li variants={fadeInUp}>
                <Link
                  href="/about"
                  onClick={closeSidebar}
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 hover:text-[#B88E2F] rounded-lg transition-all duration-200 group"
                >
                  <Info className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span>About</span>
                  <span className="w-2 h-2 bg-[#B88E2F] rounded-full ml-auto opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>
              </motion.li>
              <motion.li variants={fadeInUp}>
                <Link
                  href="/contact"
                  onClick={closeSidebar}
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 hover:text-[#B88E2F] rounded-lg transition-all duration-200 group"
                >
                  <Mail className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span>Contact</span>
                  <span className="w-2 h-2 bg-[#B88E2F] rounded-full ml-auto opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>

          <motion.hr
            className="border-gray-200 mb-6"
            variants={fadeInUp}
            initial="hidden"
            animate={isSidebarOpen ? "visible" : "hidden"}
          />

          <motion.div
            className="space-y-4"
            variants={staggerChildren}
            initial="hidden"
            animate={isSidebarOpen ? "visible" : "hidden"}
          >
            <motion.h3
              className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4"
              variants={fadeInUp}
            >
              Actions
            </motion.h3>

            <motion.button
              variants={fadeInUp}
              className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-50 hover:text-[#B88E2F] rounded-lg transition-all duration-200 group"
            >
              <Search className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              <span>Search</span>
            </motion.button>

            <motion.div variants={fadeInUp}>
              <Link
                href="/blog"
                onClick={closeSidebar}
                className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-50 hover:text-[#B88E2F] rounded-lg transition-all duration-200 group"
              >
                <User className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                <span>Blog</span>
              </Link>
            </motion.div>

            <motion.button
              variants={fadeInUp}
              onClick={() => {
                toggleCart();
                closeSidebar();
              }}
              className="flex items-center justify-between w-full p-3 text-gray-700 hover:bg-gray-50 hover:text-[#B88E2F] rounded-lg transition-all duration-200 group"
            >
              <div className="flex items-center">
                <IoCartOutline className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                <span>Cart</span>
              </div>
              {getUniqueItemCount() > 0 && (
                <span className="bg-[#B88E2F] text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                  {getUniqueItemCount()}
                </span>
              )}
            </motion.button>

            <motion.button
              variants={fadeInUp}
              className="flex items-center justify-between w-full p-3 text-gray-700 hover:bg-gray-50 hover:text-[#B88E2F] rounded-lg transition-all duration-200 group"
            >
              <div className="flex items-center">
                <Heart className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                <span>Wishlist</span>
              </div>
              {likedItems.size > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                  {likedItems.size}
                </span>
              )}
            </motion.button>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-8 right-8"
            variants={fadeInUp}
            initial="hidden"
            animate={isSidebarOpen ? "visible" : "hidden"}
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Image
                  src="/images/furniro_logo.webp"
                  alt="Logo"
                  width={30}
                  height={25}
                />
                <span className="ml-2 font-semibold text-[#B88E2F]">
                  Furniro
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Quality furniture for your home
              </p>
            </div>
          </motion.div>
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
          <motion.div
            variants={fadeInUp}
            onClick={toggleCart}
            className="relative"
          >
            <IoCartOutline className="text-2xl" />
            {getUniqueItemCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#B88E2F] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {getUniqueItemCount()}
              </span>
            )}
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

        <AnimatePresence>
          {isCartOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={closeCart}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="fixed top-0 right-0 z-50"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <CartModal onClose={closeCart} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}
