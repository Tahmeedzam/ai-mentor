"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChatPanelNew({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const [input, setInput] = useState("");

  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl px-4">
      <h2 className="text-4xl font-semibold text-center">
        What are you creating today?
      </h2>

      <div className="w-full relative">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your idea, project, or problem…"
          className="min-h-[60px] pr-12 py-4 text-base leading-relaxed resize-none bg-[#1A1A1A] border-white/10 placeholder:text-[#A1A1AA]"
        />

        <Button
          size="icon"
          className="absolute bottom-3 right-3"
          onClick={() => {
            router.push("/chat/1");
          }}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
