"use client";
import React, { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const Timeline = () => {
  const timelineData = [
    {
      id: 1,
      title: "Early Career",
      description: "Chef (5 years)",
    },
    {
      id: 2,
      title: "Education",
      description:
        "Bachelor of Computer and Information Sciences\nMajor in Software Development\nAuckland University of Technology",
    },
    {
      id: 3,
      title: "Transition to Tech Career",
      description:
        "Self-study and skill development\n- Advanced courses in React, Node.js, etc.\n- Personal project development",
    },
    {
      id: 4,
      title: "Projects",
      description:
        "• Trading Journal\n• Workout App\n• Tic Tac Toe\n• Weather Website\n• Crypto Coin Searcher\n• Kindred",
    },
    {
      id: 5,
      title: "Recent Work",
      description:
        "Freelance Web Development (2024)\n- Virtual Assistant Portfolio Website",
    },
  ];

  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const TimelineItem = ({ data, isLast }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, {
      amount: 0.3,
      once: false,
      margin: "0px 0px -100px 0px",
    });
    const controls = useAnimation();

    useEffect(() => {
      if (isInView) {
        controls.start("visible");
      } else {
        controls.start("exit");
      }
    }, [isInView, controls]);

    return (
      <motion.div
        ref={ref}
        className="mb-12 flex w-full"
        variants={variants}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center mr-6">
          <div className="rounded-full h-5 w-5 bg-[#a7cbeb] flex items-center justify-center"></div>
          {!isLast && <div className="h-full w-1 bg-[#d3e5f5]"></div>}
        </div>
        <div className="bg-[#f0f7fc] rounded-lg p-6 flex-grow shadow-lg">
          <h3 className="font-bold text-xl mb-2 text-[#4a90c2]">
            {data.title}
          </h3>
          <p className="text-[#2c5d7c] text-base whitespace-pre-line">
            {data.description}
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl ">
      <h2 className="text-3xl font-bold mb-12 text-center text-[#a7cbeb]">
        Career Journey
      </h2>
      {timelineData.map((data, index) => (
        <TimelineItem
          key={data.id}
          data={data}
          isLast={index === timelineData.length - 1}
        />
      ))}
    </div>
  );
};

export default Timeline;
