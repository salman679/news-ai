"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNewsStore } from "@/store/newsStore";
import { useEffect, useState } from "react";

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useNewsStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Manual debounce implementation if I don't want to create a hook file yet,
  // but better to keep it clean. I'll implement inline debounce for simplicity here.

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, setSearchQuery]);

  return (
    <div className="relative w-full max-w-xl">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search news..."
        className="pl-10 pr-10 h-12 rounded-full bg-background shadow-sm border-muted hover:border-primary/50 focus-visible:ring-primary/20 transition-all"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
      {localQuery && (
        <button
          onClick={() => setLocalQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
