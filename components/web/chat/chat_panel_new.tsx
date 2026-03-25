"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "../../ui/button";
import { Send, Search, Lightbulb, Sparkles } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Playfair_Display, Libre_Baskerville } from "next/font/google";
import { useTheme } from "next-themes";

const PlayfairDisplay600 = Playfair_Display({
  subsets: ["latin"],
  weight: "600",
});
const PlayfairDisplay400 = Playfair_Display({
  subsets: ["cyrillic"],
  weight: "400",
});

const LibreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: "500",
});

type Mode = "create" | "search";

export default function ChatPanelNew({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const [mode, setMode] = useState<Mode>("create");
  const [input, setInput] = useState("");

  // Search mode states
  const [techStack, setTechStack] = useState("");
  const [time, setTime] = useState("");
  const [cost, setCost] = useState("");
  const [people, setPeople] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const router = useRouter();
  const { theme, setTheme } = useTheme();

  async function handleSearch() {
    if (!techStack && !time && !cost && !people) return;

    setIsSearching(true);

    try {
      const res = await fetch("/api/generate-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          techStack,
          time,
          cost,
          people,
        }),
      });

      const data = await res.json();

      console.log("API RESPONSE:", data); // 🔥 DEBUG

      if (data?.ideas?.length > 0) {
        // ✅ store ALL ideas
        localStorage.setItem("generatedIdeas", JSON.stringify(data.ideas));

        router.push("/ideas");
      } else {
        console.error("No ideas returned", data);
        alert("No ideas generated. Try again.");
      }
    } catch (error) {
      console.error("Error generating ideas:", error);
      alert("Something went wrong.");
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl px-4">
      {/* Mode Toggle */}
      <div className="flex items-center gap-2 bg-[#1A1A1A] p-1 rounded-lg border border-white/10">
        <button
          onClick={() => setMode("create")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            mode === "create"
              ? "bg-[#8B5CF6] text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          Create Idea
        </button>
        <button
          onClick={() => setMode("search")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            mode === "search"
              ? "bg-[#8B5CF6] text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Search className="w-4 h-4" />
          Search Ideas
        </button>
      </div>

      {mode === "create" ? (
        <>
          <h2
            className={`text-4xl font-semibold text-center ${LibreBaskerville.className}`}
          >
            What are you creating today?
          </h2>

          <div className="w-full relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your idea, project, or problem…"
              className="min-h-[60px] pr-12 py-4 text-base leading-relaxed resize-none bg-[#1A1A1A] border-white/10 placeholder:text-[#A1A1AA]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (input.trim()) {
                    router.push("/chat/1");
                  }
                }
              }}
            />

            <Button
              size="icon"
              className="absolute bottom-3 right-3 bg-[#8B5CF6]"
              onClick={() => {
                router.push("/chat/1");
              }}
            >
              <Send className="w-4 h-4" color="white" />
            </Button>
          </div>
        </>
      ) : (
        <>
          <h2
            className={`text-4xl font-semibold text-center ${LibreBaskerville.className}`}
          >
            Find Your Perfect Project
          </h2>
          <p className="text-gray-400 text-center">
            Tell us about your resources and we'll suggest ideas
          </p>

          <div className="w-full space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Tech Stack</label>
                <Textarea
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  placeholder="e.g., React, Python, AWS..."
                  className="min-h-[50px] py-3 text-base bg-[#1A1A1A] border-white/10 placeholder:text-[#A1A1AA]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Time Available</label>
                <Textarea
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g., 2 weeks, 3 months..."
                  className="min-h-[50px] py-3 text-base bg-[#1A1A1A] border-white/10 placeholder:text-[#A1A1AA]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Budget</label>
                <Textarea
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="e.g., $1000, $5000, $10k..."
                  className="min-h-[50px] py-3 text-base bg-[#1A1A1A] border-white/10 placeholder:text-[#A1A1AA]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Team Size</label>
                <Textarea
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  placeholder="e.g., 1 person, 3 developers..."
                  className="min-h-[50px] py-3 text-base bg-[#1A1A1A] border-white/10 placeholder:text-[#A1A1AA]"
                />
              </div>
            </div>

            <Button
              className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] py-6 text-base font-medium"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  Generating Ideas...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Generate Ideas
                </span>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
