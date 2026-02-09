import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Playfair_Display, Libre_Baskerville } from "next/font/google";

const Libre_Baskerville600 = Libre_Baskerville({
  subsets: ["latin"],
  weight: "600",
});

const LoginCard = () => {
  return (
    <div className="flex flex-col items-center gap-5 relative -top-14  max-w-135.75 w-full">
      <div className="text-center">
        <h1 className={` text-[44px] ${Libre_Baskerville600.className}`}>
          Scratch to
          <br />
          Production
        </h1>

        <p className="text-sm text-muted-foreground mt-1 font-bold ">
          AI for Builders
        </p>
      </div>

      <Card className="login-card flex flex-col gap-4 w-105 p-5 justify-center items-center">
        <Button
          variant="outline"
          className="cursor-pointer py-5 rounded-xl w-80 flex items-center gap-2"
        >
          <img src="/google.svg" alt="" height={18} width={18} aria-hidden />
          Continue with Google
        </Button>

        <p className="text-center text-sm text-muted-foreground ">or</p>

        <form className="flex flex-col gap-4  w-80 ">
          <Input type="email" placeholder="Enter your email" required />
          <Input type="password" placeholder="Enter your password" required />
          <Button className={` ${Libre_Baskerville600.className}`}>
            Continue with Email
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center">
          By continuing, you agree to our terms and privacy policy.
        </p>
      </Card>
    </div>
  );
};
export default LoginCard;
