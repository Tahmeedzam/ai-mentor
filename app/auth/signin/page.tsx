import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const App = () => {
  return (
    <div className="login-container min-h-screen w-screen flex justify-end pr-50 pt-60">
      <div className="flex flex-col items-center gap-5 relative -top-14">
        <div className="text-center">
          <h1 className="text-[44px] leading-tight">
            Scratch to
            <br />
            Production
          </h1>

          <p className="text-sm text-muted-foreground mt-1 font-bold">
            AI for Builders
          </p>
        </div>

        <Card className="login-card flex flex-col gap-4 w-105 p-5">
          <Button
            variant="outline"
            className="cursor-pointer py-5 rounded-xl w-full flex items-center gap-2"
          >
            <img src="/google.svg" alt="" height={18} width={18} aria-hidden />
            Continue with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">or</p>

          <form className="flex flex-col gap-4 ">
            <Input type="email" placeholder="Enter your email" required />
            <Input type="password" placeholder="Enter your password" required />
            <Button className="w-full">Continue with Email</Button>
          </form>

          <p className="text-xs text-muted-foreground text-center">
            By continuing, you agree to our terms and privacy policy.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default App;
