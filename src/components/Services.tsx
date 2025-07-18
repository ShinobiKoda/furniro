"use client";
import { motion } from "framer-motion";
import { GrTrophy } from "react-icons/gr";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiCustomerService2Line } from "react-icons/ri";
import { fadeInUp } from "./animations/motion";

export function Services() {
  return (
    <div className="w-full bg-[#FAF3EA]">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="w-full lg:h-[270px] max-w-[1440px] mx-auto flex flex-col justify-center gap-14 lg:flex-row lg:items-center lg:justify-between px-4 lg:px-12 py-8"
      >
        <motion.div variants={fadeInUp} className="flex items-center gap-2">
          <GrTrophy size={60} />
          <p className="flex flex-col">
            <span className="font-semibold lg:text-[25px] text-lg">
              High Quality
            </span>
            <span className="font-medium lg:text-xl text-base text-[#898989]">
              crafted from top materials
            </span>
          </p>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex items-center gap-2">
          <HiOutlineBadgeCheck size={60} />
          <p className="flex flex-col">
            <span className="font-semibold lg:text-[25px] text-lg">
              Warranty Protection
            </span>
            <span className="font-medium lg:text-xl text-base text-[#898989]">
              Over 2 years
            </span>
          </p>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex items-center gap-2">
          <LiaShippingFastSolid size={60} />
          <p className="flex flex-col">
            <span className="font-semibold lg:text-[25px] text-lg">
              Free Shipping
            </span>
            <span className="font-medium lg:text-xl text-base text-[#898989]">
              Order over 150$
            </span>
          </p>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex items-center gap-2">
          <RiCustomerService2Line size={60} />
          <p className="flex flex-col">
            <span className="font-semibold lg:text-[25px] text-lg">
              24/7 Support
            </span>
            <span className="font-medium lg:text-xl text-base text-[#898989]">
              Dedicated support
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
