import { NodeStatus } from "@/lib/flow/schema/node.schema";
import { Handle, Position } from "@xyflow/react";
import { useMemo } from "react";

const GRADIENTS = [
  "from-violet-600 to-indigo-600",
  "from-fuchsia-600 to-purple-600",
  "from-sky-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
];

export interface NodeData {
  label: string;
  status: NodeStatus;
}

export default function StepNode({ data }: { data: NodeData }) {
  // Pick a gradient ONCE per node (stable)
  const gradient = useMemo(() => {
    const hash = Array.from(data.label).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0,
    );
    return GRADIENTS[hash % GRADIENTS.length];
  }, [data.label]);

  return (
    <div
      className={`
        relative rounded-2xl px-4 py-3 min-w-[180px]
        bg-gradient-to-br ${gradient}
      ${data.status === "error" ? "border-2 border-red-400" : "border border-white/10"}
        shadow-[0_10px_30px_rgba(0,0,0,0.25)]
        backdrop-blur-sm
        transition-all duration-200
        hover:scale-[1.03] hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)]
        
      `}
    >
      {/* Glow */}
      <div className="pointer-events-auto absolute inset-0 rounded-2xl bg-white/10 opacity-0 hover:opacity-100 transition" />

      {/* Label */}
      <div className="relative text-sm font-semibold text-center text-white">
        {data.label}
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-white !border-none"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-white !border-none"
      />
    </div>
  );
}
