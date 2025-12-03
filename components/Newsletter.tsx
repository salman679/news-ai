"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/ui/container";
import { Mail } from "lucide-react";

export function Newsletter() {
  return (
    <section className="py-16 bg-primary/5 border-y border-border">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
              <Mail className="h-6 w-6 text-primary" />
              Subscribe to our newsletter
            </h2>
            <p className="text-muted-foreground">
              Get the latest AI news and daily summaries delivered directly to
              your inbox. No spam, unsubscribe anytime.
            </p>
          </div>
          <div className="flex w-full max-w-md items-center space-x-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-background border-border focus-visible:ring-primary"
            />
            <Button type="submit">Subscribe</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
