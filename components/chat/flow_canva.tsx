"use client";

import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  MiniMap,
  Node,
  Edge,
} from "@xyflow/react";
import { Boxes, MousePointer2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import type { FlowResponse } from "@/lib/flow/flowSchema";
import StepNode from "@/components/flow/stepNode";

export default function ArchitectureCanvas() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { theme } = useTheme();

  const isEmpty = nodes.length === 0;

  // ✅ MOVE THIS HERE
  const handleAIResponse = (data: FlowResponse) => {
    const newNodes: Node[] = data.steps.map((step, index) => ({
      id: step.id,
      type: "default",
      data: { label: step.label },
      position: {
        x: index * 250,
        y: 0,
      },
    }));

    const newEdges: Edge[] = data.connections.map((conn) => ({
      id: `e-${conn.from}-${conn.to}`,
      source: conn.from,
      target: conn.to,
      animated: true,
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  };

  const nodeTypes = {
    step: StepNode,
  };

  // 👇 expose this to parent
  (globalThis as any).__FLOW_HANDLE__ = handleAIResponse;

  return (
    <div className="flex flex-col h-full panel">
      {/* Header */}
      <div className="panel-header flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
            <Boxes className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="panel-title">Project Architecture / Flow</h2>
            <p className="panel-subtitle">Generated based on chat input</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          <MousePointer2 className="w-3.5 h-3.5" />
          <span>Interactive</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative bg-canvas-bg">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          nodeTypes={nodeTypes}
          className="text-black"
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            bgColor={theme === "dark" ? "#202020" : "#F9FAFF"}
          />
          <Controls className="text-black" />

          <MiniMap />
        </ReactFlow>

        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <Boxes className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-muted-foreground">
                Describe your project to generate flow
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
