"use client";

import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Bookmark } from "lucide-react";
import { format } from "date-fns";
import { useBookmarkStore } from "@/store/bookmarkStore";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
  const bookmarked = isBookmarked(article.id);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookmarked) {
      removeBookmark(article.id);
    } else {
      addBookmark(article);
    }
  };

  return (
    <Link href={`/news/${article.id}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-custom-blue flex flex-col">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
            >
              {article.category}
            </Badge>
          </div>
          <Button
            size="icon"
            variant="secondary"
            className={cn(
              "absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-opacity opacity-0 group-hover:opacity-100",
              bookmarked && "opacity-100 text-primary"
            )}
            onClick={toggleBookmark}
          >
            <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
          </Button>
        </div>

        <CardHeader className="p-4 pb-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span className="font-medium text-primary">
              {article.source.name}
            </span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>
                {format(new Date(article.publishedAt), "MMM d, yyyy")}
              </span>
            </div>
          </div>
          <h3 className="line-clamp-2 font-semibold text-xl leading-tight group-hover:text-primary transition-colors">
            {article.title}
          </h3>
        </CardHeader>

        <CardContent className="p-4 pt-0 grow">
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {article.description}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto">
          <div className="text-sm font-medium text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Read more <span aria-hidden="true">→</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
