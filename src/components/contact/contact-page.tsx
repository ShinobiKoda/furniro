"use client";
import { motion } from "framer-motion";
import {
  zoomIn,
  fadeInUp,
  fadeIn,
  staggerChildren,
} from "../animations/motion";
import { NavDisplay } from "@/components/NavDisplay";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import Image from "next/image";

interface ContactPageProps {
  pathSegments: string[];
}

export function ContactPage({ pathSegments }: ContactPageProps) {
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
            {pathSegments[pathSegments.length - 1] || "Contact"}
          </h1>
          <NavDisplay pathSegments={pathSegments} />
        </motion.div>
      </header>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full text-center max-w-[644px] flex flex-col items-center justify-center mx-auto mt-[98px] gap-4 px-8"
      >
        <motion.h2
          variants={fadeInUp}
          className="capitalize font-semibold lg:text-4xl text-2xl"
        >
          Get in touch with us
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="font-normal lg:text-base text-sm text-[#9F9F9F]"
        >
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
          Hesitate!
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="w-full flex flex-col lg:flex-row lg:gap-[8rem] gap-8 max-w-[1440px] mx-auto px-8 lg:pl-[229px] lg:mt-[100px] mt-[50px] mb-[50px]"
      >
        <motion.div
          variants={fadeInUp}
          className="flex flex-col gap-4 max-w-[393px]"
        >
          <motion.div variants={fadeInUp} className="flex items-start gap-6">
            <FaLocationDot className="mt-1" size={30} />
            <p className="">
              <span className="font-medium lg:text-2xl text-lg">Address</span>{" "}
              <br />
              <span className="font-normal lg:text-base text-sm leading-8">
                236 5th SE Avenue, New <br /> York NY10000, United States
              </span>
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex items-start gap-6">
            <FaPhone className="mt-1" size={30} />
            <p>
              <span className="font-medium lg:text-2xl text-lg">Phone</span>
              <br />
              <span className="font-normal lg:text-base text-sm leading-8">
                Mobile: +(84)546-6789 <br />
                Hotiline: +(84)546-6789
              </span>
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex items-start gap-6">
            <MdOutlineAccessTimeFilled className="mt-1" size={30} />
            <p>
              <span className="font-medium lg:text-2xl text-lg">
                Working Time
              </span>
              <br />
              <span className="font-normal lg:text-base text-sm leading-8">
                Monday-Friday: 9:00 - 22:00 <br />
                Saturday-Sunday: 14:00 - 21:00
              </span>
            </p>
          </motion.div>
        </motion.div>
        <motion.form
          variants={fadeInUp}
          className="flex flex-col gap-9 lg:w-1/2 w-full"
        >
          <motion.div variants={fadeInUp} className="flex flex-col gap-[22px]">
            <label htmlFor="name" className="font-medium text-base">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className="border outline p-4 rounded-[10px] border-[#9F9F9F]"
            />
          </motion.div>
          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <label htmlFor="email" className="font-medium text-base">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="johndoe@mail.com"
              className="border outline p-4 rounded-[10px] border-[#9F9F9F]"
            />
          </motion.div>
          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <label htmlFor="subject" className="font-medium text-base">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Optional"
              className="border outline p-4 rounded-[10px] border-[#9F9F9F]"
            />
          </motion.div>
          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <label htmlFor="message" className="font-medium text-base">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={3}
              cols={5}
              className="border border-black rounded-[10px] p-4"
            ></textarea>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="w-full flex items-center justify-center lg:justify-start"
          >
            <button className="bg-[#B88E2F] py-4 px-16 hover:opacity-85 cursor-pointer rounded-[5px] outline-none border-none text-white text-base font-normal">
              Submit
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}
