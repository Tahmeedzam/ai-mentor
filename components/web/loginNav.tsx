"use client";
import React from "react";
import { Playfair_Display, Libre_Baskerville } from "next/font/google";
import GooeyNav from "@/components/ui/GooeyNav";
import { Button } from "../ui/button";

const PlayfairDisplay600 = Playfair_Display({
  subsets: ["latin"],
  weight: "600",
});

const Libre_Baskerville600 = Libre_Baskerville({
  subsets: ["latin"],
  weight: "700",
});

const NavBar = () => {
  return (
    <div className="border-b-2 border-[#2e2e2e] w-full  h-1/12 flex items-center justify-between">
      <div className=" top-6  pl-5">
        <h1 className={`text-lg font-semibold ${PlayfairDisplay600.className}`}>
          KAIROS
        </h1>
      </div>
      <div className=" top-6 pr-5 gap-4 flex ">
        <Button
          className="w-[80px] h-[35px] border-2 border-[#2e2e2e]"
          variant={"ghost"}
        >
          <p
            className={`text-xs font-semibold ${Libre_Baskerville600.className}`}
          >
            Contact
          </p>
        </Button>
        <Button className="w-[80px] h-[35px] border-2 border-[#2e2e2e]">
          <p
            className={`text-[10px] font-bold ${Libre_Baskerville600.className}`}
          >
            Try KAIROS
          </p>
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
