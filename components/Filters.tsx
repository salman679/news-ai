"use client";

import { Category } from "@/lib/types";
import { useNewsStore } from "@/store/newsStore";
import { cn } from "@/lib/utils";

const categories: (Category | "All")[] = [
  "All",
  "Technology",
  "Business",
  "Health",
  "Science",
  "Sports",
  "Entertainment",
  "General",
];

export function Filters() {
  const { selectedCategory, setCategory } = useNewsStore();

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mask-linear">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setCategory(category)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
            selectedCategory === category
              ? "bg-primary text-primary-foreground shadow-custom-blue"
              : "bg-secondary/50 text-secondary-foreground hover:bg-secondary hover:text-foreground"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
