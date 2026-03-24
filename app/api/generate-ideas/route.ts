import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { techStack, time, cost, people } = await req.json();

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
  });

  const prompt = `
You are an API that returns ONLY valid JSON.
Do NOT include explanations, markdown, or extra text.

Return EXACTLY this JSON schema:

{
  "ideas": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "techStack": ["string"],
      "estimatedTime": "string",
      "estimatedCost": "string",
      "teamSize": number,
      "steps": [
        { "id": "string", "label": "string" }
      ],
      "connections": [
        { "from": "string", "to": "string" }
      ]
    }
  ]
}

Rules:
- Output MUST start with { and end with }
- No trailing commas
- No comments
- No extra text before or after JSON
- Generate 2-3 project ideas that match these criteria:
  - Tech stack: ${techStack || "any"}
  - Time available: ${time || "any"}
  - Budget: ${cost || "any"}
  - Team size: ${people || "any"}
- Each idea should include a roadmap with steps and connections
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  function extractJSON(text: string) {
    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");
    if (first === -1 || last === -1) return null;
    return text.slice(first, last + 1);
  }

  const jsonText = extractJSON(text);
  if (!jsonText) {
    return NextResponse.json(
      { error: "No JSON found", raw: text },
      { status: 400 },
    );
  }

  const parsed = JSON.parse(jsonText);
  return NextResponse.json(parsed);
}