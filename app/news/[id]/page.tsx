import { fetchArticleById, fetchRelatedArticles } from "@/lib/fetchNews";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Share2, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { SummaryBox } from "@/components/SummaryBox";
import { NewsCard } from "@/components/NewsCard";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsPage({ params }: PageProps) {
  const { id } = await params;
  const article = await fetchArticleById(id);

  if (!article) {
    notFound();
  }

  const relatedArticles = await fetchRelatedArticles(id, article.category);

  return (
    <div className="pb-20">
      <Container className="py-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to News
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {article.category}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm border-b border-border pb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium text-foreground">
                    {article.author}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {format(new Date(article.publishedAt), "MMMM d, yyyy")}
                  </span>
                </div>
                <div className="grow" />
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-custom-blue">
              <Image
                src={article.urlToImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
              />
            </div>

            <SummaryBox content={article.content} />

            <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
              <p className="text-xl font-medium text-foreground mb-6 leading-relaxed">
                {article.description}
              </p>
              <div className="space-y-6">
                {/* Simulating long content since mock data is short */}
                <p>{article.content}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <h3>Key Takeaways</h3>
                <ul>
                  <li>Detailed analysis of the current situation.</li>
                  <li>Expert opinions and future projections.</li>
                  <li>Impact on the global landscape.</li>
                </ul>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum. Sed ut
                  perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium.
                </p>
              </div>
            </div>
          </article>

          {/* Sidebar / Related Articles */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-24">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="bg-primary/10 text-primary p-1 rounded">
                  More in {article.category}
                </span>
              </h3>

              {relatedArticles.length > 0 ? (
                <div className="grid gap-6">
                  {relatedArticles.map((related) => (
                    <NewsCard key={related.id} article={related} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No related articles found.
                </p>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
