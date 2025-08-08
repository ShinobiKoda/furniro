"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FurnitureProps } from "@/types/type";
import { FetchFurnitures } from "@/api/FetchFurnitureDetails";
import { FetchFurnitureById } from "@/api/FetchFurnitureById";
import { useCart } from "@/context/CartContext";
import { useLikedItems } from "@/context/LikedItemsContext";
import { Heart, Star, Plus, Minus, ArrowLeft, Share2 } from "lucide-react";
import { BsArrowLeftRight } from "react-icons/bs";
import { Footer } from "@/components/Footer";
import { NavDisplay } from "@/components/NavDisplay";
import { FurnitureCard } from "@/components/FurnitureCard";
import { fadeInUp, staggerChildren } from "@/components/animations/motion";

interface FurnitureDetailsProps {
  furnitureId: string;
}

export function FurnitureDetails({ furnitureId }: FurnitureDetailsProps) {
  const router = useRouter();
  const [furniture, setFurniture] = useState<FurnitureProps | null>(null);
  const [relatedFurniture, setRelatedFurniture] = useState<FurnitureProps[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingRelated, setLoadingRelated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("description");
  const [imageError, setImageError] = useState(false);

  const { addToCart, removeFromCart, cartItems } = useCart();
  const { likedItems, toggleLike } = useLikedItems();

  useEffect(() => {
    const getFurnitureDetails = async () => {
      setLoading(true);
      const { data, error } = await FetchFurnitureById(furnitureId);

      if (error) {
        setError(error);
      } else if (data) {
        setFurniture(data);
        // Fetch related furniture with the same tag
        fetchRelatedFurniture(data.tag, data.id);
      }
      setLoading(false);
    };

    getFurnitureDetails();
  }, [furnitureId]);

  const fetchRelatedFurniture = async (tag: string, currentId: number) => {
    setLoadingRelated(true);
    try {
      const { data, error } = await FetchFurnitures();
      if (error) {
        console.error("Error fetching related furniture:", error);
      } else if (data) {
        // Filter furniture with the same tag, excluding the current item, and limit to 4 items
        const related = data
          .filter(
            (item) =>
              item.tag.toLowerCase() === tag.toLowerCase() &&
              item.id !== currentId
          )
          .slice(0, 4);
        setRelatedFurniture(related);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoadingRelated(false);
  };

  const isLiked = furniture ? likedItems.has(furniture.id.toString()) : false;
  const isInCart = furniture
    ? cartItems.some((item) => item.furniture.id === furniture.id)
    : false;

  const handleLikeToggle = () => {
    if (furniture) {
      toggleLike(furniture.id.toString());
    }
  };

  const handleAddToCart = () => {
    if (furniture) {
      if (isInCart) {
        removeFromCart(furniture.id);
      } else {
        for (let i = 0; i < quantity; i++) {
          addToCart(furniture);
        }
      }
    }
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="bg-[#F9F1E7] py-6">
          <div className="mx-auto w-full max-w-[1440px] px-4 lg:px-12">
            <div className="h-4 bg-gray-300 rounded w-48 animate-pulse"></div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-300 rounded-lg h-[500px] animate-pulse"></div>

            <div className="space-y-6">
              <div className="h-10 bg-gray-300 rounded w-3/4 animate-pulse"></div>

              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
              </div>

              <div className="h-8 bg-gray-300 rounded w-32 animate-pulse"></div>

              <div className="space-y-4">
                <div className="h-10 bg-gray-300 rounded w-32 animate-pulse"></div>
                <div className="h-12 bg-gray-300 rounded w-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-12 space-y-6">
            <div className="flex gap-8">
              <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
            </div>
            <div className="space-y-3">
              <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !furniture) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The requested furniture item could not be found."}
          </p>
          <button
            onClick={() => router.back()}
            className="bg-[#B88E2F] text-white px-6 py-3 rounded-md hover:bg-[#A67C29] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const pathSegments = ["Shop", furniture.name];

  return (
    <div className="min-h-screen">
      <div className="bg-[#F9F1E7] py-6">
        <div className="mx-auto  w-full max-w-[1440px] px-4 lg:px-12">
          <NavDisplay pathSegments={pathSegments} />
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="max-w-[1440px] mx-auto px-4 lg:px-12 py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="relative bg-[#F9F1E7] rounded-lg overflow-hidden">
              {!imageError ? (
                <Image
                  src={furniture.image_url}
                  alt={furniture.name}
                  width={600}
                  height={600}
                  className="w-full h-[500px] object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-[500px] bg-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-gray-500 mb-2">
                      Image not available
                    </div>
                    <div className="text-6xl text-gray-400">🪑</div>
                  </div>
                </div>
              )}

              {furniture.discount_percent && (
                <span className="absolute top-4 right-4 h-12 w-12 rounded-full bg-red-400 text-white flex items-center justify-center font-medium text-sm">
                  -{furniture.discount_percent}%
                </span>
              )}
              {furniture.new && (
                <span className="absolute top-4 left-4 h-12 w-12 rounded-full bg-[#2EC1AC] text-white flex items-center justify-center font-medium text-sm">
                  New!
                </span>
              )}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {furniture.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {furniture.description}
              </p>

              <div className="flex items-center gap-4 mb-6">
                {furniture.discount_price ? (
                  <>
                    <span className="text-3xl font-bold text-[#B88E2F]">
                      ₦{furniture.discount_price.toLocaleString()}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ₦{furniture.price.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-[#B88E2F]">
                    ₦{furniture.price.toLocaleString()}
                  </span>
                )}
              </div>

              {furniture.furniture_details?.review !== undefined && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => {
                      const rating = furniture.furniture_details!.review;
                      const isFullStar = i < Math.floor(rating);
                      const isHalfStar =
                        i === Math.floor(rating) && rating % 1 >= 0.5;

                      if (isFullStar) {
                        return (
                          <Star
                            key={i}
                            size={20}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        );
                      } else if (isHalfStar) {
                        return (
                          <div key={i} className="relative">
                            <Star size={20} className="text-gray-300" />
                            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                              <Star
                                size={20}
                                className="fill-yellow-400 text-yellow-400"
                              />
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <Star key={i} size={20} className="text-gray-300" />
                        );
                      }
                    })}
                  </div>
                  <span className="text-gray-600">
                    ({furniture.furniture_details.review}/5)
                  </span>
                </div>
              )}

              {furniture.furniture_details?.short_description && (
                <p className="text-gray-700 mb-6">
                  {furniture.furniture_details.short_description}
                </p>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={decreaseQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 px-8 rounded-md font-semibold transition-colors ${
                    isInCart
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-[#B88E2F] text-white hover:bg-[#A67C29]"
                  }`}
                >
                  {isInCart ? "Remove from Cart" : "Add to Cart"}
                </motion.button>

                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLikeToggle}
                    className={`p-4 rounded-md border transition-colors ${
                      isLiked
                        ? "bg-red-50 border-red-200 text-red-500"
                        : "bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Heart
                      size={20}
                      className={isLiked ? "fill-red-500" : ""}
                    />
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="p-4 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Share2 size={20} />
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="p-4 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <BsArrowLeftRight size={20} />
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-3 text-sm">
              {furniture.furniture_details?.sku && (
                <div className="flex">
                  <span className="font-medium text-gray-700 w-24">SKU:</span>
                  <span className="text-gray-600">
                    {furniture.furniture_details.sku}
                  </span>
                </div>
              )}
              <div className="flex">
                <span className="font-medium text-gray-700 w-24">
                  Category:
                </span>
                <span className="text-gray-600 capitalize">
                  {furniture.tag}
                </span>
              </div>
              {furniture.furniture_details?.origin_of_manufacture && (
                <div className="flex">
                  <span className="font-medium text-gray-700 w-24">
                    Origin:
                  </span>
                  <span className="text-gray-600">
                    {furniture.furniture_details.origin_of_manufacture}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {furniture.furniture_details && (
          <motion.div
            variants={fadeInUp}
            className="border-t border-gray-200 pt-12"
          >
            <div className="flex flex-wrap gap-8 border-b border-gray-200 mb-8">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-4 font-medium transition-colors ${
                  activeTab === "description"
                    ? "text-[#B88E2F] border-b-2 border-[#B88E2F]"
                    : "text-gray-600 hover:text-[#B88E2F]"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={`pb-4 font-medium transition-colors ${
                  activeTab === "specifications"
                    ? "text-[#B88E2F] border-b-2 border-[#B88E2F]"
                    : "text-gray-600 hover:text-[#B88E2F]"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("warranty")}
                className={`pb-4 font-medium transition-colors ${
                  activeTab === "warranty"
                    ? "text-[#B88E2F] border-b-2 border-[#B88E2F]"
                    : "text-gray-600 hover:text-[#B88E2F]"
                }`}
              >
                Warranty
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {activeTab === "description" && (
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Product Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {furniture.furniture_details.full_description}
                  </p>
                  {furniture.furniture_details.sales_package && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Sales Package
                      </h4>
                      <p className="text-gray-700">
                        {furniture.furniture_details.sales_package}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg text-gray-900">
                        General
                      </h4>
                      <div className="space-y-3 text-sm">
                        {furniture.furniture_details.model_number && (
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium text-gray-700">
                              Model Number:
                            </span>
                            <span className="text-gray-600">
                              {furniture.furniture_details.model_number}
                            </span>
                          </div>
                        )}
                        {furniture.furniture_details.secondary_material && (
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium text-gray-700">
                              Material:
                            </span>
                            <span className="text-gray-600">
                              {furniture.furniture_details.secondary_material}
                            </span>
                          </div>
                        )}
                        {furniture.furniture_details.config && (
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium text-gray-700">
                              Configuration:
                            </span>
                            <span className="text-gray-600">
                              {furniture.furniture_details.config}
                            </span>
                          </div>
                        )}
                        {furniture.furniture_details.finish_type && (
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium text-gray-700">
                              Finish:
                            </span>
                            <span className="text-gray-600">
                              {furniture.furniture_details.finish_type}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg text-gray-900">
                        Dimensions
                      </h4>
                      <div className="space-y-3 text-sm">
                        {furniture.furniture_details.width && (
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium text-gray-700">
                              Width:
                            </span>
                            <span className="text-gray-600">
                              {furniture.furniture_details.width} cm
                            </span>
                          </div>
                        )}
                        {furniture.furniture_details.height && (
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium text-gray-700">
                              Height:
                            </span>
                            <span className="text-gray-600">
                              {furniture.furniture_details.height} cm
                            </span>
                          </div>
                        )}
                        {furniture.furniture_details.depth && (
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium text-gray-700">
                              Depth:
                            </span>
                            <span className="text-gray-600">
                              {furniture.furniture_details.depth} cm
                            </span>
                          </div>
                        )}
                        {furniture.furniture_details.weight && (
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium text-gray-700">
                              Weight:
                            </span>
                            <span className="text-gray-600">
                              {furniture.furniture_details.weight} kg
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "warranty" && (
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Warranty Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {furniture.furniture_details.warranty_summary && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Warranty Summary
                          </h4>
                          <p className="text-gray-700">
                            {furniture.furniture_details.warranty_summary}
                          </p>
                        </div>
                      )}
                      {furniture.furniture_details.domestic_warranty && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Domestic Warranty
                          </h4>
                          <p className="text-gray-700">
                            {furniture.furniture_details.domestic_warranty}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      {furniture.furniture_details.covered_in_warranty && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Covered in Warranty
                          </h4>
                          <p className="text-gray-700">
                            {furniture.furniture_details.covered_in_warranty}
                          </p>
                        </div>
                      )}
                      {furniture.furniture_details.not_covered_in_warranty && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Not Covered in Warranty
                          </h4>
                          <p className="text-gray-700">
                            {
                              furniture.furniture_details
                                .not_covered_in_warranty
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {relatedFurniture.length > 0 && (
          <motion.div
            variants={fadeInUp}
            className="mt-16 pt-12 border-t border-gray-200"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Related Products
              </h2>
              <p className="text-gray-600 mb-4">
                More {furniture?.tag.toLowerCase()} furniture you might like
              </p>
            </div>

            {loadingRelated ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-300 rounded-lg h-[400px] animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {relatedFurniture.map((relatedItem) => (
                  <motion.div key={relatedItem.id} variants={fadeInUp}>
                    <FurnitureCard furniture={relatedItem} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        <motion.div
          variants={fadeInUp}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#B88E2F] hover:text-[#A67C29] transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
}
