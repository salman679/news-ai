"use client";

import { Article } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import { FileText, Globe, TrendingUp, Calendar, BarChart3 } from "lucide-react";
import {
  format,
  parseISO,
  subDays,
  startOfDay,
  differenceInDays,
} from "date-fns";

interface AnalyticsDashboardProps {
  articles: Article[];
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
];

export function AnalyticsDashboard({ articles }: AnalyticsDashboardProps) {
  // Calculate metrics
  const totalArticles = articles.length;
  const uniqueCategories = new Set(articles.map((a) => a.category)).size;
  const uniqueSources = new Set(articles.map((a) => a.source.name)).size;

  // Calculate recent articles (last 7 days)
  const now = new Date();
  const sevenDaysAgo = subDays(now, 7);
  const recentArticles = articles.filter(
    (article) => parseISO(article.publishedAt) >= sevenDaysAgo
  );
  const recentGrowth =
    articles.length > 0 ? (recentArticles.length / articles.length) * 100 : 0;

  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [articles]);

  const sourceData = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach((a) => {
      counts[a.source.name] = (counts[a.source.name] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [articles]);

  // Real trend data based on actual article publication dates
  const trendData = useMemo(() => {
    const days: Record<string, number> = {};
    const now = new Date();

    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = startOfDay(subDays(now, i));
      const dayKey = format(date, "MMM dd");
      days[dayKey] = 0;
    }

    // Count articles by day
    articles.forEach((article) => {
      const articleDate = parseISO(article.publishedAt);
      const daysSince = differenceInDays(now, articleDate);

      if (daysSince >= 0 && daysSince <= 6) {
        const dayKey = format(startOfDay(subDays(now, daysSince)), "MMM dd");
        if (days[dayKey] !== undefined) {
          days[dayKey]++;
        }
      }
    });

    return Object.entries(days).map(([name, articles]) => ({ name, articles }));
  }, [articles]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Articles
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalArticles}</div>
            <p className="text-xs text-muted-foreground">Published articles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Activity
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentArticles.length}</div>
            <p className="text-xs text-muted-foreground">
              Last 7 days ({recentGrowth.toFixed(1)}% of total)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueCategories}</div>
            <p className="text-xs text-muted-foreground">
              {uniqueSources} unique sources
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Source</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sourceData[0]?.name || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              {sourceData[0]?.value || 0} articles published
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Articles by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({
                      name,
                      percent,
                    }: {
                      name?: string;
                      percent?: number;
                    }) => `${name || ""} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Most Common Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceData} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={100}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip cursor={{ fill: "transparent" }} />
                  <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]}>
                    {sourceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Publishing Timeline (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="articles"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
