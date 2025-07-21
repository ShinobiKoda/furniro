"use client";
import { IoBagAddOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  fadeInUp,
  staggerChildren,
  scaleOnHover,
  fadeIn,
} from "./animations/motion";

interface CartModalProps {
  onClose: () => void;
}

export function CartModal({ onClose }: CartModalProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    // Store original overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Disable scrolling
    document.body.style.overflow = "hidden";

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <motion.div
      className="bg-white top-0 right-0 w-[417px] h-screen py-6 px-6 shadow-2xl overflow-y-auto"
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Header */}
      <motion.div
        className="flex items-center justify-between w-full border-b border-gray-200 pb-6 mb-6"
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

      {/* Cart Items Container */}
      <motion.div
        className="flex flex-col gap-6 mb-8"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        {/* Cart Item 1 */}
        <motion.div
          className="flex items-center justify-between w-full gap-4"
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-[108px] h-[105px] rounded-lg overflow-hidden bg-[#B88E2F]/10 flex-shrink-0"
              variants={scaleOnHover}
              whileHover="hover"
            >
              <Image
                src="/images/furniro_furniture-setup-3.webp"
                alt="Furniture Image"
                width={108}
                height={105}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div className="flex-1 space-y-2" variants={fadeInUp}>
              <motion.h3 className="font-normal text-base" variants={fadeInUp}>
                Asgaard Sofa
              </motion.h3>
              <motion.div
                className="flex items-center gap-4 text-sm"
                variants={fadeInUp}
              >
                <span className="text-base font-light">1 x</span>
                <span className="font-medium text-[#B88E2F] text-[12px]">
                  ₦40,000
                </span>
              </motion.div>
            </motion.div>
          </div>

          <motion.button
            className="p-1 rounded-full transition-colors duration-200 flex-shrink-0"
            variants={scaleOnHover}
            whileHover="hover"
            whileTap={{ scale: 0.9 }}
          >
            <MdCancel className="text-[#9F9F9F] hover:text-red-500 text-2xl transition-colors duration-200" />
          </motion.button>
        </motion.div>

        {/* Cart Item 2 */}
        <motion.div
          className="flex items-center justify-between w-full gap-4"
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-[108px] h-[105px] rounded-lg overflow-hidden bg-[#B88E2F]/10 flex-shrink-0"
              variants={scaleOnHover}
              whileHover="hover"
            >
              <Image
                src="/images/furniro_furniture-setup-3.webp"
                alt="Furniture Image"
                width={108}
                height={105}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div className="flex-1 space-y-2" variants={fadeInUp}>
              <motion.h3 className="font-normal text-base" variants={fadeInUp}>
                Asgaard Sofa
              </motion.h3>
              <motion.div
                className="flex items-center gap-4 text-sm"
                variants={fadeInUp}
              >
                <span className="text-base font-light">1 x</span>
                <span className="font-medium text-[#B88E2F] text-[12px]">
                  ₦40,000
                </span>
              </motion.div>
            </motion.div>
          </div>

          <motion.button
            className="p-1 rounded-full transition-colors duration-200 flex-shrink-0"
            variants={scaleOnHover}
            whileHover="hover"
            whileTap={{ scale: 0.9 }}
          >
            <MdCancel className="text-[#9F9F9F] hover:text-red-500 text-2xl transition-colors duration-200" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        className="absolute bottom-0 space-y-4 w-full left-0 mb-8"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="flex items-center justify-between px-6"
          variants={fadeInUp}
        >
          <span className="font-normal text-base">Subtotal</span>
          <motion.span
            className="font-semibold text-base text-[#B88E2F]"
            variants={fadeInUp}
          >
            ₦40,000
          </motion.span>
        </motion.div>

        <motion.hr
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        />

        <motion.div
          className="w-full gap-3.5 px-6 flex items-center justify-between"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="w-full py-2 border border-black rounded-[50px] font-medium transition-all duration-200"
            onClick={onClose}
            variants={scaleOnHover}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/cart">Cart</Link>
          </motion.button>
          <motion.button
            className="w-full py-2 border border-black rounded-[50px] font-medium transition-all duration-200"
            onClick={onClose}
            variants={scaleOnHover}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/checkout">Checkout</Link>
          </motion.button>
          <motion.button
            className="w-full py-2 border border-black rounded-[50px] font-medium transition-all duration-200"
            onClick={onClose}
            variants={scaleOnHover}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            Comparison
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
