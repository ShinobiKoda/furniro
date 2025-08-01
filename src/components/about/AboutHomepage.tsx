"use client";

import { NavDisplay } from "@/components/NavDisplay";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { zoomIn, fadeInUp, staggerChildren } from "../animations/motion";
import { Footer } from "@/components/Footer";
import { useRef, useState, useEffect } from "react";
import React from "react";

interface AboutHomepageProps {
  pathSegments: string[];
}

const Section = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
  }
>(({ children, className }, forwardedRef) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={(node) => {
        if (ref) ref.current = node;
        if (forwardedRef) {
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else {
            forwardedRef.current = node;
          }
        }
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
});

Section.displayName = "Section";

export function AboutHomepage({ pathSegments }: AboutHomepageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const teamImages = [
    "/images/furniro_furniture-setup-1.webp",
    "/images/furniro_furniture-setup-2.webp",
    "/images/furniro_furniture-setup-3.webp",
  ];

  const values = [
    {
      title: "Quality Craftsmanship",
      description:
        "Every piece is carefully crafted with attention to detail and superior materials.",
      icon: "🔨",
    },
    {
      title: "Sustainable Design",
      description:
        "We prioritize eco-friendly materials and sustainable manufacturing processes.",
      icon: "🌱",
    },
    {
      title: "Customer First",
      description:
        "Your satisfaction is our priority, from design to delivery and beyond.",
      icon: "❤️",
    },
    {
      title: "Innovation",
      description:
        "Constantly evolving our designs to meet modern lifestyle needs.",
      icon: "💡",
    },
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "500+", label: "Products" },
    { number: "15+", label: "Years Experience" },
    { number: "50+", label: "Countries Served" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % teamImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [teamImages.length]);

  return (
    <div className="w-full">
      {/* Hero Section */}
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
            {pathSegments[pathSegments.length - 1] || "About"}
          </h1>
          <NavDisplay pathSegments={pathSegments} />
        </motion.div>
      </header>

      {/* Our Story Section */}
      <div className="w-full px-4 lg:px-12 max-w-[1440px] mx-auto py-16">
        <Section>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={staggerChildren} className="space-y-6">
              <motion.h2
                variants={fadeInUp}
                className="font-bold text-3xl lg:text-4xl text-[#3A3A3A]"
              >
                Our Story
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[#616161] text-base lg:text-lg leading-relaxed"
              >
                Founded in 2008, Furniro began as a small family business with a
                simple vision: to create beautiful, functional furniture that
                transforms houses into homes. What started in a modest workshop
                has grown into a trusted brand serving customers worldwide.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-[#616161] text-base lg:text-lg leading-relaxed"
              >
                Our passion for quality craftsmanship and innovative design
                drives everything we do. From selecting the finest materials to
                perfecting every detail, we ensure that each piece not only
                looks beautiful but stands the test of time.
              </motion.p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="relative h-96 rounded-lg overflow-hidden"
            >
              <Image
                src="/images/furniro_room-inspirations-1.webp"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </Section>
      </div>

      {/* Mission & Vision Section */}
      <div className="w-full bg-[#FCF8F3] py-16">
        <div className="w-full px-4 lg:px-12 max-w-[1440px] mx-auto">
          <Section>
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div variants={staggerChildren} className="space-y-6">
                <motion.h3
                  variants={fadeInUp}
                  className="font-bold text-2xl lg:text-3xl text-[#B88E2F]"
                >
                  Our Mission
                </motion.h3>
                <motion.p
                  variants={fadeInUp}
                  className="text-[#616161] text-base lg:text-lg leading-relaxed"
                >
                  To design and create exceptional furniture that enhances
                  everyday living, combining timeless aesthetics with modern
                  functionality. We believe every home deserves furniture that
                  reflects personal style while providing comfort and
                  durability.
                </motion.p>
              </motion.div>
              <motion.div variants={staggerChildren} className="space-y-6">
                <motion.h3
                  variants={fadeInUp}
                  className="font-bold text-2xl lg:text-3xl text-[#B88E2F]"
                >
                  Our Vision
                </motion.h3>
                <motion.p
                  variants={fadeInUp}
                  className="text-[#616161] text-base lg:text-lg leading-relaxed"
                >
                  To be the world&apos;s most trusted furniture brand, known for
                  our commitment to sustainable practices, innovative design,
                  and exceptional customer service. We envision a future where
                  beautiful, responsible furniture is accessible to everyone.
                </motion.p>
              </motion.div>
            </div>
          </Section>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="w-full px-4 lg:px-12 max-w-[1440px] mx-auto py-16">
        <Section>
          <div className="text-center mb-12">
            <motion.h2
              variants={fadeInUp}
              className="font-bold text-3xl lg:text-4xl text-[#3A3A3A] mb-4"
            >
              Our Values
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-[#616161] text-base lg:text-lg max-w-2xl mx-auto"
            >
              The principles that guide everything we do, from design to
              delivery
            </motion.p>
          </div>
          <motion.div
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center space-y-4 p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-semibold text-xl text-[#3A3A3A]">
                  {value.title}
                </h3>
                <p className="text-[#616161] text-sm lg:text-base">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Section>
      </div>

      {/* Stats Section */}
      <div className="w-full bg-[#B88E2F] py-16">
        <div className="w-full px-4 lg:px-12 max-w-[1440px] mx-auto">
          <Section>
            <motion.div
              variants={staggerChildren}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="space-y-2"
                >
                  <div className="font-bold text-3xl lg:text-4xl text-white">
                    {stat.number}
                  </div>
                  <div className="text-white text-sm lg:text-base font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Section>
        </div>
      </div>

      {/* Team Section */}
      <div className="w-full px-4 lg:px-12 max-w-[1440px] mx-auto py-16">
        <Section>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              className="relative h-96 rounded-lg overflow-hidden"
            >
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full"
              >
                <Image
                  src={teamImages[currentImageIndex]}
                  alt="Our Team"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
            <motion.div variants={staggerChildren} className="space-y-6">
              <motion.h2
                variants={fadeInUp}
                className="font-bold text-3xl lg:text-4xl text-[#3A3A3A]"
              >
                Meet Our Team
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[#616161] text-base lg:text-lg leading-relaxed"
              >
                Our diverse team of designers, craftspeople, and customer
                service specialists work together to bring you the best
                furniture experience. With decades of combined experience,
                we&apos;re passionate about creating pieces that you&apos;ll
                love for years to come.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-[#616161] text-base lg:text-lg leading-relaxed"
              >
                From our design studio to our customer service team, every
                member is dedicated to ensuring your satisfaction and bringing
                beautiful furniture into your home.
              </motion.p>
            </motion.div>
          </div>
        </Section>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full bg-[#FCF8F3] py-16">
        <div className="w-full px-4 lg:px-12 max-w-[1440px] mx-auto">
          <Section>
            <div className="text-center mb-12">
              <motion.h2
                variants={fadeInUp}
                className="font-bold text-3xl lg:text-4xl text-[#3A3A3A] mb-4"
              >
                Why Choose Furniro?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[#616161] text-base lg:text-lg max-w-3xl mx-auto"
              >
                We&apos;re more than just a furniture company. We&apos;re your
                partners in creating the perfect living space that reflects your
                unique style and meets your needs.
              </motion.p>
            </div>
            <motion.div
              variants={staggerChildren}
              className="grid md:grid-cols-3 gap-8"
            >
              <motion.div variants={fadeInUp} className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#B88E2F] rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl">✓</span>
                </div>
                <h3 className="font-semibold text-xl text-[#3A3A3A]">
                  Premium Quality
                </h3>
                <p className="text-[#616161] text-sm lg:text-base">
                  Only the finest materials and expert craftsmanship go into
                  every piece.
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#B88E2F] rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl">🚚</span>
                </div>
                <h3 className="font-semibold text-xl text-[#3A3A3A]">
                  Fast Delivery
                </h3>
                <p className="text-[#616161] text-sm lg:text-base">
                  Quick and reliable delivery to bring your furniture home
                  safely.
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#B88E2F] rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl">💬</span>
                </div>
                <h3 className="font-semibold text-xl text-[#3A3A3A]">
                  24/7 Support
                </h3>
                <p className="text-[#616161] text-sm lg:text-base">
                  Our dedicated team is always here to help with any questions.
                </p>
              </motion.div>
            </motion.div>
          </Section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
