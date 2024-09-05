import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Link from "next/link";

const SocialIcons = ({ size = 24 }) => (
  <div className="text-center">
    <h1 className="text-3xl font-thin text-[#a7cbeb] py-4">
      renjoangeles@gmail.com
    </h1>
    <ul className="social flex justify-center space-x-4">
      <li className="social-item">
        <Link
          href="https://www.linkedin.com/in/renjo-angeles-03b37125a/"
          className="social-link hover:text-blue-500 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={size} />
        </Link>
      </li>
      <li className="social-item">
        <Link
          href="https://github.com/angeles-renjo"
          className="social-link hover:text-gray-500 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={size} />
        </Link>
      </li>
    </ul>
  </div>
);

export default SocialIcons;
