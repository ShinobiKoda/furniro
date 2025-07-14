"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { staggerChildren, fadeInUp } from "./animations/motion";
import { triggerConfetti } from "./animations/confetti";

export function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    triggerConfetti();
    setEmail("");
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerChildren}
      className="w-full border-t-2 mt-[50px] px-4 py-12 lg:px-12 relative h-full"
    >
      <motion.div
        variants={staggerChildren}
        className="w-full border-b-2 max-w-[1440px] mx-auto space-y-12 lg:grid lg:grid-cols-4 pb-8"
      >
        <motion.div variants={fadeInUp} className="lg:space-y-[50px] space-y-4">
          <h2 className="font-bold lg:text-2xl text-xl">Furniro</h2>
          <p className="font-normal text-base text-[#9F9F9F]">
            400 University Drive Suite 200 Coral <br /> Gables, <br />
            FL 33134 USA
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="text-base font-medium space-y-10 lg:space-y-[50px]"
        >
          <h3 className="text-[#9F9F9F]">Links</h3>
          <ul className="flex flex-col space-y-7 *:hover:opacity-85 *:cursor-pointer">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="text-base font-medium space-y-10 lg:space-y-[50px]"
        >
          <h3 className="text-[#9F9F9F]">Help</h3>
          <ul className="flex flex-col space-y-7 *:hover:opacity-85 *:cursor-pointer">
            <li>Payment Options</li>
            <li>Returns</li>
            <li>Privacy Policies</li>
          </ul>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="font-medium text-base space-y-10 lg:space-y-[50px]"
        >
          <h3 className="text-[#9F9F9F]">Newsletter</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubscribe();
            }}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-row items-center gap-4 *:cursor-pointer">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none border-b border-b-black max-w-[193px] text-sm"
              />
              <button
                type="submit"
                className="w-full max-w-[75px] border-b border-b-black outline-none font-medium text-sm hover:opacity-85"
              >
                SUBSCRIBE
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </motion.div>
      </motion.div>
      <motion.p
        variants={fadeInUp}
        className="font-normal text-base mt-[35px] w-full max-w-[1440px] mx-auto"
      >
        &copy; 2025 Furniro. All rights reserved.
      </motion.p>
    </motion.footer>
  );
}
