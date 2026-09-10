"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  zoomIn,
  fadeInUp,
  fadeIn,
  staggerChildren,
} from "../../components/animations/motion";
import { ClipLoader } from "react-spinners";
import { NavDisplay } from "@/components/NavDisplay";
import Image from "next/image";
import { Footer } from "../../components/Footer";
import { usePathname } from "next/navigation";
import { signUp } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


export default function SignupPage() {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const [formError, setFormError] = useState("");

  const {setUser} = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = { username: "", email: "", password: "" };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {

      const data = await signUp(formData.username, formData.email, formData.password);
      setUser(data.user);

      router.push('/home');

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      setErrors({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setFormError(error instanceof Error ? error.message : "Failed to Register");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            {pathSegments[pathSegments.length - 1] || "Login"}
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
          Furniro
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="font-normal lg:text-base text-sm text-[#9F9F9F]"
        >
          Create an account.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="w-full flex justify-center max-w-[1440px] mx-auto px-8 lg:mt-[50px] mt-[30px] mb-[100px]"
      >
        <motion.form
          variants={fadeInUp}
          className="flex flex-col gap-9 w-full max-w-[500px]"
          onSubmit={handleSubmit}
        >
          <motion.div variants={fadeInUp} className="flex flex-col gap-[22px]">
            <label htmlFor="username" className="font-medium text-base">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="johndoe"
              className={`border outline p-4 rounded-[10px] ${errors.username ? "border-red-500" : "border-[#9F9F9F]"
                }`}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">{errors.username}</span>
            )}
          </motion.div>
          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <label htmlFor="email" className="font-medium text-base">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="johndoe@mail.com"
              className={`border outline p-4 rounded-[10px] ${errors.email ? "border-red-500" : "border-[#9F9F9F]"
                }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </motion.div>
          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <label htmlFor="password" className="font-medium text-base">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className={`border outline p-4 rounded-[10px] ${errors.password ? "border-red-500" : "border-[#9F9F9F]"
                }`}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </motion.div>

          {formError && (
            <p className="text-red-500 text-sm text-center">{formError}</p>
          )}

          <motion.div
            variants={fadeInUp}
            className="w-full flex items-center justify-center"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#B88E2F] py-4 px-16 hover:opacity-85 cursor-pointer rounded-[5px] outline-none border-none text-white text-base font-normal disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 w-full justify-center"
            >
              {isSubmitting ? (
                <>
                  <ClipLoader size={20} color="#ffffff" />
                </>
              ) : (
                "Signup"
              )}
            </button>
          </motion.div>
        </motion.form>
      </motion.div>

      <Footer />
    </div>
  );
}
