"use client";

import { useState } from "react";
import ChatPanel from "@/components/chat/chat_panel_ongoing";
import ArchitectureCanvas from "@/components/chat/flow_canva";
import { overviewFlow, roadmapFlow } from "@/data/dummyFlows";
import { Node, Edge } from "@xyflow/react";
import ChatPanelOngoing from "@/components/chat/chat_panel_ongoing";

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
    <div className="h-full w-full flex">
      <div className="w-1/4 min-w-[320px] bg-[#121212] p-4">
        <ChatPanelOngoing onSend={handleSend} />
      </div>

      <div className="flex-1 h-full bg-[#202020] p-4">
        <ArchitectureCanvas nodes={nodes} edges={edges} />
      </div>
    </div>
  );
}
