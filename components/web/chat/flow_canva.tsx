"use client";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  OnEdgesChange,
  ConnectionMode,
} from "@xyflow/react";
import { Boxes, MousePointer2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { FlowResponse } from "@/lib/flow/flowSchema";
import StepNode from "@/components/web/flow/stepNode";
// import { overviewFlow, roadmapFlow } from "@/data/dummyFlows";
import { useParams, useRouter } from "next/navigation";
import { dummyNodeMap } from "@/data/dummyFlows";
import { simpleAppFlow } from "@/lib/flow/dummy/flow.template";
import { adaptFlowToReactFlow } from "@/lib/flow/adapters/reactflow.adapter";
import { FlowGraph } from "@/lib/flow/types";
import type { Connection, OnConnect } from "@xyflow/react";
import FlowCardBar from "../flow/flowCardBar";
import { validateFlow } from "@/lib/flow/validation/validateFlow";
import { getFlowIssues } from "@/lib/flow/validation/getFlowIssues";

type StepNodeData = {
  label: string;
};

export default function ArchitectureCanvas() {
  // const [nodes, setNodes, onNodesChange] = useNodesState<Node<StepNodeData>>(
  //   [],
  // );
  // const [edges, setEdges] = useEdgesState<Edge>([]);
  const [flowGraph, setFlowGraph] = useState<FlowGraph>(simpleAppFlow);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const { chatid } = useParams<{ chatid: string }>();
  const { theme } = useTheme();
  const validatedFlow = validateFlow(flowGraph);
  const flowIssues = getFlowIssues(validatedFlow);
  const { nodes, edges } = adaptFlowToReactFlow(validatedFlow);
  const isEmpty = nodes.length === 0;
  const router = useRouter();
  const selectedNode = selectedNodeId ? dummyNodeMap[selectedNodeId] : null;

  const handleAIResponse = (data: FlowResponse) => {
    const newNodes: Node<StepNodeData>[] = data.steps.map((step, index) => ({
      id: step.id,
      type: "step",
      data: { label: step.label },
      position: { x: index * 250, y: 0 },
    }));

    const newEdges: Edge[] = data.connections.map((conn) => ({
      id: `e-${conn.from}-${conn.to}`,
      source: conn.from,
      target: conn.to,
      animated: true,
    }));

    // setNodes(newNodes);
    // setEdges(newEdges);
  };

  const onEdgesChange: OnEdgesChange = (changes) => {
    const removedEdgeIds = changes
      .filter((c) => c.type === "remove")
      .map((c) => c.id);

    if (removedEdgeIds.length === 0) return;

    setFlowGraph((prev) => ({
      ...prev,
      edges: prev.edges.filter((edge) => !removedEdgeIds.includes(edge.id)),
    }));
  };

  const onConnect: OnConnect = (connection: Connection) => {
    if (!connection.source || !connection.target) return;

    setFlowGraph((prev) => ({
      ...prev,
      edges: [
        ...prev.edges,
        {
          id: `e-${connection.source}-${connection.target}-${Date.now()}`,
          source: connection.source,
          target: connection.target,
          type: "required", // v1 default
        },
      ],
    }));
  };

  // Only for dummy data
  const buildFlowFromDummy = (): {
    nodes: Node<{ label: string }>[];
    edges: Edge[];
  } => {
    const nodes: Node<{ label: string }>[] = [];
    const edges: Edge[] = [];
    const order = ["user", "frontend", "ai"]; // 👈 layout order

    order.forEach((id, index) => {
      const node = dummyNodeMap[id];
      nodes.push({
        id: node.id,
        type: "step",
        data: { label: node.label },
        position: { x: index * 250, y: 100 },
      });

      if (index > 0) {
        edges.push({
          id: `e-${order[index - 1]}-${id}`,
          source: order[index - 1],
          target: id,
        });
      }
    });

    return { nodes, edges };
  };

  const handleNodeClick = (_: any, node: Node<{ label: string }>) => {
    setSelectedNodeId(node.id);
  };

  useEffect(() => {
    const { nodes, edges } = adaptFlowToReactFlow(flowGraph);
    // setNodes(nodes);
    // setEdges(edges);
  }, [flowGraph]);

  (globalThis as any).__FLOW_HANDLE__ = handleAIResponse;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
            <Boxes className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              Project Architecture / Flow
            </h2>
            <p className="text-xs text-muted-foreground">
              Generated based on chat input
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          <MousePointer2 className="w-3.5 h-3.5" />
          <span>Interactive</span>
        </div>
      </div>
      <button
        onClick={() =>
          setFlowGraph((prev) => ({
            ...prev,
            nodes: prev.nodes.filter((n) => n.id !== "database"),
          }))
        }
      >
        Remove Database
      </button>

      {/* Canvas */}
      <div className="flex-1 relative min-h-0 rounded-lg overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          className="text-black"
          nodesDraggable={true}
          nodesConnectable={true}
          panOnDrag={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          panOnScroll={false}
          edgesFocusable={true}
          elementsSelectable
          proOptions={{ hideAttribution: true }}
          nodeTypes={{ step: StepNode }}
          onNodeClick={handleNodeClick}
          onPaneClick={() => setSelectedNodeId(null)}
          deleteKeyCode={["Backspace", "Delete"]}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionMode={ConnectionMode.Loose}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            bgColor={theme === "dark" ? "#202020" : "#F9FAFF"}
          />
          <Controls className="text-black" />
          {/* <MiniMap /> */}
        </ReactFlow>

        {/* each Node sidebar */}
        {selectedNode && (
          <FlowCardBar
            node={selectedNode}
            onClose={() => setSelectedNodeId(null)}
          />
        )}

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
