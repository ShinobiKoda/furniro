"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  zoomIn,
  fadeInUp,
  fadeInDown,
  scaleOnHover,
  fadeIn,
  staggerChildren,
} from "./animations/motion";
import { NavDisplay } from "./NavDisplay";
import { AiFillDelete } from "react-icons/ai";
import { IoBagAddOutline } from "react-icons/io5";
import { Services } from "./Services";
import { Footer } from "./Footer";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

interface CartPageProps {
  pathSegments: string[];
}

export function Cart({ pathSegments }: CartPageProps) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } =
    useCart();
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleImageError = (itemId: number) => {
    setImageErrors((prev) => new Set(prev).add(itemId));
  };

  const handleQuantityChange = (furnitureId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(furnitureId, newQuantity);
    }
  };
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

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="grid grid-cols-1 w-full xl:grid-cols-[2fr_1fr] gap-[30px] mt-[72px] max-w-[1440px] mx-auto px-4 lg:px-12"
      >
        <motion.div variants={fadeInUp}>
          <motion.ul
            variants={fadeInDown}
            className="bg-[#F9F1E7] px-6 lg:px-[142px] py-4 flex items-center gap-4 lg:gap-[114px] justify-around font-medium text-base overflow-x-auto scrollbar-hide"
          >
            <li>Product</li>
            <li>Price</li>
            <li>Quantity</li>
            <li>Subtotal</li>
          </motion.ul>

          {cartItems.length === 0 ? (
            <motion.div
              variants={fadeInUp}
              className="text-center py-16 text-gray-500"
            >
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm">Add some furniture to get started!</p>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerChildren}
              className="space-y-6 mt-[55px]"
            >
              {cartItems.map((item) => (
                <motion.div
                  key={item.furniture.id}
                  variants={fadeInUp}
                  className="flex items-center gap-4 lg:gap-[114px] justify-around overflow-x-auto scrollbar-hide"
                >
                  <div className="flex items-center gap-8">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="w-[108px] h-[105px] rounded-lg overflow-hidden bg-[#B88E2F]/10 flex-shrink-0 relative"
                    >
                      {imageErrors.has(item.furniture.id) ? (
                        <div className="w-full h-full bg-[#B88E2F]/20 flex items-center justify-center">
                          <IoBagAddOutline className="text-[#B88E2F] text-3xl" />
                        </div>
                      ) : (
                        <Image
                          src={item.furniture.image_url}
                          alt={item.furniture.name}
                          width={108}
                          height={105}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={() => handleImageError(item.furniture.id)}
                        />
                      )}
                    </motion.div>
                    <span className="text-[#9F9F9F] text-base font-normal text-nowrap">
                      {item.furniture.name}
                    </span>
                  </div>
                  <p className="text-[#9F9F9F] text-base font-normal">
                    ₦
                    {(
                      item.furniture.discount_price || item.furniture.price
                    ).toLocaleString()}
                  </p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.furniture.id,
                        parseInt(e.target.value)
                      )
                    }
                    className="p-3 rounded-[5px] border text-base font-normal w-16 text-center"
                  />
                  <p>
                    ₦
                    {(
                      (item.furniture.discount_price || item.furniture.price) *
                      item.quantity
                    ).toLocaleString()}
                  </p>
                  <motion.div
                    variants={scaleOnHover}
                    whileHover="hover"
                    className="cursor-pointer"
                    onClick={() => removeFromCart(item.furniture.id)}
                  >
                    <AiFillDelete
                      className="text-[#B88E2F] text-base font-normal hover:text-red-500 transition-colors duration-200"
                      size={30}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          variants={fadeInDown}
          className="w-full h-[390px] bg-[#F9F1E7] flex flex-col"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-semibold lg:text-[32px] text-2xl text-center mt-[15px]"
          >
            Cart Totals
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-[61px] px-[75px] space-y-[31px] mb-[42px]"
          >
            <p className="w-full flex items-center justify-between text-base">
              <span className="font-medium">Subtotal</span>
              <span className="font-normal">
                ₦{getTotalPrice().toLocaleString()}
              </span>
            </p>
            <p className="w-full flex items-center justify-between font-medium">
              <span className="text-base">Total</span>
              <span className="text-xl text-[#B88E2F]">
                ₦{getTotalPrice().toLocaleString()}
              </span>
            </p>
          </motion.div>
          <div className="w-full flex items-center justify-center">
            <Link href="/checkout">
              <motion.button
                variants={scaleOnHover}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                className="py-4 px-18 border border-black rounded-[15px] font-normal text-xl hover:opacity-85 cursor-pointer disabled:cursor-not-allowed"
                disabled={cartItems.length === 0}
              >
                Checkout
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mt-[85px] w-full mb-2"
      >
        <Services />
      </motion.div>

      <Footer />
    </div>
  );
}
