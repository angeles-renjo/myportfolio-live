"use client";
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import {
  Sphere,
  Html,
  OrbitControls,
  Trail,
  shaderMaterial,
  Text,
} from "@react-three/drei";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import { Vector3, Quaternion, MathUtils } from "three";
import { FaRegArrowAltCircleDown } from "react-icons/fa";

const skills = [
  { name: "HTML", Icon: FaIcons.FaHtml5, color: "#e34c26", level: 90 },
  { name: "CSS", Icon: FaIcons.FaCss3Alt, color: "#264de4", level: 85 },
  { name: "JS", Icon: FaIcons.FaJs, color: "#f0db4f", level: 80 },
  { name: "React", Icon: FaIcons.FaReact, color: "#61dafb", level: 75 },
  { name: "Next.js", Icon: SiIcons.SiNextdotjs, color: "#FFFFFF", level: 70 },
  { name: "Node.js", Icon: FaIcons.FaNodeJs, color: "#339933", level: 65 },
  { name: "Git", Icon: FaIcons.FaGitAlt, color: "#f05032", level: 85 },
  { name: "MongoDB", Icon: SiIcons.SiMongodb, color: "#47a248", level: 60 },
  {
    name: "TailwindCSS",
    Icon: SiIcons.SiTailwindcss,
    color: "#38b2ac",
    level: 75,
  },
  {
    name: "Typescript",
    Icon: SiIcons.SiTypescript,
    color: "#007acc",
    level: 50,
  },
];

const getIconPosition = (index, totalSkills) => {
  const phi = Math.acos(-1 + (2 * index) / totalSkills);
  const theta = Math.sqrt(totalSkills * Math.PI) * phi;
  const x = Math.cos(theta) * Math.sin(phi) * 2;
  const y = Math.sin(theta) * Math.sin(phi) * 2;
  const z = Math.cos(phi) * 2;
  return new Vector3(x, y, z);
};

const GlowShaderMaterial = shaderMaterial(
  { color: new Vector3(1, 1, 1) },
  // Vertex Shader
  `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 color;
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
      gl_FragColor = vec4(color, 1.0) * intensity;
    }
  `
);

extend({ GlowShaderMaterial });

const TrailingSphere = ({ position, color }) => {
  const ref = useRef();
  const [trail, setTrail] = useState([]);

  useFrame(() => {
    if (ref.current) {
      setTrail((prevTrail) =>
        [...prevTrail, ref.current.position.clone()].slice(-30)
      );
    }
  });

  return (
    <>
      <Trail
        width={0.15}
        length={30}
        color={color}
        attenuation={(t) => {
          return MathUtils.clamp(1 - t, 0, 1);
        }}
      >
        <mesh ref={ref} position={position}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </Trail>
      <mesh position={position}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <glowShaderMaterial
          color={
            new Vector3(
              ...color.match(/\w\w/g).map((c) => parseInt(c, 16) / 255)
            )
          }
        />
      </mesh>
    </>
  );
};

