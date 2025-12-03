import { Article } from "./types";

const MOCK_DELAY = 800;

export async function fetchNews(): Promise<Article[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  try {
    // In a real app, this would be fetch('/api/news') or an external API
    // For now, we import the JSON directly or fetch it from public
    // Since this is running on the client/server, we can fetch the public file if we are in the browser
    // But since this might run on the server, importing it is safer if it was a local file.
    // However, to simulate a real fetch, let's fetch the public URL if client-side,
    // or just return hardcoded data if we want to be robust.

    // Let's hardcode the import for simplicity in this demo environment to avoid localhost URL issues
    const response = await import("@/public/data/news.json");
    // The import returns a module with default export being the JSON content
    // We need to cast it or map it to ensure it matches Article[]

    const data = response.default as unknown as Article[];
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export async function fetchArticleById(
  id: string
): Promise<Article | undefined> {
  const articles = await fetchNews();
  return articles.find((article) => article.id === id);
}

export async function fetchRelatedArticles(
  currentId: string,
  category: string
): Promise<Article[]> {
  const articles = await fetchNews();
  return articles
    .filter(
      (article) => article.category === category && article.id !== currentId
    )
    .slice(0, 3);
}
