import React from "react";
import { motion } from "framer-motion";
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
  { name: "HTML", color: "#e34c26", level: 90, icon: FaHtml5 },
  { name: "CSS", color: "#264de4", level: 85, icon: FaCss3Alt },
  { name: "JS", color: "#f0db4f", level: 80, icon: FaJs },
  { name: "React", color: "#61dafb", level: 75, icon: FaReact },
  { name: "Next.js", color: "#000000", level: 70, icon: SiNextdotjs },
  { name: "Node.js", color: "#339933", level: 65, icon: FaNodeJs },
  { name: "Git", color: "#f05032", level: 85, icon: FaGitAlt },
  { name: "MongoDB", color: "#47a248", level: 60, icon: FaDatabase },
  { name: "TailwindCSS", color: "#38b2ac", level: 75, icon: SiTailwindcss },
  { name: "TypeScript", color: "#007acc", level: 50, icon: SiTypescript },
];

const ProgressBar = ({ value, color }) => (
  <div className="w-full h-2 overflow-hidden">
    <motion.div
      className="h-full"
      style={{ backgroundColor: color }}
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
  </div>
);

const SkillProgress = ({ skill, index }) => {
  const Icon = skill.icon;
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Icon className="w-6 h-6 mr-2" style={{ color: skill.color }} />
          <span className="text-lg font-semibold">{skill.name}</span>
        </div>
        <motion.span
          className="text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <ProgressBar value={skill.level} color={skill.color} />
    </motion.div>
  );
};

const SkillsList = () => {
  return (
    <motion.div
      className="max-w-2xl mx-auto p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
      }}
    >
      {skills.map((skill, index) => (
        <SkillProgress key={skill.name} skill={skill} index={index} />
      ))}
    </motion.div>
  );
};

export default SkillsList;
