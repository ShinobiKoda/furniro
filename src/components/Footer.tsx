"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { staggerChildren, fadeInUp } from "./animations/motion";
import { triggerConfetti } from "./animations/confetti";
import { ClipLoader } from "react-spinners";
import { showSuccessToast } from "./animations/toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async () => {
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
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    triggerConfetti();
    showSuccessToast("Successfully subscribed, check your email");
    setEmail("");
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerChildren}
      className="w-full border-t-2 px-4 py-12 lg:px-12 relative h-full"
    >
      <motion.div
        variants={staggerChildren}
        className="w-full border-b-2 max-w-[1440px] mx-auto space-y-12 lg:grid lg:grid-cols-3 xl:grid-cols-4 pb-8"
      >
        <motion.div variants={fadeInUp} className="lg:space-y-[50px] space-y-4">
          <motion.h2
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="font-bold lg:text-2xl text-xl cursor-pointer relative group inline-block"
          >
            Furniro
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </motion.h2>
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
          <ul className="flex flex-col space-y-7">
            <motion.li
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="cursor-pointer w-fit"
            >
              <div className="relative group">
                <Link href="/">Home</Link>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </div>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="cursor-pointer w-fit"
            >
              <div className="relative group">
                <Link href="/shop">Shop</Link>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </div>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="cursor-pointer w-fit"
            >
              <div className="relative group">
                <Link href="/about">About</Link>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </div>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="cursor-pointer w-fit"
            >
              <div className="relative group">
                <Link href="/contact">Contact</Link>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </div>
            </motion.li>
          </ul>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="text-base font-medium space-y-10 lg:space-y-[50px]"
        >
          <h3 className="text-[#9F9F9F]">Help</h3>
          <ul className="flex flex-col space-y-7">
            <motion.li
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="cursor-pointer w-fit"
            >
              <div className="relative group">
                Payment Options
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </div>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="cursor-pointer w-fit"
            >
              <div className="relative group">
                Returns
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </div>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="cursor-pointer w-fit"
            >
              <div className="relative group">
                Privacy Policies
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </div>
            </motion.li>
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
            <div className="flex flex-row items-center gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none border-b border-b-black max-w-[193px] text-sm"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative group outline-none font-medium text-sm flex items-center justify-center cursor-pointer"
                disabled={isSubmitting}
              >
                <span className="relative z-10">
                  {isSubmitting ? (
                    <ClipLoader size={15} color={"#000"} />
                  ) : (
                    "SUBSCRIBE"
                  )}
                </span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
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
