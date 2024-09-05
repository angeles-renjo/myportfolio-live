"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <nav className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-full px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
          RA
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-white hover:text-gray-300 ${
                  pathname === item.href ? "border-b-2 border-white" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white p-1 focus:outline-none focus:ring md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-black bg-opacity-95 z-40 transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="h-full flex items-center justify-center">
          <ul className="space-y-8 text-center">
            {navItems.map((item) => (
              <li
                key={item.href}
                className="transform transition-transform duration-300 hover:scale-110"
              >
                <Link
                  href={item.href}
                  className={`text-2xl font-bold text-white ${
                    pathname === item.href ? "border-b-2 border-white" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
