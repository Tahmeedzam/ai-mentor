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
- Each idea should be unique and scalable in future, not just any random idea.
`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const text = result.response.text();
  console.log("RAW GEMINI OUTPUT:", text);

  function cleanJson(text: string) {
    return text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
  }

  let parsed;
  try {
    const cleaned = cleanJson(text);
    parsed = JSON.parse(cleaned);
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid JSON", raw: text },
      { status: 400 },
    );
  }

  return NextResponse.json(parsed);
}
