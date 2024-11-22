"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";

import Image from "next/image";
const featuredProjects = [
  {
    id: 1,
    title: "Virtual Assistant Portfolio Website",
    description:
      "A modern, interactive frontend portfolio website for a virtual assistant. Features include responsive design using Tailwind CSS, automated CI/CD pipeline for streamlined deployment, and engaging animations with Framer Motion and Anime.js.",
    image: "/assets/images/vaportfolio.png",
    demoLink: "https://www.juanvicenteiii.com/",
    // repoLink: "https://github.com/user/repo1",
    techStack: ["React", "Tailwind CSS", "Framer Motion", "Anime.js"],
  },
  {
    id: 2,
    title: "Trading Journal",
    description:
      "A Next.js web application for trade tracking and financial goal management. Includes data visualization for trade data, journal entry management for submitting and managing trades, and uses Prisma with PostgreSQL for efficient data handling.",
    image: "/assets/images/tradingjournal.png",
    demoLink: "https://trading-journal-live.vercel.app/",
    // repoLink: "https://github.com/user/repo2",
    techStack: ["Next.js", "Supabase", "Tremor"],
  },
  {
    id: 3,
    title: "Workout App",
    description:
      "A fitness application developed using Expo and React Native. Features daily action notifications, workout management for creating and editing plans, and a calendar view. Utilizes Supabase for backend services and React Native Calendars for the UI.",
    image: "/assets/images/workout.png",
    techStack: ["React Native", "Expo", "Supabase", "React Native Calendars"],
  },
];

const useInitialAnimation = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    setHasAnimated(true);
  }, []);
  return hasAnimated;
};

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const hasAnimated = useInitialAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const ProjectCard = ({ project }) => (
    <motion.div
      layout
      variants={itemVariants}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.03, boxShadow: "0px 5px 20px rgba(0,0,0,0.1)" }}
      onClick={() => setSelectedProject(project)}
    >
      <div className="relative w-full h-64">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techStack?.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="text-xs bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const ProjectDetail = ({ project }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={() => setSelectedProject(null)}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full p-6 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setSelectedProject(null)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <div className="relative w-full h-64 mb-4">
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack?.map((tech, index) => (
            <span
              key={index}
              className="text-sm bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <ExternalLink size={18} /> Live Demo
            </a>
          )}
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <Github size={18} /> Repository
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      initial={hasAnimated ? false : "hidden"}
      animate="visible"
      variants={containerVariants}
      className="min-h-screen py-20 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-x-hidden"
    >
      <motion.h1
        variants={itemVariants}
        className="text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent text-white"
      >
        My Work
      </motion.h1>

      <motion.div
        layout
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProject && <ProjectDetail project={selectedProject} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default Work;
