"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryBoxProps {
  content: string;
}

export function SummaryBox({ content }: SummaryBoxProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const generateSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content }),
      });

      if (!response.ok) throw new Error("Failed to generate summary");

      const data = await response.json();
      setSummary(data.summary);
      setIsExpanded(true);
    } catch {
      setError("Could not generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-secondary/30 border-primary/20 overflow-hidden transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg text-primary">
            <Sparkles className="h-5 w-5" />
            AI Summary
          </CardTitle>
          {summary && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 p-0"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!summary && !loading && !error && (
          <div className="flex flex-col items-center justify-center py-4 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Get a quick AI-generated summary of this article.
            </p>
            <Button onClick={generateSummary} className="gap-2">
              <Sparkles className="h-4 w-4" />
              Generate Summary
            </Button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-8 space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground animate-pulse">
              Analyzing content...
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-4 space-y-2">
            <p className="text-sm text-destructive">{error}</p>
            <Button variant="outline" size="sm" onClick={generateSummary}>
              Try Again
            </Button>
          </div>
        )}

        {summary && (
          <div
            className={cn(
              "text-sm leading-relaxed transition-all duration-300 ease-in-out",
              isExpanded ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"
            )}
          >
            <p className="whitespace-pre-line">{summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