const IconSphere = ({
  isRotating,
  focusedSkill,
  setFocusedSkill,
  hoveredSkill,
  setHoveredSkill,
}) => {
  const groupRef = useRef();
  const rotationAxis = useRef(new Vector3(1, 1, 1).normalize());
  const quaternion = useRef(new Quaternion());
  const [iconPositions, setIconPositions] = useState([]);
  const time = useRef(0);

  useEffect(() => {
    const initialPositions = skills.map((_, index) =>
      getIconPosition(index, skills.length)
    );
    setIconPositions(initialPositions);
  }, []);

  const calculateTargetPosition = useCallback(
    (index, isHovered, hasHoveredSkill) => {
      if (isHovered) {
        return new Vector3(0, 0, 2.5);
      }

      const basePosition = getIconPosition(index, skills.length);

      if (hasHoveredSkill) {
        return basePosition.multiplyScalar(1.2);
      }

      return basePosition;
    },
    []
  );

  const updateIconPosition = useCallback((currentPosition, targetPosition) => {
    return currentPosition.lerp(targetPosition, 0.1);
  }, []);

  const updateAllIconPositions = useCallback(() => {
    setIconPositions((prevPositions) =>
      prevPositions.map((pos, index) => {
        const isHovered = hoveredSkill === skills[index].name;
        const hasHoveredSkill = hoveredSkill !== null;
        const targetPosition = calculateTargetPosition(
          index,
          isHovered,
          hasHoveredSkill
        );
        return updateIconPosition(pos, targetPosition);
      })
    );
  }, [hoveredSkill, calculateTargetPosition, updateIconPosition]);

  useFrame((state, delta) => {
    const shouldRotate = isRotating && !hoveredSkill;

    if (groupRef.current && shouldRotate) {
      time.current += delta;

      // Dynamic rotation axis
      const xAxis = Math.sin(time.current * 0.5) * 0.5 + 0.5;
      const yAxis = Math.sin(time.current * 0.3) * 0.5 + 0.5;
      const zAxis = Math.sin(time.current * 0.7) * 0.5 + 0.5;
      rotationAxis.current.set(xAxis, yAxis, zAxis).normalize();

      // Dynamic rotation speed
      const rotationSpeed = Math.sin(time.current) * 0.0015 + 0.003;

      quaternion.current.setFromAxisAngle(rotationAxis.current, rotationSpeed);
      groupRef.current.quaternion.multiplyQuaternions(
        quaternion.current,
        groupRef.current.quaternion
      );
    }

    updateAllIconPositions();
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[2, 64, 64]}>
        <meshBasicMaterial visible={false} />
      </Sphere>
      {skills.map((skill, index) => (
        <React.Fragment key={skill.name}>
          <SkillIcon
            skill={skill}
            position={
              iconPositions[index] || getIconPosition(index, skills.length)
            }
            isHovered={hoveredSkill === skill.name}
            hasHoveredSkill={hoveredSkill !== null}
            setFocusedSkill={setFocusedSkill}
            setHoveredSkill={setHoveredSkill}
          />
          <TrailingSphere
            position={
              iconPositions[index] || getIconPosition(index, skills.length)
            }
            color={skill.color}
          />
        </React.Fragment>
      ))}
    </group>
  );
};

const SkillIcon = ({
  skill,
  position,
  isHovered,
  hasHoveredSkill,
  setFocusedSkill,
  setHoveredSkill,
}) => {
  const getOpacity = () => (!hasHoveredSkill || isHovered ? 1 : 0.3);

  return (
    <Html position={position} center>
      <div
        className={`skill-icon ${isHovered ? "hovered" : ""}`}
        style={{
          color: skill.color,
          opacity: getOpacity(),
        }}
        onClick={() => setFocusedSkill(skill.name)}
        onMouseEnter={() => setHoveredSkill(skill.name)}
        onMouseLeave={() => setHoveredSkill(null)}
      >
        <div className={`icon-wrapper ${isHovered ? "hovered" : ""}`}>
          <skill.Icon />
        </div>
        <div className={`skill-bar ${isHovered ? "visible" : ""}`}>
          <div
            className="skill-level"
            style={{
              width: `${skill.level}%`,
              backgroundColor: skill.color,
              boxShadow: `0 0 10px ${skill.color}`,
            }}
          />
        </div>
        {isHovered && (
          <div className="skill-name">
            {skill.name} - {skill.level}%
          </div>
        )}
      </div>
    </Html>
  );
};

const RotatingText = () => {
  const textRef = useRef();

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.5;
    }
  });

  return (
    <Text
      ref={textRef}
      position={[0, 0, 0]}
      backgroundColor="Transparent"
      fontSize={0.5}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      Rotate me!
    </Text>
  );
};
const Scene = () => {
  const [isRotating, setIsRotating] = useState(true);
  const [focusedSkill, setFocusedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [globeSize, setGlobeSize] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      const minDimension = Math.min(window.innerWidth, window.innerHeight);
      setGlobeSize(minDimension / 300);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsRotating(!hoveredSkill);
  }, [hoveredSkill]);

  return (
    <div className="w-full h-[500px]  lg:h-[800px] flex flex-col">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <IconSphere
          isRotating={isRotating}
          focusedSkill={focusedSkill}
          setFocusedSkill={setFocusedSkill}
          hoveredSkill={hoveredSkill}
          setHoveredSkill={setHoveredSkill}
        />
        <RotatingText />

        <OrbitControls
          enableRotate={true}
          enableZoom={false}
          enablePan={false}
          minDistance={6}
          maxDistance={6}
        />
      </Canvas>
    </div>
  );
};

export default Scene;
