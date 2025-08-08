"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FurnitureProps } from "@/types/type";
import { FetchFurnitures } from "@/api/FetchFurnitureDetails";
import { IoBagAddOutline } from "react-icons/io5";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [allFurniture, setAllFurniture] = useState<FurnitureProps[]>([]);
  const [filteredFurniture, setFilteredFurniture] = useState<FurnitureProps[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && allFurniture.length === 0) {
      fetchFurniture();
    }
  }, [isOpen, allFurniture.length]);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredFurniture([]);
    } else {
      const filtered = allFurniture.filter(
        (furniture) =>
          furniture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          furniture.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          furniture.tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFurniture(filtered);
    }
  }, [searchQuery, allFurniture]);

  const fetchFurniture = async () => {
    setLoading(true);
    try {
      const { data, error } = await FetchFurnitures();
      if (error) {
        console.error("Error fetching furniture:", error);
      } else if (data) {
        setAllFurniture(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const handleImageError = (furnitureId: number) => {
    setImageErrors((prev) => new Set(prev).add(furnitureId));
  };

  const handleItemClick = () => {
    onClose();
    setSearchQuery("");
  };

  const handleClose = () => {
    onClose();
    setSearchQuery("");
    setFilteredFurniture([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-4 p-6 border-b border-gray-200">
                <Search size={24} className="text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for furniture..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-lg outline-none placeholder-gray-400"
                />
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-400" />
                </button>
              </div>

              {/* Results */}
              <div className="overflow-y-auto max-h-[60vh]">
                {loading && (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-gray-500">Loading furniture...</div>
                  </div>
                )}

                {!loading && searchQuery.trim() === "" && (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <Search
                        size={48}
                        className="text-gray-300 mx-auto mb-4"
                      />
                      <p className="text-gray-500">
                        Start typing to search for furniture
                      </p>
                    </div>
                  </div>
                )}

                {!loading &&
                  searchQuery.trim() !== "" &&
                  filteredFurniture.length === 0 && (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <p className="text-gray-500">
                          No furniture found matching &ldquo;{searchQuery}
                          &rdquo;
                        </p>
                      </div>
                    </div>
                  )}

                {!loading && filteredFurniture.length > 0 && (
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-4">
                      Found {filteredFurniture.length} item
                      {filteredFurniture.length !== 1 ? "s" : ""}
                    </p>
                    <div className="space-y-3">
                      {filteredFurniture.map((furniture) => (
                        <Link
                          key={furniture.id}
                          href={`/furniture/${furniture.id}`}
                          onClick={handleItemClick}
                          className="block"
                        >
                          <motion.div
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            {/* Image */}
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              {!imageErrors.has(furniture.id) ? (
                                <Image
                                  src={furniture.image_url}
                                  alt={furniture.name}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                  onError={() => handleImageError(furniture.id)}
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                  <IoBagAddOutline
                                    size={24}
                                    className="text-gray-400"
                                  />
                                </div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 truncate">
                                {furniture.name}
                              </h3>
                              <p className="text-sm text-gray-600 truncate">
                                {furniture.description}
                              </p>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
