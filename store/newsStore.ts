import { create } from "zustand";
import { NewsState, Category } from "@/lib/types";
import { fetchNews } from "@/lib/fetchNews";

export const useNewsStore = create<NewsState>((set) => ({
  articles: [],
  isLoading: false,
  error: null,
  selectedCategory: "All",
  searchQuery: "",
  currentPage: 1,

  fetchArticles: async () => {
    set({ isLoading: true, error: null });
    try {
      const articles = await fetchNews();
      set({ articles, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to fetch articles", isLoading: false });
    }
  },

  setCategory: (category: Category | "All") => {
    set({ selectedCategory: category, currentPage: 1 });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query, currentPage: 1 });
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },
}));
