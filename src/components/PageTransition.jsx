"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <motion.div
        key={pathname}
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 overflow-y-auto bg-black text-white"
      >
        <div className="min-h-screen">{children}</div>
      </motion.div>
    </div>
  );
};

export default PageTransition;
