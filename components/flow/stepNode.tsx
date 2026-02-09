import { Handle, Position } from "@xyflow/react";

export default function StepNode({ data }: any) {
  return (
    <div
      className="rounded-xl px-4 py-3 min-w-[180px]
      bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg border border-white/10
      hover:scale-[1.02] transition"
    >
      <div className="text-sm font-semibold text-center">{data.label}</div>

      {/* Handles */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
