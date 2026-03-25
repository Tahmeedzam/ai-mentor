"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Idea = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  estimatedTime: string;
  estimatedCost: string;
  teamSize: number;
  steps: { id: string; label: string }[];
  connections: { from: string; to: string }[];
};
const IdeaGeneratedPage = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("generatedIdeas");
    if (stored) {
      setIdeas(JSON.parse(stored));
    }
  }, []);

  function handleSelect(idea: Idea): void {
    localStorage.setItem("selectedIdea", JSON.stringify(idea));
    router.push("/flow");
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Choose Your Idea 🚀</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {ideas.map((idea: Idea) => (
          <div
            key={idea.id}
            className="border rounded-xl p-5 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{idea.title}</h2>

            <p className="text-gray-600 mb-3">{idea.description}</p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-3">
              {idea.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-sm bg-gray-200 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Info */}
            <div className="text-sm text-gray-500 mb-4">
              ⏱ {idea.estimatedTime} | 💰 {idea.estimatedCost} | 👥{" "}
              {idea.teamSize}
            </div>

            <button
              onClick={() => handleSelect(idea)}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Build This 🚀
            </button>
          </div>
        ))}
      </div>

      {/* Generate Again */}
      <div className="mt-8 text-center">
        <button
          onClick={() => router.push("/")}
          className="text-blue-500 underline"
        >
          Generate New Ideas 🔄
        </button>
      </div>
    </div>
  );
};

export default IdeaGeneratedPage;
