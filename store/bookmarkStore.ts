import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BookmarkState, Article } from "@/lib/types";

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (article: Article) => {
        const { bookmarks } = get();
        if (!bookmarks.find((b) => b.id === article.id)) {
          set({ bookmarks: [...bookmarks, article] });
        }
      },
      removeBookmark: (articleId: string) => {
        const { bookmarks } = get();
        set({ bookmarks: bookmarks.filter((b) => b.id !== articleId) });
      },
      isBookmarked: (articleId: string) => {
        const { bookmarks } = get();
        return !!bookmarks.find((b) => b.id === articleId);
      },
    }),
    {
      name: "news-bookmarks",
    }
  )
);
