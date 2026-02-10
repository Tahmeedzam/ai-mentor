"use client";

import ChatPanelOngoing from "@/components/web/chat/chat_panel_ongoing";
import ArchitectureCanvas from "@/components/web/chat/flow_canva";

export default function Home() {
  async function handleSend(message: string) {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    (globalThis as any).__FLOW_HANDLE__?.(data);
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <div className="w-1/4 min-w-[320px] bg-[#121212] p-4">
        <ChatPanelOngoing onSend={handleSend} />
      </div>

      <div className="flex-1 bg-[#202020] p-4 min-h-0">
        <ArchitectureCanvas />
      </div>
    </div>
  );
}
