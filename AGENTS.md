# Issa Storefront — Haniya deeq

React + Vite + Tailwind CSS v4 storefront with Sanity Studio in one project.

## Quick Start

```bash
npm install
npm run dev        # Vite dev server (storefront)
npm run studio     # Sanity Studio
npm run build      # Production build → dist/
```

## Environment Variables

Create a `.env` file at the root:

```
VITE_SANITY_PROJECT_ID=shapc1fi
VITE_SANITY_DATASET=production
```

## Project Structure

- `index.html` — Vite HTML shell
- `sanity.config.ts` — Sanity Studio configuration (root level)
- `sanity.cli.ts` — Sanity CLI configuration
- `vite.config.ts` — Vite config with React + Tailwind CSS v4
- `src/main.tsx` — React entrypoint
- `src/App.tsx` — Primary application component and routing
- `src/index.css` — Global CSS + Tailwind v4 import
- `src/sanity/client.ts` — Sanity client + image URL helper
- `src/sanity/schemaTypes/` — All Sanity document schemas
- `src/components/` — Header, Footer, CartDrawer, UI primitives
- `src/pages/` — Home, ProductDetails, Saved
- `src/store/` — Zustand cart/saved store
- `src/data/` — Mock data (to be replaced by live Sanity queries)
- `src/images/` — Hero images

## Dependencies

- **Runtime**: React 19, React Router 7, Zustand, Sanity Client
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`
- **CMS**: Sanity Studio v3 (runs from root via `npm run studio`)
- **Build**: Vite 8, TypeScript 5.7

## Deployment

Run `npm run build` → deploy the `dist/` folder to any static host.
Sanity Studio can be deployed separately via `npx sanity deploy`.
