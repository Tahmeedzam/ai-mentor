"use client";

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import ThemeToggle from "./theme-toggle";
import { useState } from "react";
import { FiSidebar } from "react-icons/fi";
import { useTheme } from "next-themes";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`
    h-full
    ${isOpen ? "w-[18%]" : "w-[3%]"}
    flex flex-col justify-between
    ${isOpen ? "items-start" : "items-center"}
    dark:bg-[#1A1A1A] bg-white
    transition-all duration-300
    py-5
    border-r-2 border-[#2E2E2E]
    overflow-hidden
  `}
    >
      {/* TOP SECTION */}
      <div
        className={`flex flex-col gap-6 w-full ${
          isOpen ? "items-start px-4" : "items-center"
        }`}
      >
        {/* Toggle + Heading */}
        <div
          className={`flex items-center ${isOpen ? "items-end" : "items-center"}  gap-3`}
        >
          {isOpen && (
            <span className="text-sm font-semibold text-black dark:text-white">
              MentorFlow
            </span>
          )}
          <FiSidebar
            className={`text-[#A1A1AA] hover:text-black dark:hover:text-white transition-colors cursor-pointer `}
            size={20}
            onClick={toggleSidebar}
          />
          <span className="absolute left-8 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 whitespace-nowrap rounded-md bg-black text-white text-xs px-2 py-1 transition-transform">
            Toggle Sidebar
          </span>
        </div>

        {/* Menu item */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="rounded-full w-8 h-8 bg-black" />
          {isOpen && (
            <span className="text-sm text-black dark:text-white transition-opacity duration-200 opacity-100">
              Dashboard
            </span>
          )}
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div
        className={`flex flex-col gap-6 w-full ${
          isOpen ? "items-start px-4" : "items-center"
        }`}
      >
        <div className="flex items-center gap-3 cursor-pointer">
          <ThemeToggle />
          {isOpen && (
            <p className=" text-black dark:text-white transition-opacity duration-200 opacity-100">
              Theme : {theme?.toString().toUpperCase()}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="rounded-full w-8 h-8 bg-black" />
          {isOpen && (
            <span className="text-sm text-black dark:text-white transition-opacity duration-200 opacity-100">
              Profile
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
