import { motion } from "framer-motion";
import { fadeInUp } from "./motion";

export function SkeletonLoader() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="flex flex-col gap-3 animate-pulse"
    >
      <div className="bg-gray-300 w-[300px] h-[200px] rounded-md"></div>
      <div className="bg-gray-300 w-[60%] h-4 rounded-md"></div>
      <div className="bg-gray-300 w-[80%] h-4 rounded-md"></div>
      <div className="bg-gray-300 w-[40%] h-4 rounded-md"></div>
    </motion.div>
  );
}