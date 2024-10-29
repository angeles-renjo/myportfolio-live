import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDatabase,
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";

const skills = [
  { name: "HTML", color: "#e34c26", icon: FaHtml5 },
  { name: "CSS", color: "#264de4", icon: FaCss3Alt },
  { name: "JS", color: "#f0db4f", icon: FaJs },
  { name: "React", color: "#61dafb", icon: FaReact },
  { name: "Next.js", color: "gray", icon: SiNextdotjs },
  { name: "Node.js", color: "#339933", icon: FaNodeJs },
  { name: "Git", color: "#f05032", icon: FaGitAlt },
  { name: "MongoDB", color: "#47a248", icon: FaDatabase },
  { name: "TailwindCSS", color: "#38b2ac", icon: SiTailwindcss },
  { name: "TypeScript", color: "#007acc", icon: SiTypescript },
];

const SkillIcon = ({ skill, isSelected, onSelect }) => {
  const Icon = skill.icon;
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        rotate: {
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      onClick={() => onSelect(skill)}
    >
      <motion.div
        className={`
          w-24 h-24 rounded-2xl flex items-center justify-center
          backdrop-blur-lg cursor-pointer
          ${isSelected ? "bg-white/20" : "bg-white/10"}
        `}
        whileHover={{
          boxShadow: `0 0 20px ${skill.color}40`,
        }}
      >
        <Icon
          className="w-12 h-12 transition-all duration-300 ease-out"
          style={{ color: skill.color }}
        />
      </motion.div>
      <motion.div
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      ></motion.div>
    </motion.div>
  );
};

const SkillDetail = ({ skill }) => (
  <motion.div
    className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3 }}
  >
    <div className="text-center p-8 rounded-3xl backdrop-blur-xl ">
      <motion.div
        className="mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <skill.icon
          className="w-24 h-24 mx-auto"
          style={{ color: skill.color }}
        />
      </motion.div>
      <motion.h2
        className="text-4xl font-thin mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {skill.name}
      </motion.h2>
    </div>
  </motion.div>
);

const SkillsList = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <div className="relative min-h-screen text-white overflow-hidden flex items-center">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br ">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>
      </div>

      {/* Content */}
      <div className="">
        <motion.div
          className="max-w-6xl mx-auto p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {skills.map((skill, index) => (
              <SkillIcon
                key={skill.name}
                skill={skill}
                isSelected={selectedSkill?.name === skill.name}
                onSelect={setSelectedSkill}
              />
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkill(null)}
            >
              <SkillDetail skill={selectedSkill} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillsList;
