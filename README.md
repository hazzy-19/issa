# CaféLaunch ☕

> Launch your independent café website in minutes — no code required.

CaféLaunch is a café website builder that lets small coffee shops and bistros create a polished, mobile-ready web presence through a simple onboarding flow. Café owners fill out a short form (or describe their setup in plain English) and get a fully styled site with menus, gallery, hours, directions, and WhatsApp ordering.

---

## Tech Stack

| Layer        | Tool                              |
| ------------ | --------------------------------- |
| Framework    | React 19 + Vite 8                 |
| Styling      | Tailwind CSS 3.4                  |
| Routing      | React Router DOM 7                |
| Icons        | Lucide React                      |
| Linting      | Oxlint                            |
| Data         | Local JSON + localStorage context |

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── About.jsx           # Our story & principles
│   ├── ChefsPicks.jsx      # Featured dishes carousel
│   ├── FindUs.jsx          # Contact, map embed & hours
│   ├── Footer.jsx          # Café site footer
│   ├── Gallery.jsx         # Pinterest-style masonry gallery
│   ├── Header.jsx          # Café site nav header
│   ├── Hero.jsx            # Full-bleed hero slideshow
│   ├── Menu.jsx            # Categorized menu grid
│   ├── OnboardingFooter.jsx
│   └── OnboardingHeader.jsx
├── config/
│   └── product.js          # Product name & tagline constants
├── context/
│   └── CafeContext.jsx     # Global café data provider (localStorage)
├── data/
│   └── cafe.js             # Default café data (menu, gallery, hours, etc.)
├── hooks/
│   └── useInView.js        # IntersectionObserver hook for scroll animations
├── layouts/
│   ├── CafeLayout.jsx      # Shell for the live café site
│   └── OnboardingLayout.jsx # Shell for welcome/setup pages
├── pages/
│   ├── GalleryPage.jsx     # Full gallery with category filters
│   ├── HomePage.jsx        # Main café landing page
│   ├── MenuPage.jsx        # Full menu page with dietary tags
│   ├── SetupPage.jsx       # Multi-step onboarding form
│   └── WelcomePage.jsx     # Marketing / onboarding landing page
└── main.jsx
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## User Flow

1. **First visit** → Redirected to `/welcome` (onboarding landing page)
2. **"Get started"** → `/setup` multi-step form (café name, hours, contact, socials)
3. **Save** → Data persisted to `localStorage`, user lands on their live café site at `/`
4. **"See a live example"** → Demo mode bypasses the redirect so visitors can preview the template

## Build Stages Completed

| Stage | Description |
| ----- | ----------- |
| 1     | Split layouts into `CafeLayout` and `OnboardingLayout` |
| 2     | Onboarding header/footer with product config and responsive nav |
| 3     | Rebuild welcome hero with 2-column layout, image collage, floating preview card |
| 4     | "How it works" and "What you can set up" sections with alternating backgrounds and scroll animations |
| 5     | Showcase browser mockup, social proof stats, final CTA |
| 6     | Accessibility polish, performance image optimizations, `motion-reduce` checks, styling consistency |
| 7     | Bug fix — `#DFCCA` → `#DFCCAA` (invalid 5-digit hex color causing missing borders across 9 files) |

---

## Phase 2 — Next Up 🚧

The UI is in place. The next phase focuses on **functionality integration and data consistency**:

### 2.1 — Data & Pricing Cleanup
- [ ] Normalize all menu prices to whole KSh values (some items still show decimal `KSh 10.00` format)
- [ ] Sync `chefsPicks` and `menuHighlights` prices with their corresponding `menuItems` entries
- [ ] Update `mapsUrl` to reflect the actual Njoro address instead of the placeholder Brookside link
- [ ] Replace hardcoded "Open today 8:00 am to 8:00 pm" in `WelcomePage` floating card with dynamic `cafe.hours`

### 2.2 — Setup Form → Live Site Pipeline
- [ ] Wire the multi-step `SetupPage` form to `CafeContext.saveCafeData()` so user input actually persists
- [ ] Add menu item editing (add / edit / remove dishes and prices from the setup flow)
- [ ] Allow gallery image uploads or URL input from the onboarding form
- [ ] Implement the `/setup/assistant` natural-language configuration route

### 2.3 — Polish & Production Readiness
- [ ] Add proper `<title>` and Open Graph meta tags (dynamic per café name)
- [ ] Add a favicon and PWA manifest
- [ ] Image fallback / error states for broken Unsplash URLs
- [ ] Loading skeletons for image-heavy pages (gallery, menu)
- [ ] 404 page
- [ ] Deploy pipeline (Netlify / Vercel)

---

## License

Private — not yet published.
