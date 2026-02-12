import { FlowGraph } from "@/lib/flow/types";
import { Handle, Position } from "@xyflow/react";
import type { Node as RFNode, NodeProps as RFNodeProps } from "@xyflow/react";
import { MoveRight, Zap } from "lucide-react";

type StepNodeData = FlowGraph["nodes"][number];

export default function StepNode({
  data,
  selected,
}: RFNodeProps<RFNode<StepNodeData>>) {
  const isError = data.status === "error";
  const isWarning = data.status === "warning";

  return (
    <div className="group relative cursor-grab active:cursor-grabbing">
      {/* Glow */}
      <div
        className={`absolute -inset-4 rounded-[2rem] blur-3xl transition-all duration-1000 pointer-events-none ${
          isError
            ? "bg-red-500/20"
            : isWarning
              ? "bg-yellow-500/20"
              : "bg-transparent"
        }`}
      />

      {/* MAIN CARD */}
      <div
        className={`
          relative min-w-64 bg-[#050506]
          border rounded-xl overflow-hidden
          transition-all duration-300
          ${
            isError
              ? "border-red-500"
              : isWarning
                ? "border-yellow-400"
                : "border-white/10"
          }
          ${selected ? "ring-2 ring-primary" : ""}
        `}
      >
        {/* Shimmer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
        </div>

        <div className="p-4 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap size={10} />
              <span className="text-[9px] font-mono text-white/20 tracking-[0.2em] uppercase font-bold">
                MTX:
              </span>
            </div>
          </div>

          <h3 className="text-[14px] font-black text-white mb-1 tracking-tight">
            {data.title}
          </h3>

          <p className="text-[11px] text-white/40 leading-relaxed mb-4 line-clamp-2 font-medium">
            {data.description}
          </p>

          {/* Status indicator */}
          {data.status !== "ok" && (
            <div className="absolute top-2 right-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  isError ? "bg-red-500" : "bg-yellow-400"
                }`}
              />
            </div>
          )}

          {/* Bottom Section */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="text-[10px] text-white/30">
              Requires: {data.requires.length}
            </div>

            <div className="group/btn flex items-center gap-2 text-[10px] font-black tracking-widest cursor-pointer transition-all active:scale-95">
              <span className="opacity-40 group-hover/btn:opacity-100 transition-opacity uppercase">
                Logic
              </span>
              <MoveRight
                size={14}
                className="group-hover/btn:translate-x-1 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Handles */}
        <Handle
          type="target"
          position={Position.Left}
          className="!w-12 !h-[2px] !border-none !rounded-none !bg-white/20 hover:!bg-white/50 transition-colors"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!w-12 !h-[2px] !border-none !rounded-none !bg-white/20 hover:!bg-white/50 transition-colors"
        />
      </div>
    </div>
  );
}
