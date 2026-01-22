import Link from "next/link";


export default function Home() {
  return (
    <div className="h-full">
      HOME PAGE

      <Link href="/chat/1">CHAT PAGE</Link>
    </div>
  );
}
