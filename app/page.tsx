"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { SearchBar } from "@/components/SearchBar";
import { Filters } from "@/components/Filters";
import { NewsCard } from "@/components/NewsCard";
import { Pagination } from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewsStore } from "@/store/newsStore";

const ITEMS_PER_PAGE = 6;

export default function Home() {
  const {
    articles,
    isLoading,
    error,
    selectedCategory,
    searchQuery,
    fetchArticles,
    currentPage,
    setCurrentPage,
  } = useNewsStore();

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Filter articles based on category and search query
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-linear-to-b from-background to-secondary/20 border-b border-border">
        <Container>
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Discover the Future of{" "}
              <span className="text-primary">Information</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              AI-enhanced news aggregation delivering the most relevant stories
              across technology, business, and science with intelligent
              summaries.
            </p>
            <SearchBar />
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <Container>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                Latest Headlines
              </h2>
              <Filters />
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-destructive text-lg font-medium">{error}</p>
                <button
                  onClick={() => fetchArticles()}
                  className="mt-4 text-primary hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No articles found. Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedArticles.map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
