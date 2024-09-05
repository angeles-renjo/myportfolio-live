"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Timeline from "@/components/Timeline";
import { BsHandIndexThumb } from "react-icons/bs";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function About() {
  return (
    <main className="flex min-h-screen items-center justify-center pt-20 overflow-x-hidden p-2">
      <div className="  ">
        <section className="flex flex-col   w-full p-2 items-center justify-center lg:h-[90vh] ">
          <motion.div
            className="lg:w-2/3"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            <motion.h1
              className="text-3xl lg:text-6xl font-bold mb-2"
              variants={item}
            >
              Renjo Angeles
            </motion.h1>
            <motion.h2 className="text-xl text-gray-400 mb-4" variants={item}>
              Web and Mobile Developer
            </motion.h2>
            <motion.div className="py-2" variants={item}>
              <motion.h1 className="font-bold mb-4 text-2xl">
                Education
              </motion.h1>
              <motion.p className="italic">
                Bachelor of Computer and Information Sciences
              </motion.p>
              <motion.p className="italic">
                Auckland University of Technology
              </motion.p>
            </motion.div>

            <div className="mb-8">
              <motion.h3
                className="text-lg font-semibold text-red-500 mb-2"
                variants={item}
              >
                GET TO KNOW ME
              </motion.h3>
              <motion.h2 className="text-4xl font-bold mb-4" variants={item}>
                Integrity in code, flexibility in development
              </motion.h2>
              <motion.p className="mb-4" variants={item}>
                My journey in web and mobile development started with a strong
                foundation in computer science. As an aspiring developer, I've
                honed my skills in React, React Native, Next.js, and Node.js.
                I'm passionate about creating user-centric applications, writing
                efficient code, and collaborating within teams to build
                innovative digital solutions.
              </motion.p>
              <motion.p className="mb-4" variants={item}>
                With a Bachelor's degree in Computer and Information Sciences
                from Auckland University of Technology, I've developed a diverse
                skill set spanning front-end and back-end technologies. My
                expertise includes HTML, CSS, JavaScript, and various frameworks
                and tools essential for modern web and mobile development.
              </motion.p>
              <motion.div variants={item}>
                <Link
                  href="/contact"
                  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors inline-block"
                >
                  Get in touch
                </Link>
                <div className=" mt-4 p-4 w-full flex justify-center animate-bounce">
                  <BsHandIndexThumb size={42} className="rotate-180" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
        <motion.div className="">
          <Timeline />
        </motion.div>
      </div>
    </main>
  );
}
