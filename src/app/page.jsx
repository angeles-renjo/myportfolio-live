"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import SkillsList from "@/components/SkillList";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <AnimatePresence>
      <motion.main
        className="flex min-h-screen bg-black text-white w-full p-4 sm:p-6 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pt-20 flex items-center lg:px-10 flex-col justify-between w-full lg:flex-row">
          {/* Text content */}
          <motion.div
            className="w-full flex flex-col items-center lg:items-start"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              className="text-center text-4xl p-2 lg:text-nowrap lg:text-7xl"
              variants={fadeInUp}
            >
              Hi,
              <motion.span
                className="text-[#a7cbeb] block lg:inline"
                variants={fadeInUp}
              >
                I'm Renjo Angeles
              </motion.span>
            </motion.h1>
            <motion.h2
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8"
              variants={fadeInUp}
            >
              Web and Mobile Developer
            </motion.h2>
            <motion.div
              className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center lg:justify-start"
              variants={stagger}
            >
              <motion.div variants={fadeInUp}>
                <Link
                  href="/work"
                  className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300 inline-block"
                >
                  My Work
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Link
                  href="/contact"
                  className="border border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition-colors duration-300 inline-block"
                >
                  Contact Me
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* SkillsList component */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SkillsList />
          </motion.div>
        </div>
      </motion.main>
    </AnimatePresence>
  );
}
