# AI-Enhanced News & Analytics Dashboard

A premium, modern news dashboard built with Next.js 14+, TypeScript, Tailwind CSS, and AI integration.

## Features

- **Beautiful UI/UX**: Clean, breathing layout with a comprehensive design system.
- **News Feed**: Browse articles with category filters, search, and pagination.
- **AI Summaries**: Generate concise summaries for articles using a simulated AI API (integration ready).
- **Analytics Dashboard**: Visualize news trends, sources, and categories with interactive charts.
- **Bookmarks**: Save articles for later reading (persisted locally).
- **Dark Mode**: Fully supported dark/light theme switching.
- **Responsive**: Mobile-first design ensuring perfect rendering on all devices.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, `shadcn/ui` inspired components
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

1.  Install dependencies:

    ```bash
    npm install
    ```

2.  Run the development server:

    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app`: App Router pages and API routes.
- `/components`: Reusable UI components and feature-specific components.
- `/lib`: Utility functions, types, and mock data fetchers.
- `/store`: Zustand state stores.
- `/public/data`: Mock data for news articles.
