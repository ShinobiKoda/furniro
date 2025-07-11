import { motion } from "framer-motion";
import { fadeInUp } from "./motion";

export function SkeletonLoader() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="flex flex-col gap-3 w-full bg-[#F4F5F7] relative max-w-sm mx-auto animate-pulse"
    >
      <div className="w-full max-w-sm min-h-[301px]">
        <div className="bg-gray-300 w-full h-[200px] rounded-md"></div>
        <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-gray-400"></div>
        <div className="w-full px-4 py-6">
          <div className="bg-gray-300 w-[60%] h-6 rounded-md mb-2"></div>
          <div className="bg-gray-300 w-[80%] h-4 rounded-md mb-4"></div>
          <div className="flex items-center justify-between">
            <div className="bg-gray-300 w-[40%] h-6 rounded-md"></div>
            <div className="bg-gray-300 w-[30%] h-4 rounded-md"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
