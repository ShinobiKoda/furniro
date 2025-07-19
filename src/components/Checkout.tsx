"use client";
import { motion } from "framer-motion";
import {
  zoomIn,
  fadeInUp,
  staggerChildren,
  slideInFromLeft,
  slideInFromRight,
  scaleOnHover,
  fadeIn,
} from "./animations/motion";
import Image from "next/image";

export function Checkout() {
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
            Checkout
          </h1>
        </motion.div>
      </header>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="max-w-[1440px] mx-auto mt-[98px] px-4 lg:px-12 mb-[123px] space-y-9"
      >
        <motion.h2
          variants={fadeInUp}
          className="font-semibold lg:text-4xl text-2xl"
        >
          Billing Details
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] w-full  gap-[105px]">
          <motion.form
            variants={slideInFromLeft}
            action=""
            className="space-y-9"
          >
            <motion.div
              variants={fadeInUp}
              className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-[31px]"
            >
              <div className="flex flex-col gap-[22px] flex-1">
                <label htmlFor="first-name" className="font-medium text-base">
                  First Name
                </label>
                <motion.input
                  variants={scaleOnHover}
                  whileHover="hover"
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  className="border border-[#9F9F9F] rounded-[10px] px-2 py-4 transition-all duration-200"
                  id="first-name"
                />
              </div>
              <div className="flex flex-col gap-[22px] flex-1">
                <label htmlFor="last-name" className="font-medium text-base">
                  Last Name
                </label>
                <motion.input
                  variants={scaleOnHover}
                  whileHover="hover"
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  className="border border-[#9F9F9F] rounded-[10px] px-2 py-4 transition-all duration-200"
                  id="last-name"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-[22px]"
            >
              <label htmlFor="company-name" className="font-medium text-base">
                Company Name
              </label>
              <motion.input
                variants={scaleOnHover}
                whileHover="hover"
                whileFocus={{ scale: 1.02 }}
                type="text"
                id="company-name"
                className="border border-[#9F9F9F] rounded-[10px] px-2 py-4 transition-all duration-200"
              />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-[22px]"
            >
              <label htmlFor="country_region" className="font-medium text-base">
                Country/Region
              </label>
              <motion.div
                variants={scaleOnHover}
                whileHover="hover"
                className="border border-[#9F9F9F] rounded-[10px] px-2 py-4 transition-all duration-200"
              >
                <select
                  name="country_region"
                  id="country_region"
                  className="w-full outline-0 border-0 cursor-pointer bg-transparent"
                >
                  <option value="nigeria">Nigeria</option>
                  <option value="USA">United States of America</option>
                  <option value="germany">Germany</option>
                </select>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-[22px]"
            >
              <label htmlFor="street-address" className="font-medium text-base">
                Street Address
              </label>
              <motion.input
                variants={scaleOnHover}
                whileHover="hover"
                whileFocus={{ scale: 1.02 }}
                type="text"
                id="street-address"
                className="border border-[#9F9F9F] rounded-[10px] px-2 py-4 transition-all duration-200"
              />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-[22px]"
            >
              <label htmlFor="town_city" className="font-medium text-base">
                Town/City
              </label>
              <motion.input
                variants={scaleOnHover}
                whileHover="hover"
                whileFocus={{ scale: 1.02 }}
                type="text"
                id="town_city"
                className="border border-[#9F9F9F] rounded-[10px] px-2 py-4 transition-all duration-200"
              />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-[22px]"
            >
              <label htmlFor="" className="font-medium text-base">
                Province
              </label>
              <motion.div
                variants={scaleOnHover}
                whileHover="hover"
                className="border border-[#9F9F9F] rounded-[10px] px-2 py-4 transition-all duration-200"
              >
                <select
                  name="province"
                  id="province"
                  className="w-full outline-0 border-0 bg-transparent"
                >
                  <option value="">Default</option>
                  <option value="">Nigeria</option>
                  <option value="">Nigeria</option>
                  <option value="">Nigeria</option>
                  <option value="">Nigeria</option>
                </select>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-[22px]"
            >
              <label htmlFor="zip-code" className="font-medium text-base">
                Zip Code
              </label>
              <motion.input
                variants={scaleOnHover}
                whileHover="hover"
                whileFocus={{ scale: 1.02 }}
                type="text"
                id="zip-code"
                className="border border-[#9F9F9F] rounded-[10px] px-2 py-4 transition-all duration-200"
              />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-[22px]"
            >
              <label htmlFor="phone" className="font-medium text-base">
                Phone
              </label>
              <motion.input
                variants={scaleOnHover}
                whileHover="hover"
                whileFocus={{ scale: 1.02 }}
                type="number"
                id="phone"
                className="border border-[#9F9F9F] rounded-[10px] px-2 py-4 transition-all duration-200"
              />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-[22px]"
            >
              <label htmlFor="email" className="font-medium text-base">
                Email address
              </label>
              <motion.input
                variants={scaleOnHover}
                whileHover="hover"
                whileFocus={{ scale: 1.02 }}
                type="email"
                id="email"
                className="border border-[#9F9F9F] rounded-[10px] px-2 py-4 transition-all duration-200"
              />
            </motion.div>

            <motion.input
              variants={fadeInUp}
              whileHover={{ scale: 1.01 }}
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Additional Information"
              className="border border-[#9F9F9F] rounded-[10px] px-2 py-4 w-full transition-all duration-200"
            />
          </motion.form>

          <motion.div
            variants={slideInFromRight}
            className="w-full space-y-3.5  max-w-[533px]"
          >
            <motion.p
              variants={fadeInUp}
              className="w-full flex items-center justify-between font-medium lg:text-2xl text-lg"
            >
              <span>Product</span>
              <span>Subtotal</span>
            </motion.p>
            <motion.div variants={staggerChildren} className="space-y-3.5">
              <motion.div
                variants={fadeInUp}
                className="flex items-center justify-between"
              >
                <p>
                  <span className="font-regular text-base text-[#9F9F9F]">
                    Asgaard Sofa{" "}
                  </span>
                  <span className="font-medium text-[12px]">x1</span>
                </p>
                <p className="font-light text-base">₦30,0000.00</p>
              </motion.div>
              <motion.p
                variants={fadeInUp}
                className="flex items-center justify-between text-base"
              >
                <span className="font-normal">Subtotal</span>
                <span className="font-light">₦35, 0000.00</span>
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="flex items-center justify-between"
              >
                <span className="font-normal text-base">Total</span>
                <span className="font-bold lg:text-2xl text-lg text-[#B88E2F]">
                  ₦65,000.00
                </span>
              </motion.p>
            </motion.div>

            <motion.hr variants={fadeInUp} />

            <motion.div variants={fadeIn} className="w-full">
              <motion.h3
                variants={fadeInUp}
                className="w-full gap-3 flex items-center mb-[11px]"
              >
                <motion.span
                  variants={zoomIn}
                  className="h-3.5 w-3.5 rounded-full bg-black"
                ></motion.span>
                <span className="font-normal text-base">
                  Direct Bank Transfer
                </span>
              </motion.h3>
              <motion.p
                variants={fadeInUp}
                className="text-[#9F9F9F] font-light text-base mb-[25px]"
              >
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
              </motion.p>
              <motion.div
                variants={staggerChildren}
                className="flex flex-col gap-[11px] mb-[22px]"
              >
                <motion.p
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 cursor-pointer transition-all duration-200"
                >
                  <input
                    type="radio"
                    name="payment-method"
                    id="direct-bank-transfer"
                  />
                  <label htmlFor="direct-bank-transfer">
                    Direct Bank Transfer
                  </label>
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 cursor-pointer transition-all duration-200"
                >
                  <input
                    type="radio"
                    name="payment-method"
                    id="cash-on-delivery"
                  />
                  <label htmlFor="cash-on-delivery">Cash On Delivery</label>
                </motion.p>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="font-light text-base mb-[39px]"
              >
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our{" "}
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="font-semibold cursor-pointer inline-block"
                >
                  privacy policy
                </motion.span>
                .
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="w-full flex items-center justify-center"
              >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    transition: { duration: 0.2 },
                  }}
                  className="rounded-[15px] outline-none border w-full max-w-[318px] border-black lg:py-4 py-2 font-normal lg:text-xl text-lg cursor-pointer transition-all duration-200 hover:bg-black hover:text-white"
                >
                  Place Order
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
