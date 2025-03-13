"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Aurora from "../../Backgrounds/Aurora/Aurora";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: "Watch Live", path: "/watch-live" },
    { name: "Featuring", path: "/featuring" },
    { name: "About Open Heavens", path: "/about" },
    { name: "FAQs", path: "/faqs" },
    { name: "Share", path: "/share" },
    { name: "Connect", path: "/connect" },
  ];

  return (
    <header className="relative w-full top-0 z-50 text-[#EDEDED] bg-[#1A1A2E]">
      {/* Aurora Background */}
      <div className="absolute inset-0 w-full h-full z-[-1]">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={3.0}
          speed={1.5}
        />
      </div>

      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <a
          href="/"
          className="text-3xl font-extrabold tracking-wide text-[#EDEDED]"
        >
          Open Heavens
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-[#EDEDED] hover:text-[#FFD700] transition text-lg font-semibold"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-[#EDEDED] z-50" onClick={toggleMenu}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-[#151A30] shadow-lg absolute w-full left-0 top-full p-6 flex flex-col space-y-4 text-center transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.path}
            className="text-[#EDEDED] hover:text-[#FFD700] text-lg font-semibold transition"
            onClick={closeMenu}
          >
            {link.name}
          </a>
        ))}
      </div>
    </header>
  );
}

export default Header;
