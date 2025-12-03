import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock AI summary generation
    // In a real app, this would call OpenAI, Gemini, or HuggingFace API
    const summary = `Here is a concise summary of the article:

The article discusses the significant impact of the reported events, highlighting key developments in the sector. It emphasizes the main points raised by experts and outlines potential future implications. The narrative is driven by recent data and expert analysis, suggesting a shift in current trends. Overall, the piece provides a comprehensive overview of the situation.`;

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Summary generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
