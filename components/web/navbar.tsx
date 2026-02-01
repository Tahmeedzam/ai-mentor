import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import ThemeToggle from "./theme-toggle";

export default function NavigationBar() {
  return (
    <div className="h-full w-[3%] flex flex-col justify-between items-center dark:bg-[#1A1A1A] bg-white transition-all duration-300 py-5 border-r-2 border-[#2E2E2E]">
      {/* Top icons */}
      <div className="flex flex-col gap-5 items-center">
        <div className="rounded-full w-8 h-8 bg-black"></div>
        <div className="rounded-full w-8 h-8 bg-black"></div>
      </div>

      {/* Bottom icons */}
      <div className="flex flex-col gap-5 items-center">
        <ThemeToggle />
        <div className="rounded-full w-8 h-8 bg-black"></div>
      </div>
    </div>
  );
}
