"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Newspaper, LayoutDashboard, Bookmark } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const routes = [
    {
      href: "/",
      label: "News",
      icon: Newspaper,
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/bookmarks",
      label: "Bookmarks",
      icon: Bookmark,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-indigo-600 text-primary-foreground shadow-lg shadow-primary/25">
                <Newspaper className="h-5 w-5" />
                <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background text-[10px] font-black text-primary ring-2 ring-background">
                  AI
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                News<span className="text-primary">AI</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {routes.map((route) => {
                const Icon = route.icon;
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                      pathname === route.href
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {route.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center justify-around border-t py-2">
          {routes.map((route) => {
            const Icon = route.icon;
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 text-xs font-medium rounded-md transition-colors",
                  pathname === route.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {route.label}
              </Link>
            );
          })}
        </div>
      </Container>
    </header>
  );
}
