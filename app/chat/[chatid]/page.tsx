import ChatPanel from "@/components/chat/chat_panel";
import ArchitectureCanvas from "@/components/chat/flow_canva";
import { Textarea } from "@/components/ui/textarea";
import { ReactFlow, Node } from "@xyflow/react";
import '@xyflow/react/dist/style.css'

const nodes:Node[] =[
    {
        id:"1",
        data:{},
        position:{x:0,y:0}
    },
];

export default function Home() {
  return (
    <div className="h-11/12 w-full bg-background p-4">
      <div className="h-full flex gap-4">
        {/* Chat side */}
        <div className="w-1/4 min-w-[320px]">
          <ChatPanel />
        </div>


        {/* React Flow Canva */}
        <div className="flex-1">
          <ArchitectureCanvas/>
        </div>
      </div>
    </div>
  );
}
