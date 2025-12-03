import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Valid text content is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Try Gemini API first if available
    if (apiKey && apiKey.trim()) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `Please provide a concise, professional summary of this news article in exactly 3-4 clear sentences. Focus on the key facts, implications, and outcomes:\n\n${text.slice(
                        0,
                        4000
                      )}`,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 200,
                topK: 40,
                topP: 0.95,
              },
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Gemini API error ${response.status}:`, errorText);
          throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        const summary = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (summary && summary.trim()) {
          return NextResponse.json({
            summary: summary.trim(),
            source: "ai",
          });
        } else {
          throw new Error("Empty response from Gemini API");
        }
      } catch (apiError) {
        console.error("Gemini API failed:", apiError);
        // Continue to fallback
      }
    }

    // Enhanced fallback mock summary generation
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const summary = generateContextualSummary(text);
    return NextResponse.json({
      summary,
      source: "mock",
    });
  } catch (error) {
    console.error("Summary generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate summary. Please try again.",
        details:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : "Unknown error"
            : undefined,
      },
      { status: 500 }
    );
  }
}

function generateContextualSummary(text: string): string {
  const textLower = text.toLowerCase();

  // Technology & AI summaries
  if (textLower.includes("quantum") || textLower.includes("qubit")) {
    return "Researchers achieved a significant breakthrough in quantum computing, demonstrating enhanced processing capabilities that could revolutionize computational tasks. The advancement brings practical quantum applications closer to reality, potentially transforming industries from cryptography to drug discovery. Experts highlight both the promising applications and the security implications of this technology. This development represents a crucial step toward fault-tolerant quantum computing systems.";
  }

  if (
    textLower.includes("ai") ||
    textLower.includes("artificial intelligence") ||
    textLower.includes("machine learning") ||
    textLower.includes("chatgpt")
  ) {
    return "Artificial intelligence continues to advance rapidly, with new developments showing significant potential for transforming various industries. The technology demonstrates improved capabilities in areas such as automation, decision-making, and creative tasks. Experts emphasize both the benefits and challenges of widespread AI adoption, including concerns about job displacement and ethical considerations. Organizations are increasingly integrating AI solutions to enhance productivity and innovation.";
  }

  if (
    textLower.includes("space") ||
    textLower.includes("mars") ||
    textLower.includes("spacecraft") ||
    textLower.includes("nasa")
  ) {
    return "Space exploration reaches new milestones with successful missions advancing our understanding of the cosmos and expanding human presence beyond Earth. The achievement demonstrates significant technological progress and international collaboration in space science. Scientists anticipate that these developments will pave the way for future explorations and potential colonization efforts. The mission provides valuable data that could transform our knowledge of planetary systems.";
  }

  // Climate & Environment
  if (
    textLower.includes("climate") ||
    textLower.includes("environment") ||
    textLower.includes("renewable") ||
    textLower.includes("carbon")
  ) {
    return "Environmental research reveals critical insights into climate change mitigation and sustainable development strategies. The findings emphasize the urgent need for coordinated global action while highlighting promising technological and policy solutions. Scientists present both challenges and opportunities in addressing environmental concerns through innovation and international cooperation. The research provides actionable recommendations for reducing environmental impact and building resilience.";
  }

  // Health & Medicine
  if (
    textLower.includes("health") ||
    textLower.includes("medical") ||
    textLower.includes("crispr") ||
    textLower.includes("treatment") ||
    textLower.includes("gene")
  ) {
    return "Medical researchers announce groundbreaking progress in healthcare innovation, offering new therapeutic approaches that could significantly improve patient outcomes. The breakthrough combines cutting-edge technology with established medical practices to address previously challenging conditions. Healthcare professionals express optimism about the potential applications while emphasizing the need for continued clinical validation. This advancement represents a major step forward in precision medicine and personalized treatment options.";
  }

  // Business & Economics
  if (
    textLower.includes("market") ||
    textLower.includes("business") ||
    textLower.includes("economy") ||
    textLower.includes("investment") ||
    textLower.includes("energy")
  ) {
    return "Market analysts examine emerging economic trends and their implications for businesses and investors navigating an evolving landscape. The analysis reveals key factors driving industry transformation and provides strategic insights for stakeholders. Experts recommend adaptive approaches that balance innovation with risk management in uncertain market conditions. The findings suggest significant opportunities for growth while highlighting potential challenges ahead.";
  }

  // Technology & Innovation
  if (
    textLower.includes("tech") ||
    textLower.includes("digital") ||
    textLower.includes("software") ||
    textLower.includes("innovation")
  ) {
    return "Technology sector developments showcase innovative solutions addressing contemporary challenges and creating new opportunities for advancement. The innovations demonstrate potential for improving efficiency, security, and user experience across various applications. Industry experts predict significant impact on business operations and consumer behavior in the coming years. These technological advances reflect ongoing efforts to solve complex problems through creative engineering and design.";
  }

  // Remote Work & Employment
  if (
    textLower.includes("remote") ||
    textLower.includes("work") ||
    textLower.includes("productivity") ||
    textLower.includes("hybrid")
  ) {
    return "Workplace dynamics continue evolving as organizations adapt to new models of collaboration and productivity. Research reveals both benefits and challenges of modern work arrangements, affecting employee satisfaction and business outcomes. Companies are implementing innovative strategies to balance flexibility with operational effectiveness. The findings provide insights into future workplace trends and their implications for workforce management.";
  }

  // Default contextual summary
  return "This comprehensive analysis examines important developments and their broader implications for stakeholders and society. The report synthesizes expert perspectives and current data to provide valuable context and actionable insights. Key findings highlight both opportunities and challenges that require careful consideration and strategic planning. The research contributes to ongoing discussions about effective approaches to addressing contemporary issues.";
}
