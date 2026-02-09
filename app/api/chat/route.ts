import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  function extractJSON(text: string) {
    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");
    if (first === -1 || last === -1) return null;
    return text.slice(first, last + 1);
  }
  const { message } = await req.json();

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
  });
  const prompt = `
You are an API that returns ONLY valid JSON.
Do NOT include explanations, markdown, or extra text.

Return EXACTLY this JSON schema:

{
  "summary": "string",
  "steps": [
    { "id": "string", "label": "string" }
  ],
  "connections": [
    { "from": "string", "to": "string" }
  ]
}

Rules:
- Output MUST start with { and end with }
- No trailing commas
- No comments
- No extra text before or after JSON

User idea:
${message}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const rawText = result.response.text();

  const jsonText = extractJSON(rawText);
  if (!jsonText) {
    return NextResponse.json(
      { error: "No JSON found", raw: rawText },
      { status: 400 },
    );
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    return NextResponse.json(
      { error: "Bad JSON", raw: rawText },
      { status: 400 },
    );
  }

  return NextResponse.json(parsed);
}
