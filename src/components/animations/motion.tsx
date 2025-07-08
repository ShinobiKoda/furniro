export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export const slideInFromRight = {
  hidden: { x: "100%" },
  visible: { x: "0%", transition: { duration: 0.8, ease: "easeInOut" } },
};

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const zoomIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export const zoomOut = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export const rotateIn = {
  hidden: { rotate: -90, opacity: 0 },
  visible: {
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const slideInFromLeft = {
  hidden: { x: "-100%" },
  visible: { x: "0%", transition: { duration: 0.8, ease: "easeInOut" } },
};

export const bounce = {
  hidden: { y: 0 },
  visible: {
    y: [0, -20, 0],
    transition: {
      duration: 0.6,
      ease: "easeOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};
