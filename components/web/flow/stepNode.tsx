import { DummyNode } from "@/data/dummyFlows";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { MoveRight, ShieldCheck, Zap, Activity } from "lucide-react";

const THEMES = {
  purple: {
    base: "#8B5CF6",
    border: "group-hover:border-[#8B5CF6]/50",
    glow: "rgba(139, 92, 246, 0.2)",
  },
  blue: {
    base: "#0EA5E9",
    border: "group-hover:border-[#0EA5E9]/50",
    glow: "rgba(14, 165, 233, 0.2)",
  },
  pink: {
    base: "#F43F5E",
    border: "group-hover:border-[#F43F5E]/50",
    glow: "rgba(244, 63, 94, 0.2)",
  },
  emerald: {
    base: "#10B981",
    border: "group-hover:border-[#10B981]/50",
    glow: "rgba(16, 185, 129, 0.2)",
  },
  orange: {
    base: "#F59E0B",
    border: "group-hover:border-[#F59E0B]/50",
    glow: "rgba(245, 158, 11, 0.2)",
  },
};

export default function StepNode({ data, selected }: NodeProps<any>) {
  const activeTheme =
    THEMES[data.color as keyof typeof THEMES] || THEMES.purple;

  return (
    <div className="group relative">
      {/*  glow */}
      <div
        className={`absolute -inset-4 rounded-[2rem] blur-3xl transition-all duration-1000 pointer-events-none ${
          selected ? "opacity-20" : "opacity-0 group-hover:opacity-10"
        }`}
        style={{ backgroundColor: activeTheme.base }}
      />

      {/* MAIN CARD */}
      <div
        className={`relative min-w-64 bg-[#050506] border transition-all duration-500 shadow-2xl overflow-hidden rounded-xl ${
          selected
            ? "border-white/30 shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]"
            : "border-white/10"
        } ${activeTheme.border}`}
      >
        {/*background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${activeTheme.base} 0.5px, transparent 0.5px)`,
            backgroundSize: "12px 12px",
          }}
        />

        {/*  light  on hover */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
        </div>

        {/* Top  Line */}
        <div
          className="absolute top-0 left-0 w-full h-[1px] opacity-50"
          style={{
            background: `linear-gradient(90deg, transparent, ${activeTheme.base}, transparent)`,
          }}
        />

        <div className="p-4 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap
                size={10}
                style={{ color: activeTheme.base }}
                className={selected ? "animate-pulse" : ""}
              />
              <span className="text-[9px] font-mono text-white/20 tracking-[0.2em] uppercase font-bold">
                MTX::{data.id}
              </span>
            </div>

            {/* STATUS BAR */}
            <div className="flex items-center gap-1.5">
              {selected ? (
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 animate-in zoom-in duration-300">
                  <span className="relative flex h-1 w-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-500"></span>
                  </span>
                  <span className="text-[7px] font-black text-emerald-500 uppercase tracking-tighter">
                    Live
                  </span>
                </div>
              ) : (
                <div className="px-1.5 py-0.5 rounded-md bg-white/[0.03] border border-white/5 opacity-40">
                  <span className="text-[7px] font-bold text-white/30 uppercase tracking-tighter tracking-widest">
                    Idle
                  </span>
                </div>
              )}
            </div>
          </div>

          <h3 className="text-[14px] font-black text-white mb-1 tracking-tight">
            {data.label}
          </h3>
          <p className="text-[11px] text-white/40 leading-relaxed mb-4 line-clamp-2 font-medium">
            {data.description}
          </p>

          {/* Progress Section */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex flex-col gap-1.5 w-24">
              <div className="flex justify-between text-[7px] font-mono text-white/20 uppercase font-bold">
                <span>Signal</span>
                <span style={{ color: activeTheme.base }}>
                  {data.progress}%
                </span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-[1.5s] ease-in-out relative"
                  style={{
                    width: `${data.progress}%`,
                    backgroundColor: activeTheme.base,
                  }}
                >
                  {/*  Flow Animation in bar */}
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] w-8 animate-[shimmer_1.5s_infinite]" />
                </div>
              </div>
            </div>

            {/* OPEN LOGIC BUTTON */}
            <div
              className="group/btn flex items-center gap-2 text-[10px] font-black tracking-widest cursor-pointer transition-all active:scale-95"
              style={{ color: activeTheme.base }}
            >
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

        {/*  Handles */}
        <Handle
          type="target"
          position={Position.Left}
          className="!w-12 !h-[2px] !border-none !rounded-none !-top-[1px] !bg-white/10 hover:!bg-white/40 transition-colors"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!w-12 !h-[2px] !border-none !rounded-none !-bottom-[1px] !bg-white/10 hover:!bg-white/40 transition-colors"
        />
      </div>
    </div>
  );
}
