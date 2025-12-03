/**
 * AI Summary Service
 * Provides a clean interface for generating AI summaries
 */

export interface SummaryResponse {
  summary: string;
  source: "ai" | "mock";
}

export interface SummaryError {
  error: string;
  details?: string;
}

/**
 * Generate an AI summary for the given content
 */
export async function generateAISummary(content: string): Promise<string> {
  try {
    const response = await fetch("/api/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: content }),
    });

    if (!response.ok) {
      const errorData = (await response
        .json()
        .catch(() => ({}))) as SummaryError;
      throw new Error(
        errorData.error || `HTTP ${response.status}: Failed to generate summary`
      );
    }

    const data = (await response.json()) as SummaryResponse;

    if (!data.summary) {
      throw new Error("No summary received from server");
    }

    return data.summary;
  } catch (error) {
    console.error("AI Summary service error:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to generate summary");
  }
}

/**
 * Test the AI summary functionality
 */
export async function testAISummary(): Promise<{
  success: boolean;
  error?: string;
  summary?: string;
}> {
  try {
    const testContent =
      "Artificial intelligence is revolutionizing technology. Machine learning algorithms are becoming more sophisticated. Companies are investing heavily in AI research and development.";
    const summary = await generateAISummary(testContent);
    return { success: true, summary };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
