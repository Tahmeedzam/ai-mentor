"use client";

import ChatPanelOngoing from "@/components/chat/chat_panel_ongoing";
import ArchitectureCanvas from "@/components/chat/flow_canva";

export default function Home() {
  async function handleSend(message: string) {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    // 🔥 Forward AI response to canvas
    (globalThis as any).__FLOW_HANDLE__?.(data);
  }

  return (
    <div className="h-full w-full flex">
      <div className="w-1/4 min-w-[320px] bg-[#121212] p-4">
        <ChatPanelOngoing onSend={handleSend} />
      </div>

      <div className="flex-1 h-full bg-[#202020] p-4">
        <ArchitectureCanvas />
      </div>
    </div>
  );
}
