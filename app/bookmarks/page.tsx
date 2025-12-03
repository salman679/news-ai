"use client";

import { Container } from "@/components/ui/container";
import { NewsCard } from "@/components/NewsCard";
import { useBookmarkStore } from "@/store/bookmarkStore";
import { Bookmark, FileQuestion } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarkStore();

  return (
    <div className="pb-20">
      <div className="border-b border-border bg-secondary/20">
        <Container className="py-12">
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
            <Bookmark className="h-8 w-8" />
            Your Bookmarks
          </h1>
          <p className="text-muted-foreground">
            Saved articles for later reading.
          </p>
        </Container>
      </div>

      <Container className="py-8">
        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="bg-secondary p-6 rounded-full">
              <FileQuestion className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">No bookmarks yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                You haven&apos;t saved any articles yet. Browse the news feed to
                find stories you&apos;d like to read later.
              </p>
            </div>
            <Link href="/" className={cn(buttonVariants())}>
              Browse News
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
