"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { svgPath } from "@/data/const";

const AnimatedSvg = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  return (
    <div className="">
      <motion.svg
        width="600"
        height="600"
        viewBox="0 0 873 1618"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.path
          d={svgPath}
          stroke="white"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isAnimating ? 1 : 0 }}
          transition={{
            duration: 2,
            delay: 1.5,
          }}
        />
      </motion.svg>
    </div>
  );
};

export default AnimatedSvg;
