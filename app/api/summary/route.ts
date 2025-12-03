import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `Summarize the following news article into 3–4 clear, concise sentences:\n\n${text}`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        const summary = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (summary) {
          return NextResponse.json({ summary });
        }
      } catch (apiError) {
        console.error("Gemini API failed:", apiError);
      }
    }

    // Fallback mock summary
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({
      summary:
        "(Mock Summary) The article highlights key developments and their broader implications, providing context and expert viewpoints. It outlines the main events, related impacts, and possible future outcomes. Overall, it delivers a concise overview of the topic.",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
