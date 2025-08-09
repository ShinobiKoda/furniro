"use client";
import { IoBagAddOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  fadeInUp,
  staggerChildren,
  scaleOnHover,
  fadeIn,
} from "./animations/motion";
import { useCart } from "@/context/CartContext";

interface CartModalProps {
  onClose: () => void;
}

export function CartModal({ onClose }: CartModalProps) {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleImageError = (itemId: number) => {
    setImageErrors((prev) => new Set(prev).add(itemId));
  };

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <motion.div
      className="bg-white top-0 right-0 max-w-[417px] w-screen h-screen px-6 shadow-2xl py-4 overflow-y-auto flex flex-col z-80"
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <motion.div
        className="flex items-center justify-between w-full border-b border-gray-200 pb-6 mb-6 lg:mt-0"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex items-center gap-3" variants={fadeInUp}>
          <motion.h2 className="font-semibold text-2xl" variants={fadeInUp}>
            Shopping Cart
          </motion.h2>
        </motion.div>

        <motion.div
          variants={scaleOnHover}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
        >
          <IoBagAddOutline
            onClick={onClose}
            className="text-[#9F9F9F] text-xl cursor-pointer hover:text-[#B88E2F] transition-colors duration-200"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-col gap-6 flex-1"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        {cartItems.length === 0 ? (
          <motion.div
            variants={fadeInUp}
            className="text-center py-8 text-gray-500"
          >
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-sm">Add some furniture to get started!</p>
          </motion.div>
        ) : (
          cartItems.map((item) => (
            <motion.div
              key={item.furniture.id}
              className="flex items-center justify-between w-full gap-4"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-[108px] h-[105px] rounded-lg overflow-hidden bg-[#B88E2F]/10 flex-shrink-0 relative"
                  variants={scaleOnHover}
                  whileHover="hover"
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
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(item.furniture.id)}
                    />
                  )}
                </motion.div>

                <motion.div className="flex-1 space-y-2" variants={fadeInUp}>
                  <motion.h3
                    className="font-normal text-base"
                    variants={fadeInUp}
                  >
                    {item.furniture.name}
                  </motion.h3>
                  <motion.div
                    className="flex items-center gap-4 text-sm"
                    variants={fadeInUp}
                  >
                    <span className="text-base font-light">
                      {item.quantity} x
                    </span>
                    <span className="font-medium text-[#B88E2F] text-[12px]">
                      ₦
                      {(
                        item.furniture.discount_price || item.furniture.price
                      ).toLocaleString()}
                    </span>
                  </motion.div>
                </motion.div>
              </div>

              <motion.button
                className="p-1 rounded-full transition-colors duration-200 flex-shrink-0"
                variants={scaleOnHover}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                onClick={() => removeFromCart(item.furniture.id)}
              >
                <MdCancel className="text-[#9F9F9F] hover:text-red-500 text-2xl transition-colors duration-200 cursor-pointer" />
              </motion.button>
            </motion.div>
          ))
        )}
      </motion.div>

      <motion.hr
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="my-4"
      />

      <motion.div
        className="space-y-4 w-full mt-auto"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="flex items-center justify-between"
          variants={fadeInUp}
        >
          <span className="font-normal text-base">Subtotal</span>
          <motion.span
            className="font-semibold text-base text-[#B88E2F]"
            variants={fadeInUp}
          >
            ₦{getTotalPrice().toLocaleString()}
          </motion.span>
        </motion.div>

        <motion.div
          className="w-full gap-3.5 flex items-center justify-between *:cursor-pointer"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <Link href="/cart" className="w-full">
            <motion.button
              className="w-full py-2 border border-black rounded-[50px] font-medium transition-all duration-200 cursor-pointer"
              onClick={onClose}
              variants={scaleOnHover}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              Cart
            </motion.button>
          </Link>

          <Link href="/checkout" className="w-full">
            <motion.button
              className="w-full py-2 border border-black rounded-[50px] font-medium transition-all duration-200 cursor-pointer"
              onClick={onClose}
              variants={scaleOnHover}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              Checkout
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
