import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { MessageSquare, Send } from "lucide-react";

export default function ChatPanel() {
  return (
    <div className="flex flex-col h-full panel">
      {/* Header */}
      <div className="panel-header flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="panel-title">MentorFlow Chat</h2>
          <p className="panel-subtitle">Describe what you want to build</p>
        </div>
      </div>

      {/* Chat History Area */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="h-full empty-state flex-col gap-3">
          <div className="text-center">
            <p className="text-muted-foreground">Mentor conversation will appear here</p>
            <p className="text-muted-foreground/60 text-xs mt-1">
              Start by describing your project idea below
            </p>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-surface-elevated">
        <div className="relative">
          <Textarea
            placeholder="e.g. I want to build an AI-powered project management tool…"
            className="min-h-25 pr-12 resize-none bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl"
          />
          <Button
            size="icon"
            className="absolute bottom-3 right-3 h-8 w-8 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground/60 mt-2 text-center">
          Press Enter to send or click the button
        </p>
      </div>
    </div>
  );
}
