"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { zoomIn } from "./animations/motion";
import { NavDisplay } from "./NavDisplay";
import { AiFillDelete } from "react-icons/ai";
import { Services } from "./Services";
import { Footer } from "./Footer";

interface CartPageProps {
  pathSegments: string[];
}

export function Cart({ pathSegments }: CartPageProps) {
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

      <div className="grid grid-cols-1 w-full lg:grid-cols-[2fr_1fr] gap-[30px] mt-[72px] max-w-[1440px] mx-auto px-4 lg:px-12">
        <div>
          <ul className="bg-[#F9F1E7] px-6 lg:px-[142px] py-4 flex items-center gap-4 lg:gap-[114px] justify-around font-medium texy-base overflow-x-scroll">
            <li>Product</li>
            <li>Price</li>
            <li>Quantity</li>
            <li>Subtotal</li>
          </ul>

          <div className="flex items-center gap-4 lg:gap-[114px] justify-around mt-[55px] overflow-x-scroll">
            <div className="flex items-center gap-8">
              <div className="w-[108px] h-[105px] rounded-lg overflow-hidden">
                <Image
                  src="/images/furniro_furniture-setup-3.webp"
                  alt="Furniture Image"
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
              </div>
              <span className="text-[#9F9F9F] text-base font-normal text-nowrap">
                Asgaard Sofa
              </span>
            </div>
            <p className="text-[#9F9F9F] text-base font-normal">₦30,000</p>
            <p className="p-3 rounded-[5px] border text-base font-normal">1</p>
            <p>₦30,000</p>
            <AiFillDelete
              className="text-[#B88E2F] text-base font-normal"
              size={40}
            />
          </div>
        </div>

        <div className="w-full h-[390px] bg-[#F9F1E7] flex flex-col">
          <h2 className="font-semibold lg:text-[32px] text-2xl text-center mt-[15px]">
            Cart Totals
          </h2>
          <div className="mt-[61px] px-[75px] space-y-[31px] mb-[42px]">
            <p className="w-full flex items-center justify-between text-base">
              <span className="font-medium">Subtotal</span>
              <span className="font-normal">₦30,000</span>
            </p>
            <p className="w-full flex items-center justify-between font-medium">
              <span className="text-base">Total</span>
              <span className="text-xl text-[#B88E2F]">₦30,000</span>
            </p>
          </div>
          <div className="w-full flex items-center justify-center">
            <button className="py-4 px-18 border border-black rounded-[15px] font-normal text-xl hover:opacity-85 cursor-pointer">
              Checkout
            </button>
          </div>
        </div>
      </div>

      <div className="mt-[85px] w-full mb-2">
        <Services />
      </div>

      <Footer />
    </div>
  );
}
