"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import { useEffect } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export default function NotFound() {
  const quickLinks = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Shop", href: "/shop", icon: Search },
    { name: "About", href: "/about", icon: ArrowLeft },
    { name: "Contact", href: "/contact", icon: Search },
  ];

  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      navbar.style.display = "none";
    }

    return () => {
      const navbar = document.querySelector("nav");
      if (navbar) {
        navbar.style.display = "block";
      }    // Restore navbar when component unmounts (user navigates away)

    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col -mt-[76px] lg:-mt-[76px]">
      <div
        className="w-full bg-cover bg-center bg-no-repeat h-[400px] flex items-center justify-center"
        style={{ backgroundImage: "url('/images/furniro_shop-hero-bg.svg')" }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={zoomIn}
          className="flex flex-col gap-4 items-center text-center px-4"
        >
          <Image
            src="/images/furniro_path-logo.svg"
            alt="Furniro Logo"
            height={100}
            width={100}
            className="opacity-80"
          />
          <h1 className="font-bold text-6xl lg:text-8xl text-[#B88E2F]">404</h1>
          <p className="font-medium text-xl lg:text-2xl text-[#3A3A3A]">
            Page Not Found
          </p>
        </motion.div>
      </div>

      <div className="flex-1 w-full px-4 lg:px-12 max-w-[1440px] mx-auto py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="text-center space-y-8"
        >
          {/* Error Message */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h2 className="font-bold text-3xl lg:text-4xl text-[#3A3A3A]">
              Oops! Something went wrong
            </h2>
            <p className="text-lg text-[#616161] max-w-2xl mx-auto leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist. It might have
              been moved, deleted, or you entered the wrong URL. Don&apos;t
              worry, let&apos;s get you back to exploring our beautiful
              furniture collection.
            </p>
          </motion.div>

          <motion.div variants={zoomIn} className="flex justify-center py-8">
            <div className="w-32 h-32 bg-[#F9F1E7] rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-[#B88E2F] rounded-lg flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
                  <div className="w-8 h-8 bg-[#B88E2F] rounded-sm"></div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/home">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-[#B88E2F] text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#A67C29] transition-colors duration-200"
              >
                <Home size={20} />
                Go Home
              </motion.button>
            </Link>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 border-2 border-[#B88E2F] text-[#B88E2F] px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#B88E2F] hover:text-white transition-colors duration-200"
              >
                <Search size={20} />
                Browse Shop
              </motion.button>
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="pt-8">
            <h3 className="font-semibold text-xl text-[#3A3A3A] mb-6">
              Or explore these pages:
            </h3>
            <motion.div
              variants={staggerChildren}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
            >
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <motion.div key={index} variants={fadeInUp}>
                    <Link href={link.href}>
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#F9F1E7] p-6 rounded-lg hover:bg-[#B88E2F] hover:text-white transition-colors duration-200 group cursor-pointer"
                      >
                        <IconComponent
                          size={24}
                          className="mx-auto mb-2 text-[#B88E2F] group-hover:text-white"
                        />
                        <p className="font-medium text-[#3A3A3A] group-hover:text-white">
                          {link.name}
                        </p>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-[#FCF8F3] p-8 rounded-lg max-w-2xl mx-auto"
          >
            <h3 className="font-semibold text-xl text-[#3A3A3A] mb-4">
              Need Help?
            </h3>
            <p className="text-[#616161] mb-4">
              If you believe this is an error or need assistance, please
              don&apos;t hesitate to contact us.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#B88E2F] text-white px-6 py-3 rounded-md font-medium hover:bg-[#A67C29] transition-colors duration-200"
              >
                Contact Support
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
}
