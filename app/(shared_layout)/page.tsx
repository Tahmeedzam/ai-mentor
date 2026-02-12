"use client";

import { useState } from "react";
import { Node, Edge } from "@xyflow/react";
import ChatPanelNew from "@/components/web/chat/chat_panel_new";
import { Playfair_Display } from "next/font/google";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { validateFlow } from "@/lib/flow/validation/validateFlow";
import { simpleAppFlow } from "@/lib/flow/dummy/flow.template";
import { getFlowIssues } from "@/lib/flow/validation/getFlowIssue";

const PlayfairDisplay600 = Playfair_Display({
  subsets: ["latin"],
  weight: "600",
});
const PlayfairDisplay400 = Playfair_Display({
  subsets: ["cyrillic"],
  weight: "400",
});

const validated = validateFlow(simpleAppFlow);
// console.log(validated.nodes);
const flowIssues = getFlowIssues(validated);
// console.log(flowIssues);

export default function Home() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  async function handleSend(message: string): Promise<void> {
    const text = message.toLowerCase();

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();

    console.log(data);
    function stepsToNodes(steps: any[]) {
      return steps.map((step, index) => ({
        id: step.id,
        type: "default",
        data: { label: step.label },
        position: {
          x: index * 250, // horizontal spacing
          y: 0,
        },
      }));
    }
    function connectionsToEdges(connections: any[]) {
      return connections.map((conn, index) => ({
        id: `e-${conn.from}-${conn.to}`,
        source: conn.from,
        target: conn.to,
        animated: true,
      }));
    }

    // Flow
    const nodes = stepsToNodes(data.steps);
    const edges = connectionsToEdges(data.connections);

    setNodes(nodes);
    setEdges(edges);
  }

  return (
    <div className="h-screen w-screen bg-[#121212] text-white relative">
      {/* Top-left heading */}
      <div className="absolute top-6 left-6">
        <h1 className={`text-lg font-semibold ${PlayfairDisplay600.className}`}>
          KAIROS
        </h1>
      </div>

      {/* Center content */}
      <div className="flex h-full w-full items-center justify-center">
        <ChatPanelNew onSend={handleSend} />
      </div>

      <div className="absolute top-6 right-6">
        <Link
          href="/auth/sign-in"
          className="text-sm text-gray-300 hover:text-white"
        >
          <Button variant="outline">Sign in</Button>
        </Link>
      </div>
    </div>
  );
}
