import { DummyNode } from "@/data/dummyFlows";
import { Handle, Position } from "@xyflow/react";
import { MoveRight } from "lucide-react";

const THEMES = {
  purple: { base: "#8B5CF6", border: "group-hover:border-[#8B5CF6]/40" },
  blue: { base: "#0EA5E9", border: "group-hover:border-[#0EA5E9]/40" },
  pink: { base: "#F43F5E", border: "group-hover:border-[#F43F5E]/40" },
  emerald: { base: "#10B981", border: "group-hover:border-[#10B981]/40" },
};

export default function LogosNode({ data }: { data: DummyNode }) {
  const activeTheme = THEMES[data.color] || THEMES.purple;

  return (
    <div className="group relative">
      {/* Glow */}
      <div
        className="absolute -inset-2 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ backgroundColor: `${activeTheme.base}15` }}
      />

      {/* Main Card */}
      <div
        className={`relative min-w-64 bg-[#0A0A0B] border border-white/10 rounded-xl overflow-hidden transition-all shadow-2xl ${activeTheme.border}`}
      >
        {/* Top Line */}
        <div
          className="absolute top-0 left-0 w-full h-0.5"
          style={{
            background: `linear-gradient(to right, transparent, ${activeTheme.base}, transparent)`,
          }}
        />

        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-mono text-white/40 tracking-[0.2em] uppercase">
              Nodeee {data.id}
            </span>
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: activeTheme.base,
                boxShadow: `0 0 8px ${activeTheme.base}`,
              }}
            />
          </div>

          <h3 className="text-[14px] font-bold text-slate-100 mb-1">
            {data.label}
          </h3>
          <p className="text-[11px] text-white/40 leading-relaxed mb-4 line-clamp-2">
            {data.description}
          </p>

          {/* Progress */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex flex-col gap-1 w-24">
              <div className="flex justify-between text-[7px] font-mono text-white/30 uppercase">
                <span>Status</span>
                <span>{data.progress}%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-1000 shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                  style={{
                    width: `${data.progress}%`,
                    backgroundColor: activeTheme.base,
                  }}
                />
              </div>
            </div>

            {/* OPEN LOGIC BUTTON */}
            <div
              className="flex items-center gap-1.5 text-[10px] font-bold tracking-tighter cursor-pointer transition-all active:scale-95"
              style={{ color: activeTheme.base }}
            >
              <span>OPEN LOGIC</span>
              <MoveRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <Handle
          type="target"
          position={Position.Top}
          className="!w-10 !h-[1px] !border-none !rounded-none !-top-[1px]"
          style={{ backgroundColor: `${activeTheme.base}40` }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="!w-10 !h-[1px] !border-none !rounded-none !-bottom-[1px]"
          style={{ backgroundColor: `${activeTheme.base}40` }}
        />
      </div>
    </div>
  );
}
