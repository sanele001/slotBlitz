# Slot Review Site

A Next.js application for browsing slot games, reviews, and gaming industry news.

## Requirements

- Node.js 18 or newer
- npm
- Supabase project credentials
- NewsAPI key

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env.local` in the project root:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-key
NEWS_API_KEY=your-newsapi-key
```

Do not commit `.env.local` or place private keys in variables prefixed with `NEXT_PUBLIC_`.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev          # Start the development server
npm run build        # Create a production build
npm run start        # Start the production server
npm test             # Run the test suite
npm run test:watch   # Run tests in watch mode
npm run lint         # Run Next.js linting
npm run processImages # Process image assets
```

## Data and Security

Supabase is accessed from server code through `dbclient/superBaseClient.js`. Client components do not import the Supabase client directly. They call same-origin API routes instead.

Available API routes include:

- `GET /api/slots` for slot data, search, filters, and the home page data
- `GET /api/slots/[slug]` for a single game
- `GET /api/slots/count` for the total slot count
- `GET /api/reviews/[slug]` for a single review
- `GET /api/news` for NewsAPI articles
- `GET /api/images/[path]` for game thumbnail delivery

The image route downloads the requested Supabase image server-side and returns the image bytes. This keeps Supabase configuration out of the browser, but direct Supabase URLs or signed URLs would be faster if the storage bucket can be safely exposed.

News articles are fetched server-side through `/api/news`, so the NewsAPI key is never sent to the browser and publisher image domains do not need to be whitelisted.

## Testing

Run the focused NewsCard test with:

```bash
npm test -- --runInBand app/tests/components/cards.test.tsx
```
