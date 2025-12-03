# AI-Enhanced News & Analytics Dashboard

A premium, modern news aggregation platform with AI-powered summaries and comprehensive analytics, built with Next.js 15, TypeScript, and cutting-edge technologies.

![News AI Dashboard](https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=400&fit=crop&q=80)

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

2.  Set up environment variables (optional):

    ```bash
    cp .env.example .env
    ```

    Then edit `.env` and add your Gemini API key for real AI summaries. If you don't have one or prefer to use mock summaries, you can skip this step.

3.  Run the development server:

    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features Overview

### ✅ Core Requirements Met

- **News Feed**: Browse articles with category filters, search, and pagination
- **Dynamic Routes**: Individual news article pages at `/news/[id]`
- **AI Summaries**: Generate article summaries (Gemini API + fallback)
- **Analytics Dashboard**: Interactive charts showing article trends, categories, and sources
- **Modern UI**: Beautiful, responsive design with dark/light theme support
- **Bookmark System**: Save articles for later reading with local persistence

### 🎯 Bonus Features Included

- **Dark/Light Theme**: Complete theme switching with system preference detection
- **Bookmark Articles**: Persistent local storage for saved articles
- **Responsive Design**: Mobile-first approach ensuring perfect rendering on all devices
- **Modern Architecture**: Next.js 15 App Router with TypeScript and Zustand state management

## API Integration

The app includes a flexible AI summary system:

- **Primary**: Google Gemini API for real AI-generated summaries
- **Fallback**: Mock summaries when API is unavailable or not configured
- **Endpoint**: `/api/summary` - handles both real API calls and mock responses

## Project Structure

- `/app`: App Router pages and API routes.
- `/components`: Reusable UI components and feature-specific components.
- `/lib`: Utility functions, types, and mock data fetchers.
- `/store`: Zustand state stores.
- `/public/data`: Mock data for news articles.
