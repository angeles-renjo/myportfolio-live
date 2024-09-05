"use client";
import { useState, useEffect } from "react";
import Scene from "@/components/Sphere";
import Link from "next/link";

export default function Home() {
  const [screenSize, setScreenSize] = useState("large");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("small");
      } else if (window.innerWidth < 1024) {
        setScreenSize("medium");
      } else {
        setScreenSize("large");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="flex min-h-screen bg-black text-white w-full p-4 sm:p-6 md:p-8">
      <div className="pt-20 flex items-center lg:px-10  flex-col justify-between w-full lg:flex-row">
        {/* Text content */}
        <div className="w-full flex flex-col items-center lg:items-start ">
          <h1 className="text-center text-4xl p-2 lg:text-nowrap lg:text-7xl">
            Hi,
            <span className="text-[#a7cbeb] block lg:inline">
              I'm Renjo Angeles
            </span>
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up">
            Web and Mobile Developer
          </h2>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center lg:justify-start">
            <Link
              href="/work"
              className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300"
            >
              My Work
            </Link>
            <Link
              href="/contact"
              className="border border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition-colors duration-300"
            >
              Contact Me
            </Link>
          </div>
        </div>

        {/* Scene component */}
        <div className="w-full ">
          <Scene />
        </div>
      </div>
    </main>
  );
}
