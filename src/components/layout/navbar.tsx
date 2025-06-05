"use client";

import Image from "next/image";
import { User, Search } from "lucide-react";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";

export function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <nav className="w-full p-4 flex items-center justify-between relative">
      <div className="flex items-center gap-2">
        <Image
          src="/images/furniro_logo.webp"
          alt="Logo"
          width={45}
          height={40}
        />
        <h1 className="font-bold text-3xl">FURNIRO</h1>
      </div>

      <div
        className={`w-7 h-6 flex flex-col md:hidden gap-[5px] cursor-pointer hover:opacity-85 relative right-0 top-0 z-60 *:rounded-md ${
          isSidebarOpen ? "rotate-90" : ""
        }`}
        onClick={toggleSidebar}
      >
        <div
          className={`w-full h-1 bg-black transition-transform duration-100 ease-in-out ${
            isSidebarOpen ? "rotate-45 translate-y-[8px]" : ""
          }`}
        ></div>
        <div
          className={`w-full h-1 bg-black transition-opacity duration-100 ease-in-out ${
            isSidebarOpen ? "opacity-0" : ""
          }`}
        ></div>
        <div
          className={`w-full h-1 bg-black transition-transform duration-100 ease-in-out ${
            isSidebarOpen ? "-rotate-45 -translate-y-[9px]" : ""
          }`}
        ></div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-[2px] bg-white/20 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-white p-8 transform transition-transform duration-500 ease-in-out z-50 *:hover:opacity-85 shadow-md rounded-md ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <ul className="flex flex-col gap-8 mt-10">
          <li>
            <Link href="/home" onClick={closeSidebar}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/shop" onClick={closeSidebar}>
              Shop
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={closeSidebar}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={closeSidebar}>
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <ul className="hidden md:flex items-center gap-[4.7rem] font-medium text-lg">
        <li>
          <Link href="/home">Home</Link>
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
      <div className="hidden md:flex items-center gap-8 *:hover:opacity-80 cursor-pointer">
        <User />
        <Search />
        <FaCartShopping className="text-2xl" />
      </div>
    </nav>
  );
}
