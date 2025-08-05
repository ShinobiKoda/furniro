"use client";
import { NavDisplay } from "@/components/NavDisplay";
import { motion } from "framer-motion";
import {
  zoomIn,
  fadeInUp,
  staggerChildren,
  fadeIn,
} from "@/components/animations/motion";
import { FaUserAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { Search } from "lucide-react";
import { FaTag } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Services } from "./Services";
import { Footer } from "./Footer";

interface BlogProps {
  pathSegments: string[];
}

interface BlogDataProps {
  id: number;
  image: string;
  date: string;
  topic: string;
  author: string;
  description: string;
  category: string;
}

const recentPosts = [
  {
    img: "/images/recent-posts-1.svg",
    topic: "Going all-in with millenial design",
    date: "03 Aug 2024",
  },
  {
    img: "/images/recent-posts-2.svg",
    topic: "Exploring new ways of decorating",
    date: "10 Oct 2024",
  },
  {
    img: "/images/recent-posts-3.svg",
    topic: "Handmade pieces that took time to make",
    date: "23 Oct 2024",
  },
  {
    img: "/images/recent-posts-4.svg",
    topic: "Modern home in milan",
    date: "09 Dec 2024",
  },
  {
    img: "/images/recent-posts-2.svg",
    topic: "Colorful office redesign",
    date: "13 Dec 2024",
  },
];

export function Blog({ pathSegments }: BlogProps) {
  const [blogs, setBlogs] = useState<BlogDataProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const blogsPerPage = 3;

  useEffect(() => {
    fetch("/data/blogs.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <div>
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

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="lg:grid lg:grid-cols-[3fr_1fr] mt-[106px] w-full max-w-[1440px] mx-auto mb-[58px] grid grid-cols-1 lg:px-12"
      >
        <motion.div
          variants={fadeIn}
          className="flex flex-col gap-8 px-4"
        >
          {paginatedBlogs.map((blog, index) => (
            <motion.section
              key={blog.id}
              variants={fadeInUp}
              custom={index}
              className="flex flex-col gap-7 w-full max-w-[817px]"
            >
              <Image
                src={blog.image}
                alt="Blog Image"
                height={100}
                width={100}
                className="w-full"
              />
              <div className="text-[#9F9F9F] flex items-center gap-5 w-full">
                <p className="flex items-center gap-2">
                  <FaUserAlt size={20} />
                  <span className="font-normal text-base">{blog.author}</span>
                </p>
                <p className="flex items-center gap-2 max-w-[150px] lg:w-full">
                  <CiCalendarDate size={20} />
                  <span className="truncate font-normal text-base">
                    {blog.date}
                  </span>
                </p>
                <p className="flex items-center gap-2 max-w-[100px] lg:max-w-full">
                  <FaTag size={20} />
                  <span className="truncate font-normal text-base">
                    {blog.category}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="font-medium lg:text-[30px] text-xl text-black">
                  {blog.topic}
                </h2>
                <p className="font-normal lg:text-[15px] text-sm text-[#9F9F9F] line-clamp-3">
                  {blog.description}
                </p>
              </div>
              <div className="w-full">
                <button className="text-left font-normal lg:text-base text-sm border-b border-black pb-2 cursor-pointer hover:opacity-85">
                  Read more
                </button>
              </div>
            </motion.section>
          ))}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#F9F1E7] rounded disabled:opacity-50 font-light text-lg lg:text-xl cursor-pointer disabled:cursor-not-allowed"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded font-normal lg:text-xl text-lg cursor-pointer hover:opacity-85 ${
                  currentPage === page
                    ? "bg-[#B88E2F] text-white"
                    : "bg-[#F9F1E7]"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#F9F1E7] rounded disabled:opacity-50 font-light text-lg lg:text-xl cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="flex flex-col gap-[43px] w-full px-4 mt-10 lg:mt-0"
        >
          <motion.div
            variants={fadeInUp}
            className="w-full border border-[#9F9F9F] rounded-[10px] flex items-center justify-end pr-4"
          >
            <input
              type="text"
              className="w-full text-left border-0 outline-0 h-full p-4"
            />
            <Search />
          </motion.div>
          <motion.div variants={fadeInUp} className="space-y-[33px]">
            <h2 className="font-medium lg:text-2xl text-xl">Categories</h2>
            <motion.div variants={staggerChildren} className="space-y-[41px]">
              <motion.p
                variants={fadeInUp}
                className="flex items-center justify-between w-full text-[#9F9F9F] font-normal text-base"
              >
                <span>Crafts</span>
                <span>2</span>
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="flex items-center justify-between w-full text-[#9F9F9F] font-normal text-base"
              >
                <span>Design</span>
                <span>8</span>
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="flex items-center justify-between w-full text-[#9F9F9F] font-normal text-base"
              >
                <span>Handmade</span>
                <span>7</span>
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="flex items-center justify-between w-full text-[#9F9F9F] font-normal text-base"
              >
                <span>Interior</span>
                <span>1</span>
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="flex items-center justify-between w-full text-[#9F9F9F] font-normal text-base"
              >
                <span>Wood</span>
                <span>6</span>
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-[33px]">
            <h2 className="font-medium lg:text-2xl text-xl">Recent Posts</h2>
            <motion.div variants={staggerChildren} className="space-y-[41px]">
              {recentPosts.map((post, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-start gap-2 max-w-[200px] hover:opacity-85 cursor-pointer"
                >
                  <Image
                    src={post.img}
                    alt="Post Image"
                    width={100}
                    height={100}
                  />
                  <p className="flex flex-col font-regular space-y-2">
                    <span className="text-sm">{post.topic}</span>
                    <span className="text-[#9F9F9F] text-[12px]">
                      {post.date}
                    </span>
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="w-full mb-[50px]">
        <Services />
      </div>

      <Footer />
    </div>
  );
}
