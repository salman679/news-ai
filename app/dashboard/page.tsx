import { fetchNews } from "@/lib/fetchNews";
import { Container } from "@/components/ui/container";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";

export default async function DashboardPage() {
  const articles = await fetchNews();

  return (
    <div className="pb-20">
      <div className="border-b border-border bg-secondary/20">
        <Container className="py-12">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Insights into news coverage, categories, and sources.
          </p>
        </Container>
      </div>

      <Container className="py-8">
        <AnalyticsDashboard articles={articles} />
      </Container>
    </div>
  );
}
