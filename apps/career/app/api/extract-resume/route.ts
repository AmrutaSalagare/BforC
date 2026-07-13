import { NextRequest, NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { GoogleGenAI, Type, Schema } from "@google/genai";

// Ensure the Edge Runtime or Node runtime can handle file uploads appropriately
// We use the Node runtime by default in Next.js App Router API routes, which is fine for parsing FormData.
export const maxDuration = 60; // 60 seconds to allow for file upload and Gemini generation
const MAX_RESUME_SIZE = 4 * 1024 * 1024;

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    skills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of technical and soft skills extracted from the resume",
    },
    experience: {
      type: Type.STRING,
      description: "A cohesive, professional summary of the candidate's work experience (max 3-4 paragraphs)",
    },
    education: {
      type: Type.STRING,
      description: "A summary of the candidate's educational background, degrees, and institutions",
    },
    location: {
      type: Type.STRING,
      description: "The primary city, state, or country where the candidate is located",
    },
    linkedin_url: {
      type: Type.STRING,
      description: "The candidate's LinkedIn profile URL, if present",
    },
    portfolio_url: {
      type: Type.STRING,
      description: "The candidate's personal website, GitHub, or portfolio URL, if present",
    },
  },
  required: ["skills", "experience", "education", "location"],
};

export async function POST(req: NextRequest) {
  try {
    const session = await getCurrentSession();
    if (!session || session.role !== "seeker") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API Key is not configured on the server." }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    // Must be PDF as per requirements
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are supported." }, { status: 400 });
    }

    if (file.size > MAX_RESUME_SIZE) {
      return NextResponse.json({ error: "File exceeds 4MB limit." }, { status: 400 });
    }

    // Read file into base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.length < 5 || buffer.subarray(0, 5).toString("utf8") !== "%PDF-") {
      return NextResponse.json({ error: "Invalid PDF file." }, { status: 400 });
    }
    const base64Data = buffer.toString("base64");

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are an expert technical recruiter and resume parser.
Extract the relevant details from the provided resume PDF to auto-fill a job seeker's profile.
Follow the JSON schema exactly.
For 'experience', write a compelling, concise summary of their past roles and impact.
CRITICAL FOR EXPERIENCE: 
- Keep it SHORT and punchy (max 2 short paragraphs).
- You MUST write in the FIRST PERSON perspective (e.g., "I am an AI & ML engineering student...", "I developed...", "My experience spans..."). Do NOT use the third person ("He is...", "John did...").
For 'skills', extract all distinct technical, professional, and soft skills as an array of strings.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        prompt,
        {
          inlineData: {
            data: base64Data,
            mimeType: "application/pdf",
          },
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.1, // Low temp for more deterministic extraction
      },
    });

    const textResult = response.text;
    if (!textResult) {
      throw new Error("Empty response from AI");
    }

    const parsedData = JSON.parse(textResult);
    const data = {
      skills: Array.isArray(parsedData.skills)
        ? parsedData.skills.filter((item: unknown) => typeof item === "string").slice(0, 30)
        : [],
      experience: typeof parsedData.experience === "string" ? parsedData.experience.slice(0, 3000) : "",
      education: typeof parsedData.education === "string" ? parsedData.education.slice(0, 1500) : "",
      location: typeof parsedData.location === "string" ? parsedData.location.slice(0, 120) : "",
      linkedin_url: typeof parsedData.linkedin_url === "string" ? parsedData.linkedin_url.slice(0, 300) : "",
      website_url: typeof parsedData.portfolio_url === "string" ? parsedData.portfolio_url.slice(0, 300) : "",
    };

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error("Resume Extraction Error:", error);
    return NextResponse.json({ error: "Failed to extract resume data. Please try again." }, { status: 500 });
  }
}
