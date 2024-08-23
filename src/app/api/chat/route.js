import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

// Helper function to add CORS headers
function addCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

export async function POST(req) {
  if (req.method === "OPTIONS") {
    return OPTIONS();
  }

  try {
    const {
      messages,
      model,
      outputLength,
      temperature,
      topP,
      topK,
      repetitionPenalty,
      apiKey,
    } = await req.json();

    const config = new Configuration({
      apiKey: apiKey,
    });

    const openai = new OpenAIApi(config);

    const response = await openai.createChatCompletion({
      model: model || "gpt-3.5-turbo",
      max_tokens: outputLength || 512,
      temperature: temperature || 0.7,
      messages,
      stream: true,
    });

    const stream = OpenAIStream(response);
    return addCorsHeaders(new StreamingTextResponse(stream));
  } catch (error) {
    console.error("API Error:", error);
    return addCorsHeaders(
      NextResponse.json(
        { error: error.message },
        {
          status: 400,
        }
      )
    );
  }
}

export function OPTIONS() {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  return new NextResponse(null, { status: 204, headers });
}
