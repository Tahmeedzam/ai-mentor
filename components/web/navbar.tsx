import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function NavigationBar() {
  return (
    <div className="w-full  h-1/12 flex justify-end bg-gray-950">
      <div className="flex gap-5 items-center pr-6">
        <Link href="/" className={buttonVariants({ variant: "default" })}>
          Login
        </Link>
        <Link
          href="/sign-up"
          className={buttonVariants({ variant: "secondary" })}
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
