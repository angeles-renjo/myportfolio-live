import React from "react";
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

const SkillCard = ({ skill }) => {
  const Icon = skill.icon;

  return (
    <div className="group relative">
      {/* Main card */}
      <div
        className="
          w-24 h-24 
          rounded-xl 
          flex items-center justify-center 
          bg-black/20 
          backdrop-blur-sm
          transition-transform duration-300
          group-hover:scale-110
          border border-white/10
          relative
        "
      >
        <Icon className="w-12 h-12" style={{ color: skill.color }} />

        {/* Animated border with glowing dot */}
        <div
          className="
            absolute 
            inset-0 
            opacity-0
            group-hover:opacity-100
          "
        >
          <div
            className="
              absolute 
              w-2 h-2
              rounded-full 
              blur-[2px]
              animate-border-trace
            "
            style={{
              backgroundColor: skill.color,
              boxShadow: `0 0 15px ${skill.color}`,
            }}
          />
        </div>
      </div>

      <style>
        {`
          @keyframes border-trace {
            0% { 
              top: 0;
              left: 0;
              transform: translateX(-50%);
            }
            25% { 
              top: 0;
              left: 100%;
              transform: translateX(-50%);
            }
            50% { 
              top: 100%;
              left: 100%;
              transform: translate(-50%, -100%);
            }
            75% { 
              top: 100%;
              left: 0;
              transform: translate(-50%, -100%);
            }
            100% { 
              top: 0;
              left: 0;
              transform: translateX(-50%);
            }
          }
          
          .animate-border-trace {
            animation: border-trace 3s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

const SkillsList = () => {
  return (
    <div className="p-8">
      <div className="flex flex-wrap gap-6 justify-center">
        {skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillsList;
