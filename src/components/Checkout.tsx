"use client";
import { motion } from "framer-motion";
import {
  zoomIn,
  fadeInUp,
  staggerChildren,
  scaleOnHover,
  fadeIn,
  fadeInDown,
} from "./animations/motion";
import Image from "next/image";
import { Services } from "./Services";
import { Footer } from "./Footer";
import { useCart } from "@/context/CartContext";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress: string;
  townCity: string;
  province: string;
  zipCode: string;
  phone: string;
  email: string;
  paymentMethod: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  streetAddress?: string;
  townCity?: string;
  province?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  paymentMethod?: string;
}

export function Checkout() {
  const { cartItems, getTotalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    townCity: "",
    province: "",
    zipCode: "",
    phone: "",
    email: "",
    paymentMethod: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = "Street address is required";
    }

    if (!formData.townCity.trim()) {
      newErrors.townCity = "Town/City is required";
    }

    if (!formData.province) {
      newErrors.province = "State/Province is required";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 11-digit phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setOrderSuccess(true);

      setFormData({
        firstName: "",
        lastName: "",
        companyName: "",
        streetAddress: "",
        townCity: "",
        province: "",
        zipCode: "",
        phone: "",
        email: "",
        paymentMethod: "",
      });

      setErrors({});

      setTimeout(() => {
        setOrderSuccess(false);
      }, 3000);
    }, 2000);
  };

  const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Federal Capital Territory",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

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
            Checkout
          </h1>
        </motion.div>
      </header>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="max-w-[1440px] mx-auto mt-[98px] px-4 lg:px-12 mb-[123px] space-y-9"
      >
        <motion.h2
          variants={fadeInUp}
          className="font-semibold lg:text-4xl text-2xl"
        >
          Billing Details
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] w-full  gap-[105px]">
          <motion.form
            id="checkout-form"
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="space-y-9"
          >
            <motion.div
              variants={fadeInUp}
              className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-[31px]"
            >
              <div className="flex flex-col gap-[22px] flex-1">
                <label htmlFor="first-name" className="font-medium text-base">
                  First Name *
                </label>
                <motion.input
                  variants={scaleOnHover}
                  whileHover="hover"
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`border rounded-[10px] px-2 py-4 transition-all duration-200 ${
                    errors.firstName ? "border-red-500" : "border-[#9F9F9F]"
                  }`}
                  id="first-name"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">
                    {errors.firstName}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-[22px] flex-1">
                <label htmlFor="last-name" className="font-medium text-base">
                  Last Name *
                </label>
                <motion.input
                  variants={scaleOnHover}
                  whileHover="hover"
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`border rounded-[10px] px-2 py-4 transition-all duration-200 ${
                    errors.lastName ? "border-red-500" : "border-[#9F9F9F]"
                  }`}
                  id="last-name"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-[22px]"
            >
              <label htmlFor="company-name" className="font-medium text-base">
                Company Name
              </label>
              <motion.input
                variants={scaleOnHover}
                whileHover="hover"
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                id="company-name"
                className="border border-[#9F9F9F] rounded-[10px] px-2 py-4 transition-all duration-200"
              />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-[22px]"
            >
              <label htmlFor="country_region" className="font-medium text-base">
                Country/Region
              </label>
              <motion.div
                variants={scaleOnHover}
                whileHover="hover"
                className="border border-[#9F9F9F] rounded-[10px] px-2 py-4 transition-all duration-200 relative"
              >
                <select
                  name="country_region"
                  id="country_region"
                  className="w-full outline-0 border-0 cursor-pointer bg-transparent rounded-md h-full"
                  defaultValue="nigeria"
                >
                  <option value="nigeria">Nigeria</option>
                </select>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-[22px]"
            >
              <label htmlFor="street-address" className="font-medium text-base">
                Street Address *
              </label>
              <motion.input
                variants={scaleOnHover}
                whileHover="hover"
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                id="street-address"
                className={`border rounded-[10px] px-2 py-4 transition-all duration-200 ${
                  errors.streetAddress ? "border-red-500" : "border-[#9F9F9F]"
                }`}
              />
              {errors.streetAddress && (
                <span className="text-red-500 text-sm">
                  {errors.streetAddress}
                </span>
              )}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-[22px]"
            >
              <label htmlFor="town_city" className="font-medium text-base">
                Town/City *
              </label>
              <motion.input
                variants={scaleOnHover}
                whileHover="hover"
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="townCity"
                value={formData.townCity}
                onChange={handleInputChange}
                id="town_city"
                className={`border rounded-[10px] px-2 py-4 transition-all duration-200 ${
                  errors.townCity ? "border-red-500" : "border-[#9F9F9F]"
                }`}
              />
              {errors.townCity && (
                <span className="text-red-500 text-sm">{errors.townCity}</span>
              )}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-[22px]"
            >
              <label htmlFor="province" className="font-medium text-base">
                State/Province *
              </label>
              <motion.div
                variants={scaleOnHover}
                whileHover="hover"
                className={`border rounded-[10px] px-2 py-4 transition-all duration-200 ${
                  errors.province ? "border-red-500" : "border-[#9F9F9F]"
                }`}
              >
                <select
                  name="province"
                  id="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  className="w-full outline-0 border-0 bg-transparent"
                >
                  <option value="">Select a state</option>
                  {nigerianStates.map((state) => (
                    <option
                      key={state}
                      value={state.toLowerCase().replace(/\s+/g, "-")}
                    >
                      {state}
                    </option>
                  ))}
                </select>
              </motion.div>
              {errors.province && (
                <span className="text-red-500 text-sm">{errors.province}</span>
              )}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-[22px]"
            >
              <label htmlFor="zip-code" className="font-medium text-base">
                Zip Code *
              </label>
              <motion.input
                variants={scaleOnHover}
                whileHover="hover"
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                id="zip-code"
                className={`border rounded-[10px] px-2 py-4 transition-all duration-200 ${
                  errors.zipCode ? "border-red-500" : "border-[#9F9F9F]"
                }`}
              />
              {errors.zipCode && (
                <span className="text-red-500 text-sm">{errors.zipCode}</span>
              )}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-[22px]"
            >
              <label htmlFor="phone" className="font-medium text-base">
                Phone *
              </label>
              <motion.input
                variants={scaleOnHover}
                whileHover="hover"
                whileFocus={{ scale: 1.02 }}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                id="phone"
                className={`border rounded-[10px] px-2 py-4 transition-all duration-200 ${
                  errors.phone ? "border-red-500" : "border-[#9F9F9F]"
                }`}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-[22px]"
            >
              <label htmlFor="email" className="font-medium text-base">
                Email address *
              </label>
              <motion.input
                variants={scaleOnHover}
                whileHover="hover"
                whileFocus={{ scale: 1.02 }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                id="email"
                className={`border rounded-[10px] px-2 py-4 transition-all duration-200 ${
                  errors.email ? "border-red-500" : "border-[#9F9F9F]"
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </motion.div>

            <motion.input
              variants={fadeInUp}
              whileHover={{ scale: 1.01 }}
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Additional Information"
              className="border border-[#9F9F9F] rounded-[10px] px-2 py-4 w-full transition-all duration-200"
            />
          </motion.form>

          <motion.div
            variants={fadeInDown}
            className="w-full space-y-3.5  max-w-[533px]"
          >
            <motion.p
              variants={fadeInUp}
              className="w-full flex items-center justify-between font-medium lg:text-2xl text-lg"
            >
              <span>Product</span>
              <span>Subtotal</span>
            </motion.p>
            <motion.div variants={staggerChildren} className="space-y-3.5">
              {cartItems.length === 0 ? (
                <motion.div
                  variants={fadeInUp}
                  className="text-center py-8 text-gray-500"
                >
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="text-sm">Add some furniture to get started!</p>
                </motion.div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.furniture.id}
                      variants={fadeInUp}
                      className="flex items-center justify-between"
                    >
                      <p>
                        <span className="font-regular text-base text-[#9F9F9F]">
                          {item.furniture.name}{" "}
                        </span>
                        <span className="font-medium text-[12px]">
                          x{item.quantity}
                        </span>
                      </p>
                      <p className="font-light text-base">
                        ₦
                        {(
                          (item.furniture.discount_price ||
                            item.furniture.price) * item.quantity
                        ).toLocaleString()}
                      </p>
                    </motion.div>
                  ))}
                  <motion.p
                    variants={fadeInUp}
                    className="flex items-center justify-between text-base"
                  >
                    <span className="font-normal">Subtotal</span>
                    <span className="font-light">
                      ₦{getTotalPrice().toLocaleString()}
                    </span>
                  </motion.p>
                  <motion.p
                    variants={fadeInUp}
                    className="flex items-center justify-between"
                  >
                    <span className="font-normal text-base">Total</span>
                    <span className="font-bold lg:text-2xl text-lg text-[#B88E2F]">
                      ₦{getTotalPrice().toLocaleString()}
                    </span>
                  </motion.p>
                </>
              )}
            </motion.div>

            <motion.hr variants={fadeInUp} />

            <motion.div variants={fadeIn} className="w-full">
              <motion.h3
                variants={fadeInUp}
                className="w-full gap-3 flex items-center mb-[11px]"
              >
                <motion.span
                  variants={zoomIn}
                  className="h-3.5 w-3.5 rounded-full bg-black"
                ></motion.span>
                <span className="font-normal text-base">
                  Direct Bank Transfer
                </span>
              </motion.h3>
              <motion.p
                variants={fadeInUp}
                className="text-[#9F9F9F] font-light text-base mb-[25px]"
              >
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
              </motion.p>
              <motion.div
                variants={staggerChildren}
                className="flex flex-col gap-[11px] mb-[22px]"
              >
                <motion.p
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 cursor-pointer transition-all duration-200"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="direct-bank-transfer"
                    checked={formData.paymentMethod === "direct-bank-transfer"}
                    onChange={handleInputChange}
                    id="direct-bank-transfer"
                  />
                  <label htmlFor="direct-bank-transfer">
                    Direct Bank Transfer
                  </label>
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 cursor-pointer transition-all duration-200"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash-on-delivery"
                    checked={formData.paymentMethod === "cash-on-delivery"}
                    onChange={handleInputChange}
                    id="cash-on-delivery"
                  />
                  <label htmlFor="cash-on-delivery">Cash On Delivery</label>
                </motion.p>
                {errors.paymentMethod && (
                  <span className="text-red-500 text-sm">
                    {errors.paymentMethod}
                  </span>
                )}
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="font-light text-base mb-[39px]"
              >
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our{" "}
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="font-semibold cursor-pointer inline-block"
                >
                  privacy policy
                </motion.span>
                .
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="w-full flex items-center justify-center"
              >
                <motion.button
                  type="submit"
                  form="checkout-form"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    transition: { duration: 0.2 },
                  }}
                  disabled={cartItems.length === 0 || isLoading}
                  className="rounded-[15px] outline-none border w-full max-w-[318px] border-black lg:py-4 py-2 font-normal lg:text-xl text-lg cursor-pointer transition-all duration-200 hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <ClipLoader size={20} color="#000000" />
                      <span>Processing...</span>
                    </>
                  ) : orderSuccess ? (
                    <span>Order Placed Successfully!</span>
                  ) : (
                    <span>Place Order</span>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div>
        <Services />
      </div>

      <Footer />
    </div>
  );
}
