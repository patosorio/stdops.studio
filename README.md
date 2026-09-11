# stdops

Marketing site for [stdops](https://stdops.studio) — Patricia Osorio’s Thailand-only automation studio, based in Bangkok. Thai is the primary market and default locale; English is secondary.

The app lives at the repository root (Next.js 15 App Router). It deploys to Firebase App Hosting.

## Stack

- Next.js 15 (App Router) + React 19
- TypeScript strict
- Tailwind CSS v4 (tokens in `app/globals.css` via `@theme`)
- Firebase App Hosting (SSR)

Fonts: JetBrains Mono (UI), IBM Plex Sans Thai (Thai body), Helvetica Neue (English body).

## Pages

Every page ships in `/th` (default) and `/en`. Unprefixed URLs redirect to `/th` — no browser-language sniffing.

| Path | Page |
| --- | --- |
| `/` | Home |
| `/services` | Services index |
| `/services/workspace` | Workspace automation |
| `/services/web` | Websites and web apps |
| `/services/ai` | AI flows |
| `/services/data` | Data engineering and data flows |
| `/work` | Work |
| `/blog` | Blog index |
| `/blog/[slug]` | Blog post |
| `/pricing` | Pricing |
| `/how-it-works` | How it works |
| `/about` | About |
| `/contact` | Contact |

## Local development

Requires Node.js 20 or later.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). `/` redirects to `/th`.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run content:sync-images` | Upload about/work/service images to Firebase Storage |

Run lint and typecheck clean before considering a page done.

## Environment

Copy `.env.example` to `.env.local`. Never commit secrets.

Variables the site reads today:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (sitemap, Open Graph, JSON-LD) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console HTML-tag content value |
| `NEXT_PUBLIC_LINE_ADD_FRIEND_URL` | LINE Official Account add-friend link |
| `NEXT_PUBLIC_MESSENGER_URL` | Messenger fallback link |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project (`stdops-af357`) |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Storage bucket (`stdops-af357.firebasestorage.app`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID (`G-…`) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console HTML-tag `content=` value |
| `NEXT_PUBLIC_LINE_ADD_FRIEND_URL` | LINE Official Account add-friend HTTPS URL |

About, Work, and service screenshots live in Firebase Storage (`content/**`). URLs are stored in Firestore `content/images`. Run `npm run content:sync-images` with Application Default Credentials to upload. Contact form posts land in Firestore `contactMessages` via `/api/contact` (Admin SDK). The rest of `.env.example` (Firebase client keys, Stripe, LINE channel tokens, Meta Pixel) is reserved for later phases.

On Firebase App Hosting, set public env in `apphosting.yaml`.

## Project layout

```
app/[locale]/          # Locale-scoped pages
components/            # One named export per file
lib/i18n/              # Typed TH/EN dictionaries
lib/blog/              # Blog loader (JSON under content/blog/)
lib/design/            # Accent color map
middleware.ts          # Redirects unprefixed paths to /th
apphosting.yaml        # Firebase App Hosting config
```

Copy lives in `lib/i18n/dictionaries/th.ts` and `en.ts`, typed by `types.ts`. Do not hardcode English (or Thai) strings in component bodies.

Blog posts are JSON files in `content/blog/`. Filename must match `slug`. Posts with `"draft": true` are omitted from the public index, post pages, and sitemap.

## Design

Layout, spacing, and typography follow the approved mockups in `docs/website html mockups/*.dc.html`. Design tokens live in `app/globals.css` — do not hardcode hex colors, pixel font sizes, or font-family strings in components.

Every page has a LINE CTA (`components/line-cta.tsx`), sticky on mobile.

## Out of scope

This repo is the marketing site. Do not build these here until they are explicitly in scope:

- Stripe checkout
- LINE webhook handlers
- Internal apps (quotation bot, AI flows)

The contact form writes to Firestore `contactMessages`. Photography slots on Work/About/Services resolve from Storage (local `public/` in dev).

## Deploy

Firebase App Hosting backend id: `thai-business-website` (see `firebase.json`).

```bash
npm run build
```

Production deploys from the connected git remote via App Hosting. After changing secrets or `apphosting.yaml` env, roll a new backend release so BUILD-time `NEXT_PUBLIC_*` values are baked into the client bundle.
