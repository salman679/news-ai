"use client";

import { Container } from "@/components/ui/container";
import Link from "next/link";
import { Newspaper, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary p-1 text-primary-foreground">
                <Newspaper className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                News<span className="text-primary">AI</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Delivering the future of information with AI-powered summaries and
              real-time analytics. Stay ahead of the curve.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  News Feed
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-primary transition-colors"
                >
                  Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="/bookmarks"
                  className="hover:text-primary transition-colors"
                >
                  Bookmarks
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  API Access
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NewsAI. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
