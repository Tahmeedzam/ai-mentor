"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "../../ui/button";
import { Send } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChatPanelOngoing({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const [input, setInput] = useState("");

  const router = useRouter();

  return (
    <div className="flex flex-col h-full w-full bg-[#121212]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">MentorFlow Chat</h2>
        <p className="text-sm text-white/50">Describe what you want to build</p>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 text-sm text-white/60">
        Mentor messages will appear here
      </div>

      {/* Input area */}
      <div className="px-6 py-4 border-t border-white/10">
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. I want to build an AI project manager"
            className="pr-12 resize-none bg-[#1A1A1A] border-white/10"
          />
          <Button
            size="icon"
            className="absolute bottom-2 right-2"
            onClick={() => {
              if (!input) return;
              onSend(input);
              setInput("");
            }}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
