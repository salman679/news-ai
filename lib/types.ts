export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  urlToImage: string;
  author: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  category: Category;
}

export type Category =
  | "Technology"
  | "Business"
  | "Health"
  | "Science"
  | "Sports"
  | "Entertainment"
  | "General";

export interface NewsState {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: Category | "All";
  searchQuery: string;
  fetchArticles: () => Promise<void>;
  setCategory: (category: Category | "All") => void;
  setSearchQuery: (query: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export interface BookmarkState {
  bookmarks: Article[];
  addBookmark: (article: Article) => void;
  removeBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
}
