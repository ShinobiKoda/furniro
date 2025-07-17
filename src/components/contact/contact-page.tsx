"use client";
import { motion } from "framer-motion";
import { zoomIn } from "../animations/motion";
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

        <div className="w-full text-center max-w-[644px] flex flex-col items-center justify-center mx-auto mt-[98px] gap-4">
          <h2 className="capitalize font-semibold lg:text-4xl text-2xl">
            Get in touch with us
          </h2>
          <p className="font-normal lg:text-base text-sm text-[#9F9F9F]">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
            Not Hesitate!
          </p>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-8 max-w-[1440px] mx-auto px-4 lg:px-12 mt-[50px]">
          <div className="flex flex-col gap-4 max-w-[393px]">
            <div className="flex items-start gap-6">
              <FaLocationDot className="mt-1"/>
              <p>
                <span>Address</span> <br />
                <span>236 5th SE Avenue, New <br /> York NY10000, United States</span>
              </p>
            </div>
            <div className="flex items-start gap-6">
              <FaPhone className="mt-1"/>
              <p>
                <span>Phone</span><br />
                <span>
                  Mobile: +(84)546-6789 <br />
                  Hotiline: +(84)546-6789
                </span>
              </p>
            </div>
            <div className="flex items-start gap-6">
              <MdOutlineAccessTimeFilled className="mt-1"/>
              <p>
                <span>Working Time</span><br />
                <span>
                  Monday-Friday: 9:00 - 22:00 <br />
                  Saturday-Sunday: 14:00 - 21:00
                </span>
              </p>
            </div>
          </div>
          <form className="flex flex-col gap-4">
            <div>
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="johndoe@mail.com"/>
            </div>
            <div>
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" placeholder="Optional"/>
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows={5}></textarea>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
}
