"use client";

import { motion, useInView } from "framer-motion";
import { zoomIn, fadeInUp, staggerChildren } from "../animations/motion";
import Image from "next/image";
import { FetchFurnitures } from "@/api/FetchFurnitureDetails";
import { useState, useEffect, useRef } from "react";
import { FurnitureCard } from "../FurnitureCard";
import { FurnitureProps } from "@/types/type";
import { SkeletonLoader } from "../animations/SkeletonLoader";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";

const categories = ["Dining", "Living", "Bedroom"];

const slideInVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.3,
      duration: 0.8,
      ease: "easeInOut",
    },
  }),
};

const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export function HomePage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [furnitureDetails, setFurnitureDetails] = useState<
    FurnitureProps[] | null
  >(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentRange, setCurrentRange] = useState<number>(0);

  const images = [
    "/images/furniro_room-inspirations-1.webp",
    "/images/furniro_room-inspiration-2.webp",
  ];

  const setUpImages = [
    "/images/furniro_furniture-setup-1.webp",
    "/images/furniro_furniture-setup-2.webp",
    "/images/furniro_furniture-setup-3.webp",
    "/images/furniro_furniture-setup-4.webp",
    "/images/furniro_furniture-setup-5.webp",
    "/images/furniro_furniture-setup-6.webp",
    "/images/furniro_furniture-setup-7.webp",
  ];

  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const getFurnitureDetails = async () => {
      const { data, error } = await FetchFurnitures();

      if (error) {
        console.log(error);
      }

      if (data) {
        console.log(data);
        setFurnitureDetails(data);
        setLoading(false);
      }
    };

    getFurnitureDetails();
  }, []);

  useEffect(() => {
    const startSliding = () => {
      slideInterval.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
    };

    startSliding();

    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [images.length]);

  const handleNext = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
  };

  const handlePrev = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
  };

  const handleShowMore = () => {
    setCurrentRange((prevRange) => (prevRange + 8) % 16);
  };

  return (
    <div className="w-full">
      <div className='bg-[url("/images/furniro_hero-bg.webp")] h-[700px] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center md:justify-end md:pr-8 px-3 md:px-0'>
        <div className="w-full max-w-[1440px] mx-auto flex justify-end">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={zoomIn}
            className="bg-[#FFF3E3] rounded-md p-6 flex flex-col gap-4 max-w-[543px]"
          >
            <p className="flex flex-col gap-1">
              <span className="font-semibold tracking-[0.5rem]">
                New Arrival
              </span>
              <span className="font-bold text-3xl lg:text-5xl text-[#B88E2F]">
                Discover Our New Collection
              </span>
            </p>
            <p className="font-medium lg:text-lg text-base">
              Explore our curated collection of furniture designed to elevate
              your living spaces with style and comfort.
            </p>
            <div className="w-full">
              <button className="bg-[#B88E2F] text-white font-semibold py-3 px-9 mt-8 cursor-pointer hover:opacity-85">
                BUY NOW
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="my-[56.47px] w-full px-4 space-y-[62px]">
        <Section>
          <motion.div
            variants={staggerChildren}
            className="text-center space-y-1"
          >
            <motion.h2
              variants={fadeInUp}
              className="lg:text-[32px] font-bold text-2xl"
            >
              Browse The Range
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-base lg:text-2xl font-normal text-[#666666]"
            >
              Discover a variety of furniture styles to suit every room and
              taste.
            </motion.p>
          </motion.div>
        </Section>

        <Section>
          <motion.div
            variants={staggerChildren}
            className="overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-5 justify-start max-w-[1440px] mx-auto lg:justify-center">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex-shrink-0 w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] max-w-[300px] snap-center space-y-[30px]"
                >
                  <Image
                    src={`/images/furniro_${category.toLowerCase()}-illustration.webp`}
                    alt={`${category} category image`}
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover rounded-lg cursor-grab"
                  />
                  <p className="text-center font-semibold lg:text-2xl text-lg">
                    {category}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>
      </div>

      <Section>
        <div className="flex items-center justify-center flex-col gap-8 mb-[69px]">
          <h2 className="font-bold lg;text-[40px] text-2xl">Our Products</h2>
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full px-4 items-center justify-center max-w-[1440px] mx-auto gap-8 min-h-[50vh]">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonLoader key={index} />
              ))}
            </div>
          )}
          {furnitureDetails && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:grid-cols-4 w-full px-4 lg:px-12 items-center justify-center max-w-[1440px] mx-auto"
            >
              {furnitureDetails
                .slice(currentRange, currentRange + 8)
                .map((furniture) => (
                  <motion.div key={furniture.id} variants={fadeInUp}>
                    <FurnitureCard furniture={furniture} />
                  </motion.div>
                ))}
            </motion.div>
          )}
          <motion.button
            className="w-full max-w-[245px] border border-[#B88E2F] text-[#B88E2F] font-semibold text-base py-3 cursor-pointer hover:opacity-85"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShowMore}
          >
            {currentRange + 8 >= (furnitureDetails?.length || 0)
              ? "Show Less"
              : "Show More"}
          </motion.button>
        </div>
      </Section>

      <div className="w-full bg-[#FCF8F3] py-8 lg:h-[670px] flex items-center">
        <div className="w-full max-w-[1440px] mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:px-12">
          <div className="flex flex-col gap-3 text-center lg:text-left max-w-[390px]">
            <h2 className="font-bold lg:text-[40px] text-2xl text-[#3A3A3A]">
              50+ Beautiful rooms inspiration
            </h2>
            <p className="font-medium lg:text-base text-[#616161] text-sm">
              Our designer already made a lot of beautiful prototype rooms that
              inspire you
            </p>
            <button className="w-full max-w-[176px] bg-[#B88E2F] py-3 text-base font-semibold text-white mx-auto lg:mx-0 hover:opacity-85 cursor-pointer">
              Explore More
            </button>
          </div>
          <div className="relative w-full max-w-[400px] overflow-hidden">
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black bg-white h-12 w-12 text-3xl flex items-center justify-center p-3 rounded-full z-10 hover:opacity-90 cursor-pointer"
            >
              <ArrowLeft />
            </motion.button>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full h-auto"
            >
              <Image
                src={images[currentIndex]}
                alt={`Carousel Image ${currentIndex + 1}`}
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />
            </motion.div>
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black bg-white h-12 w-12 text-3xl flex items-center justify-center p-3 rounded-full z-10 hover:opacity-90 cursor-pointer"
            >
              <ArrowRight />
            </motion.button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <motion.div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    index === currentIndex ? "bg-[#B88E2F]" : "bg-gray-300"
                  }`}
                ></motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 lg:px-12 max-w-[1440px] mx-auto mt-[67px] mb-[50px]">
        <Section className="text-center">
          <h2 className="flex flex-col">
            <span className="font-semibold lg:text-xl text-lg text-[#616161]">
              Share your setup with
            </span>
            <span className="font-bold lg:text-[40px] text-2xl">
              #FurniroFurniture
            </span>
          </h2>
        </Section>
        <Section className="relative w-full h-auto mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {setUpImages.map((image, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={slideInVariants}
              className="relative w-full h-40 sm:h-48 lg:h-56 overflow-hidden rounded-lg"
            >
              <Image
                src={image}
                alt={`Setup Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          ))}
        </Section>
      </div>
      <Footer />
    </div>
  );
}
