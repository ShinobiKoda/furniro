"use client";
import { NavDisplay } from "@/components/NavDisplay";
import { motion } from "framer-motion";
import { zoomIn } from "@/components/animations/motion";
import { FaUserAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { FaTag } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Image from "next/image";

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

      <div className="lg:grid lg:grid-cols-[2fr_1fr] mt-[106px] w-full max-w-[1440px] mx-auto mb-[58px]">
        <div className="flex flex-col gap-8 px-4 lg:px-12">
          {paginatedBlogs.map((blog) => (
            <section
              key={blog.id}
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
                <button className="text-left font-normal lg:text-base text-sm border-b border-black pb-2">
                  Read more
                </button>
              </div>
            </section>
          ))}
          <div className="flex items-center justify-center gap-4 flex-wrap">
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
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-2"></div>
      </div>
    </div>
  );
}
