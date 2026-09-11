"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FurnitureProps } from "@/types/type";
import { useCart } from "@/context/CartContext";
import { useLikedItems } from "@/context/LikedItemsContext";
import { Heart, Star, Plus, Minus, ArrowLeft, Share2 } from "lucide-react";
import { Footer } from "@/components/Footer";
import { NavDisplay } from "@/components/NavDisplay";
import { FurnitureCard } from "@/components/FurnitureCard";
import { fadeInUp, staggerChildren } from "@/components/animations/motion";
import { Product } from "@/services/products";
import { Category } from "@/services/categories";

interface FurnitureDetailsProps {
  product: Product;
  relatedProducts: Product[];
}

export default function FurnitureClient({ product, relatedProducts }: FurnitureDetailsProps) {
  const router = useRouter();
  const [relatedFurniture, setRelatedFurniture] = useState<FurnitureProps[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingRelated, setLoadingRelated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("description");
  const [imageError, setImageError] = useState(false);

  const { addToCart, cartItems } = useCart();
  const { likedItems, toggleLike } = useLikedItems();

  //  const fetchRelatedFurniture = async (tag: string, currentId: number) => {
  //   setLoadingRelated(true);
  //   try {
  //     const { data, error } = await FetchFurnitures();
  //     if (error) {
  //       console.error("Error fetching related furniture:", error);
  //     } else if (data) {
  //       const related = data
  //         .filter(
  //           (item) =>
  //             item.tag.toLowerCase() === tag.toLowerCase() &&
  //             item.id !== currentId
  //         )
  //         .slice(0, 4);
  //       setRelatedFurniture(related);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  //   setLoadingRelated(false);
  // };

  const isLiked = product ? likedItems.has(product.slug) : false;
  const isInCart = product
    ? cartItems?.some((item) => item.product.id === product.id)
    : false;

  const handleLikeToggle = () => {
    if (product) {
      toggleLike(product.slug);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      if (isInCart) {
        console.log("Remove from cart");
      } else {
        addToCart(product, quantity);
      }
    }
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));


  if (error || !product) {
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

  const pathSegments = ["Shop", product.name];

  return (
    <div className="min-h-screen">
      {/* <div className="bg-[#F9F1E7] py-6">
        <div className="mx-auto  w-full max-w-[1440px] px-4 lg:px-12">
          <NavDisplay pathSegments={pathSegments} />
        </div>
      </div> */}

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
                  src={product?.image_url ?? "/images/furniro_hero-bg.webp"}
                  alt={product?.name ?? "Product Image"}
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

              {product.compare_at_price && (
                <span className="absolute top-4 right-4 h-12 w-12 rounded-full bg-red-400 text-white flex items-center justify-center font-medium text-sm">
                  -{Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}%
                </span>
              )}
              {product.is_featured && (
                <span className="absolute top-4 left-4 h-12 w-12 rounded-full bg-[#2EC1AC] text-white flex items-center justify-center font-medium text-sm">
                  New!
                </span>
              )}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {product.description}
              </p>

              <div className="flex items-center gap-4 mb-6">
                {product.compare_at_price ? (
                  <>
                    <span className="text-3xl font-bold text-[#B88E2F]">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ₦{product.compare_at_price.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-[#B88E2F]">
                    ₦{product.price}
                  </span>
                )}
              </div>

              {/* {product.review !== undefined && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => {
                      const rating = product.furniture_details!.review;
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
              )} */}

              {product.short_description && (
                <p className="text-gray-700 mb-6">
                  {product.short_description}
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

                 
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-3 text-sm">
              {product.sku && (
                <div className="flex">
                  <span className="font-medium text-gray-700 w-24">SKU:</span>
                  <span className="text-gray-600">
                    {product.sku}
                  </span>
                </div>
              )}
              <div className="flex">
                <span className="font-medium text-gray-700 w-24">
                  Category:
                </span>
                <span className="text-gray-600 capitalize">
                  {product?.category?.name}
                </span>
              </div>
              {product?.specifications?.origin_of_manufacture && (
                <div className="flex">
                  <span className="font-medium text-gray-700 w-24">
                    Origin:
                  </span>
                  <span className="text-gray-600">
                    {product.specifications.origin_of_manufacture}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {product && (
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
                    {product.description}
                  </p>
                  {product?.specifications?.sales_package && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Sales Package
                      </h4>
                      <p className="text-gray-700">
                        {product.specifications.sales_package}
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
                        {product?.specifications?.model_number && (
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium text-gray-700">
                              Model Number:
                            </span>
                            <span className="text-gray-600">
                              {product.specifications.model_number}
                            </span>
                          </div>
                        )}
                        {product?.specifications?.secondary_material && (
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium text-gray-700">
                              Material:
                            </span>
                            <span className="text-gray-600">
                              {product.specifications.secondary_material}
                            </span>
                          </div>
                        )}
                        {product?.specifications?.config && (
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium text-gray-700">
                              Configuration:
                            </span>
                            <span className="text-gray-600">
                              {product.specifications.config}
                            </span>
                          </div>
                        )}
                        {product?.specifications?.finish_type && (
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium text-gray-700">
                              Finish:
                            </span>
                            <span className="text-gray-600">
                              {product.specifications.finish_type}
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
                        {product?.specifications?.width && (
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium text-gray-700">
                              Width:
                            </span>
                            <span className="text-gray-600">
                              {product.specifications.width} cm
                            </span>
                          </div>
                        )}
                        {product?.specifications?.height && (
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium text-gray-700">
                              Height:
                            </span>
                            <span className="text-gray-600">
                              {product.specifications.height} cm
                            </span>
                          </div>
                        )}
                        {product?.specifications?.depth && (
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium text-gray-700">
                              Depth:
                            </span>
                            <span className="text-gray-600">
                              {product.specifications.depth} cm
                            </span>
                          </div>
                        )}
                        {product?.specifications?.weight && (
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium text-gray-700">
                              Weight:
                            </span>
                            <span className="text-gray-600">
                              {product.specifications.weight} kg
                            </span>
                          </div>
                        )}
                         {product?.specifications?.maximum_load_capacity && (
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium text-gray-700">
                              Max Load Capacity:
                            </span>
                            <span className="text-gray-600">
                              {product.specifications.maximum_load_capacity}
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
                      {product?.specifications?.warranty_summary && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Warranty Summary
                          </h4>
                          <p className="text-gray-700">
                            {product.specifications.warranty_summary}
                          </p>
                        </div>
                      )}
                      {product?.specifications?.domestic_warranty && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Domestic Warranty
                          </h4>
                          <p className="text-gray-700">
                            {product.specifications.domestic_warranty}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      {product?.specifications?.covered_in_warranty && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Covered in Warranty
                          </h4>
                          <p className="text-gray-700">
                            {product.specifications.covered_in_warranty}
                          </p>
                        </div>
                      )}
                      {product?.specifications?.not_covered_in_warranty && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Not Covered in Warranty
                          </h4>
                          <p className="text-gray-700">
                            {
                              product.specifications
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

        {relatedProducts?.length > 0 && (
          <motion.div
            variants={fadeInUp}
            className="mt-16 pt-12 border-t border-gray-200"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Related Products
              </h2>
              <p className="text-gray-600 mb-4">
                More {product?.category?.name.toLowerCase()} furniture you might like
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
                {relatedProducts.map((relatedItem) => (
                  <motion.div key={relatedItem.id} variants={fadeInUp}>
                    <FurnitureCard product={relatedItem} />
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
