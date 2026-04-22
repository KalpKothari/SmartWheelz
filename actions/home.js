"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/prisma";
import aj from "@/lib/arcjet";
import { request } from "@arcjet/next";
import { serializeCarData } from "@/lib/helper";

/**
 * Get featured cars for the homepage
 */
export async function getFeaturedCars(limit = 3) {
  try {
    const cars = await db.car.findMany({
      where: {
        featured: true,
        status: "AVAILABLE",
      },
      take: limit,
      orderBy: { createdAt: "desc" },
    });
    return cars.map(serializeCarData);
  } catch (error) {
    throw new Error("Error fetching featured cars:" + error.message);
  }
}

// Function to convert File to base64
async function fileToBase64(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return buffer.toString("base64");
}

/**
 * Process car image with Gemini AI
 */
export async function processImageSearch(file) {
  try {
    // Get request data for ArcJet
    const req = await request();
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        const { remaining, reset } = decision.reason;
        console.error({
          code: "RATE_LIMIT_EXCEEDED",
          details: { remaining, resetInSeconds: reset },
        });
        throw new Error("Too many requests. Please try again later.");
      }
      throw new Error("Request blocked");
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key is not configured");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Primary model has highest free tier limits, fallbacks if quota hit
const modelNames = [
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
];

    const base64Image = await fileToBase64(file);
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: file.type,
      },
    };

    const prompt = `
      Analyze this car image and extract the following information for a search query:
      1. Make (manufacturer)
      2. Body type (SUV, Sedan, Hatchback, etc.)
      3. Color
      Respond ONLY with a valid JSON object, no markdown, no extra text:
      {"make":"","bodyType":"","color":"","confidence":0.0}
      For confidence, provide a value between 0 and 1.
    `;

    let lastError = null;

    for (const modelName of modelNames) {
      try {
        console.log(`Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent([imagePart, prompt]);
        const response = await result.response;
        const text = response.text();

        // Robust JSON extraction
        const cleanedText = text
          .replace(/```(?:json)?\n?/g, "")
          .replace(/```/g, "")
          .trim();
        const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
          throw new Error("No JSON found in response");
        }

        const carDetails = JSON.parse(jsonMatch[0]);

        return {
          success: true,
          data: carDetails,
        };

      } catch (modelError) {
        lastError = modelError;
        console.error(`Model ${modelName} failed:`, modelError.message);

        // Only try next model if it's a quota/rate limit error
        const isQuotaError =
          modelError.message.includes("429") ||
          modelError.message.includes("quota") ||
          modelError.message.includes("Too Many Requests");

        if (!isQuotaError) {
          // Non-quota error (bad image, parse fail, etc.) — no point retrying
          return {
            success: false,
            error: "Failed to analyze image. Please try a clearer car photo.",
          };
        }

        // Quota error — loop continues to next model
        console.warn(`Quota hit on ${modelName}, trying next model...`);
      }
    }

    // All models exhausted
    console.error("All models quota exceeded:", lastError?.message);
    return {
      success: false,
      error: "AI search is temporarily unavailable due to high demand. Please use text search instead.",
    };

  } catch (error) {
    throw new Error("AI Search error:" + error.message);
  }
}
