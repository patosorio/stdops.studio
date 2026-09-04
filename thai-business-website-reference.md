# thai-business website — build reference

Everything below is content for you to create locally. This is just the plan and the code, ready to paste in.

## Architecture decisions, with tradeoffs

**Next.js version — 15.5.x, not 16.** Next.js 16.3 is current stable (Aug 2026), but
Firebase App Hosting's Next.js adapter docs list official support only up to 15.0–15.2
("Active") plus 13.5/14.2 as LTS. Using 16 with App Hosting is unverified territory right
now. Given the 30-day launch clock, I'd rather ship on the version the adapter guarantees
and revisit 16 once the adapter catches up — check
[firebase.google.com/docs/app-hosting/frameworks-tooling](https://firebase.google.com/docs/app-hosting/frameworks-tooling)
before upgrading.

**Firebase App Hosting over static export + classic Hosting.** You said Firebase for
hosting/auth, so the real choice is which Firebase Hosting mode:
- *App Hosting* (recommended): deploys Next.js SSR/API routes natively from git, no
  separate Cloud Functions wiring. You'll need server routes soon anyway — Stripe quote
  flow, LINE webhook, the AI-flow bots — so one deploy target now beats migrating later.
  GA since April 2025. Cloud Run-based pricing, cheap at marketing-site traffic.
- *Static export*: simplest/cheapest possible v1, but zero server routes — Stripe and LINE
  webhooks would need their own Cloud Functions from day one. Skip unless you want to
  delay the server-side work past week 1.

**i18n — plain typed dictionaries, not next-intl.** TH default (`/th`), EN secondary
(`/en`), middleware redirects `/` → `/th` unconditionally (no browser-language sniffing —
you lead with Thai regardless of visitor locale, per your own positioning rule). Two
locales, no pluralization complexity — a library would be framework weight without
architectural payoff here, so plain `Record<Locale, Dictionary>` objects with a shared
TypeScript type (drift between `th.ts`/`en.ts` becomes a type error, not a bug you find in
prod).

**Cursor rules — `.cursor/rules/*.mdc`, not `.cursorrules`.** Checked this because it's
easy to get wrong: `.cursorrules` still parses in 2026 but Cursor's Agent mode silently
ignores it. The current format is one or more `.mdc` files under `.cursor/rules/` with
YAML frontmatter (`description`, `globs`, `alwaysApply`).

**Tailwind v4, CSS-first config.** Tokens live as `@theme` variables in `app/globals.css` —
no `tailwind.config.ts`. Matches "explicit over implicit": every color/font/spacing value
Cursor or you reach for is one file, not a JS config plus a CSS file.

## What I already verified

I scaffolded this exact structure once (before clearing it per your instruction) and ran
`tsc --noEmit` clean, and `next build` got through page generation successfully — the only
failure was an `EPERM` on `.next` cleanup that traced to the cloud sandbox's FUSE-mounted
view of your folder, not your actual Mac filesystem or the code. The component/type
structure below is sound.

## Design tokens (confirmed from `home.dc.html`, not the mockups folder's `_ds/` — see below)

| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#000000` | text |
| `--color-paper` | `#ffffff` | background |
| `--color-accent-blue` | `#1F4FD8` | Workspace automation — thin elements only |
| `--color-accent-yellow` | `#F2B705` | Web dev + web apps |
| `--color-accent-red` | `#E2382B` | AI flows |
| `--color-accent-green` | `#1B9E58` | Data engineering + data flows |
| `--font-mono` | JetBrains Mono | structural/UI |
| `--font-thai` | IBM Plex Sans Thai | Thai body |
| `--font-en` | Helvetica Neue | English body |

**Ignore `website html mockups/_ds/organic-.../` completely.** It's a different, unused
"warm/rounded terracotta" design system (Caprasimo font, cream ground, pill buttons) that
Claude Design bundles by default — it has nothing to do with your actual pages. Your real
pages are pure inline styles matching the table above; don't let Cursor pick up `_ds/`
as a reference by accident.

---

## File-by-file content

### `package.json`
```json
{
  "name": "thai-business-website",
  "version": "0.1.0",
  "private": true,
  "engines": { "node": ">=20.0.0" },
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "15.5.2",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.2.0",
    "@tailwindcss/postcss": "^4.0.0",
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.2",
    "@types/react-dom": "^19.0.2",
    "eslint": "^9.17.0",
    "eslint-config-next": "15.5.2",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.2"
  }
}
```

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### `next.config.ts`
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Add real remote patterns once photography is sourced.
    remotePatterns: [],
  },
};

export default nextConfig;
```

### `postcss.config.mjs`
```js
const config = {
  plugins: { "@tailwindcss/postcss": {} },
};

export default config;
```

### `.gitignore`
```
/node_modules
/.pnp
.pnp.js
/coverage
/.next/
/out/
/build
.firebase/
firebase-debug.log
.firebaserc
.DS_Store
*.pem
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.env
.env*.local
*.tsbuildinfo
next-env.d.ts
```

### `.env.example`
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_STARTER_PAYMENT_LINK=
NEXT_PUBLIC_STRIPE_PRO_PAYMENT_LINK=

LINE_CHANNEL_ACCESS_TOKEN=
LINE_CHANNEL_SECRET=
NEXT_PUBLIC_LINE_OA_ID=
NEXT_PUBLIC_LINE_ADD_FRIEND_URL=

NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_META_PIXEL_ID=

NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### `apphosting.yaml`
```yaml
# https://firebase.google.com/docs/app-hosting/configure
runConfig:
  minInstances: 0
  maxInstances: 2
  cpu: 1
  memoryMiB: 512

env:
  - variable: NEXT_PUBLIC_SITE_URL
    value: https://your-domain.com
    availability: [BUILD, RUNTIME]
  # Secrets (Stripe, LINE, GA) via `firebase apphosting:secrets:set <NAME>`,
  # then reference here with `secret: <NAME>` — never commit real values.
```

### `firebase.json`
```json
{
  "apphosting": {
    "backendId": "thai-business-website",
    "rootDir": "/",
    "ignore": ["node_modules", ".git", ".next"]
  }
}
```

---

### `.cursor/rules/000-project.mdc`
```
---
description: Core project context for thai-business — read this first on every task
alwaysApply: true
---

# thai-business website

Patricia Osorio's Thailand-only services business, launched September 2026. This repo is
the marketing site: Next.js 15 (App Router, TypeScript, strict), Tailwind CSS v4, deployed
to Firebase App Hosting. TH is the primary market and default locale; EN is secondary.

## Non-negotiables

- Every page ships in `/th` (default) and `/en`. Never hardcode English strings in a
  component body — pull copy from `lib/i18n/dictionaries/*.ts`.
- Every page carries a LINE CTA, sticky on mobile. See `components/line-cta.tsx`.
- Match the approved mockups in `../website html mockups/*.dc.html` pixel-for-pixel on
  layout, spacing and typography. Those files are the source of truth for design — when in
  doubt, open the matching `.dc.html` and read its inline styles, not this file's memory of
  them. Ignore `website html mockups/_ds/` entirely — it's an unused leftover design system,
  not this project's look.
- Design tokens live in `app/globals.css` as CSS variables (see 010-design-system.mdc).
  Never hardcode a hex color, a px font-size, or a font-family string in a component —
  reference the token.
- Server-first: default to Server Components. Only add `"use client"` for actual
  interactivity (lang toggle affordances, form state, mobile menu). Data fetching and
  content lookup happen in Server Components / route handlers, not in the browser.
- No hardcoded secrets, ever. Stripe/LINE/GA keys come from `.env.local` (never committed)
  or Firebase App Hosting secrets (`apphosting.yaml` + `firebase apphosting:secrets:set`).

## Stack

- Next.js 15 App Router, TypeScript strict, React 19
- Tailwind CSS v4 (CSS-first config via `@theme` in `app/globals.css` — no `tailwind.config.ts`)
- Firebase App Hosting (SSR/ISR) for deploy; Firebase Auth reserved for future internal apps
- Fonts: JetBrains Mono (structural/UI), IBM Plex Sans Thai (Thai body), Helvetica Neue (EN body)

## Out of scope for this repo right now

Stripe checkout logic, LINE webhook handlers, and the internal apps (quotation bot, AI
flows) are future phases per the project roadmap. Don't build them speculatively — land the
marketing site first. Flag anything that looks like scope creep rather than building it.
```

### `.cursor/rules/010-design-system.mdc`
```
---
description: Visual design system — colors, type, layout rules for every page/component
globs: ["app/**/*.tsx", "components/**/*.tsx", "app/globals.css"]
alwaysApply: false
---

# Design system

White background (#fff), black text (#000). Monospace (JetBrains Mono) for everything
structural — nav, labels, buttons, numbers, kickers. Helvetica Neue for English body copy,
IBM Plex Sans Thai for Thai body copy.

## Colors — thin elements only, never fills

Four accents, each tied to a service line. Use them for 1px rules, small dots, underlines,
and full section titles/headings — never as a background fill, never on large surfaces.

| Token | Hex | Service |
|---|---|---|
| `--color-blue` | `#1F4FD8` | Workspace automation |
| `--color-yellow` | `#F2B705` | Web dev + web apps |
| `--color-red` | `#E2382B` | AI flows |
| `--color-green` | `#1B9E58` | Data engineering + data flows |

## Hard rules

- No cards, no drop shadows, no gradients, no stock photography.
- No rounded corners on structural elements (buttons/inputs are square-cornered, 1px
  borders) — this is not the "Organic" system in `_ds/`, ignore that folder completely.
- Section titles and dividers use accent color; body text is always black on white.
- LINE CTA button always carries the green dot + "LINE" label pattern from the mockups.
- Tabular numbers (`font-variant-numeric: tabular-nums`) on all stats/prices.

## Implementation

Tokens are CSS variables defined once in `app/globals.css` under `@theme`. Reference them
as Tailwind utilities — never inline a hex value in a `.tsx` file. If a mockup uses a value
not yet in `globals.css`, add the token there first, then use it.
```

### `.cursor/rules/020-i18n-content.mdc`
```
---
description: TH/EN routing and content conventions
globs: ["app/[locale]/**/*.tsx", "lib/i18n/**/*.ts"]
alwaysApply: false
---

# i18n

Route-based locales: `/th/...` (default, primary market) and `/en/...`. `/` redirects to
`/th` via `middleware.ts`. No client-side language toggle state — the locale is the URL.

- Every page component receives `params: Promise<{ locale: 'th' | 'en' }>` (Next 15 async
  params) and looks up copy via `getDictionary(locale)`.
- Dictionaries live in `lib/i18n/dictionaries/th.ts` and `en.ts`, one exported object with
  the same shape in both files (TypeScript will error on drift — keep it that way, don't
  loosen the shared type).
- Thai copy comes first when drafting a new page's content — translate to English second,
  never the reverse (matches the business's Thai-first positioning).
- Use `generateStaticParams` returning `[{ locale: 'th' }, { locale: 'en' }]` on every page
  under `[locale]`, and set `alternates.languages` in `generateMetadata` for hreflang.
- Pull real copy (proof numbers, case studies, pricing) from the matching `.dc.html` mockup
  and `thailand_services_campaign_pack.md` — don't invent placeholder copy for anything
  that already has approved wording.
```

### `.cursor/rules/030-code-conventions.mdc`
```
---
description: TypeScript/React coding conventions for this repo
alwaysApply: true
---

# Code conventions

- TypeScript strict, no `any`. Type every component's props explicitly.
- Functional components only. Server Components by default; `"use client"` only where the
  component genuinely needs browser state or events.
- One component per file, named exports.
- Styling is Tailwind utility classes only — no CSS-in-JS, no styled-components, no inline
  `style={{}}` except for genuinely dynamic per-instance values (e.g. a color prop driving
  a border color from the service-color map).
- Prices, stats, and any numeric proof points render with `tabular-nums` and come from a
  typed constant, never a magic string re-typed per page.
- Run `pnpm lint` and `pnpm typecheck` clean before considering a page done.
- Commit messages: conventional commits (`feat:`, `fix:`, `chore:`, `content:`).
```

---

### `middleware.ts`
```ts
import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["th", "en"] as const;
const DEFAULT_LOCALE = "th";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  // Thai-first: unprefixed paths always resolve to /th, never browser-language sniffed.
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
```

### `app/globals.css`
```css
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=IBM+Plex+Sans+Thai:wght@400;500;700&display=swap");
@import "tailwindcss";

/* Design tokens — single source of truth. Never hardcode a hex/font/px value in a
   component; add or use a token here instead. See .cursor/rules/010-design-system.mdc. */
@theme {
  --color-ink: #000000;
  --color-paper: #ffffff;

  --color-accent-blue: #1f4fd8;   /* Workspace automation */
  --color-accent-yellow: #f2b705; /* Web dev + web apps */
  --color-accent-red: #e2382b;    /* AI flows */
  --color-accent-green: #1b9e58;  /* Data engineering + data flows */

  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --font-thai: "IBM Plex Sans Thai", sans-serif;
  --font-en: "Helvetica Neue", Arial, sans-serif;
}

*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--color-paper);
  color: var(--color-ink);
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; }
::selection { background: var(--color-accent-blue); color: var(--color-paper); }
.tabular-nums { font-variant-numeric: tabular-nums; }
```

### `lib/i18n/config.ts`
```ts
export const locales = ["th", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "th";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
```

### `lib/i18n/dictionaries/types.ts`
```ts
export interface NavItem {
  label: string;
  href: string;
  color: string;
}

export interface ServiceEntry {
  name: string;
  desc: string;
  price: string;
  href: string;
  color: string;
}

export interface ProofEntry {
  num: string;
  desc: string;
  color: string;
}

export interface Dictionary {
  meta: { title: string; description: string };
  nav: { brand: string; items: NavItem[]; lineLabel: string };
  home: {
    headline: string;
    sub: string;
    proofLabel: string;
    priceLabel: string;
    lineCta: string;
    servicesTitle: string;
    proofTitle: string;
    services: ServiceEntry[];
    proofs: ProofEntry[];
  };
  footer: { line: string; copyright: string };
}
```

### `lib/i18n/dictionaries/th.ts`
```ts
import type { Dictionary } from "./types";

export const th: Dictionary = {
  meta: {
    title: "ระบบอัตโนมัติระดับองค์กร ในราคาที่ SME จ่ายได้ | Patricia Osorio",
    description:
      "วิศวกรข้อมูล 8 ปี ในองค์กรยุโรป ตอนนี้สร้างระบบอัตโนมัติให้ธุรกิจไทยที่ทำงานผ่าน Google Workspace, LINE และสเปรดชีต",
  },
  nav: {
    brand: "P/O · TH",
    items: [
      { label: "บริการ", href: "/services", color: "var(--color-accent-blue)" },
      { label: "ผลงาน", href: "/work", color: "var(--color-accent-yellow)" },
      { label: "ราคา", href: "/pricing", color: "var(--color-accent-red)" },
      { label: "วิธีการทำงาน", href: "/how-it-works", color: "var(--color-accent-green)" },
      { label: "เกี่ยวกับ", href: "/about", color: "var(--color-accent-blue)" },
      { label: "ติดต่อ", href: "/contact", color: "var(--color-accent-yellow)" },
    ],
    lineLabel: "LINE",
  },
  home: {
    headline: "ระบบอัตโนมัติระดับองค์กร ในราคาที่ SME จ่ายได้",
    sub: "วิศวกรข้อมูล 8 ปี ในองค์กรยุโรป ตอนนี้สร้างระบบอัตโนมัติให้ธุรกิจไทยที่ทำงานผ่าน Google Workspace, LINE และสเปรดชีต",
    proofLabel: "พนักงานย้ายข้อมูลสำเร็จ",
    priceLabel: "แพ็กเกจเริ่มต้น",
    lineCta: "แชททาง LINE",
    servicesTitle: "บริการ",
    proofTitle: "ผลงานที่พิสูจน์แล้ว",
    services: [
      { name: "ระบบอัตโนมัติ Workspace", desc: "Sheets, Forms, Gmail, Drive, Calendar ต่อกันเป็นระบบทำงานจริง", price: "จาก ฿25,000", href: "/services/workspace", color: "var(--color-accent-blue)" },
      { name: "เว็บไซต์ธุรกิจ", desc: "เว็บไซต์และเว็บแอปสำหรับธุรกิจไทย", price: "จาก ฿45,000", href: "/services/web", color: "var(--color-accent-yellow)" },
      { name: "AI Flows", desc: "LINE agent, ประมวลผลเอกสาร, บอทใบเสนอราคา", price: "จาก ฿50,000", href: "/services/ai", color: "var(--color-accent-red)" },
      { name: "Data Flows", desc: "POS, บัญชี, LINE, Shopee/Lazada ในเลเยอร์เดียว", price: "จาก ฿180,000", href: "/services/data", color: "var(--color-accent-green)" },
    ],
    proofs: [
      { num: "70%", desc: "ลดเวลาประมวลผลออเดอร์ — บริษัทยาในยุโรป", color: "var(--color-accent-blue)" },
      { num: "85%", desc: "ลดการกรอกข้อมูลมือ — บริษัทผลิตในยุโรป", color: "var(--color-accent-red)" },
      { num: "22K", desc: "พนักงานย้ายข้อมูล HR สู่ BigQuery — เชนซูเปอร์มาร์เก็ตยุโรป", color: "var(--color-accent-green)" },
    ],
  },
  footer: { line: "แชททาง LINE", copyright: `© ${new Date().getFullYear()} Patricia Osorio` },
};
```

### `lib/i18n/dictionaries/en.ts`
```ts
import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    title: "Enterprise-grade automation, priced for your business | Patricia Osorio",
    description:
      "8+ years shipping production systems for European enterprises — now bringing that rigour to Thai SMBs running on Google Workspace, LINE and spreadsheets.",
  },
  nav: {
    brand: "P/O · EN",
    items: [
      { label: "Services", href: "/services", color: "var(--color-accent-blue)" },
      { label: "Work", href: "/work", color: "var(--color-accent-yellow)" },
      { label: "Pricing", href: "/pricing", color: "var(--color-accent-red)" },
      { label: "How it works", href: "/how-it-works", color: "var(--color-accent-green)" },
      { label: "About", href: "/about", color: "var(--color-accent-blue)" },
      { label: "Contact", href: "/contact", color: "var(--color-accent-yellow)" },
    ],
    lineLabel: "LINE",
  },
  home: {
    headline: "Enterprise-grade automation, priced for your business.",
    sub: "8+ years shipping production systems for European enterprises — now bringing that rigour to Thai SMBs running on Google Workspace, LINE and spreadsheets.",
    proofLabel: "employees migrated",
    priceLabel: "starting package",
    lineCta: "Chat on LINE",
    servicesTitle: "Services",
    proofTitle: "Proven results",
    services: [
      { name: "Workspace Automation", desc: "Sheets, Forms, Gmail, Drive, Calendar wired into real workflows", price: "From ฿25,000", href: "/services/workspace", color: "var(--color-accent-blue)" },
      { name: "Business Website", desc: "Websites and web apps for Thai businesses", price: "From ฿45,000", href: "/services/web", color: "var(--color-accent-yellow)" },
      { name: "AI Flows", desc: "LINE agents, document processing, quotation bots", price: "From ฿50,000", href: "/services/ai", color: "var(--color-accent-red)" },
      { name: "Data Flows", desc: "POS, accounting, LINE, Shopee/Lazada in one layer", price: "From ฿180,000", href: "/services/data", color: "var(--color-accent-green)" },
    ],
    proofs: [
      { num: "70%", desc: "Faster order processing — European pharmaceutical company", color: "var(--color-accent-blue)" },
      { num: "85%", desc: "Less manual data entry — European manufacturing company", color: "var(--color-accent-red)" },
      { num: "22K", desc: "HR records migrated to BigQuery — European supermarket chain", color: "var(--color-accent-green)" },
    ],
  },
  footer: { line: "Chat on LINE", copyright: `© ${new Date().getFullYear()} Patricia Osorio` },
};
```

### `lib/i18n/get-dictionary.ts`
```ts
import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/types";
import { th } from "./dictionaries/th";
import { en } from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { th, en };

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale];
}
```

### `components/line-cta.tsx`
```tsx
import Link from "next/link";

/** Green dot + label, black 1px border. variant="sticky" pins it to the bottom on
 * mobile — every page carries a LINE CTA, sticky on mobile, per the design system. */
export function LineCta({
  label,
  variant = "inline",
}: {
  label: string;
  variant?: "inline" | "sticky" | "big";
}) {
  const href = process.env.NEXT_PUBLIC_LINE_ADD_FRIEND_URL ?? "#line";

  if (variant === "sticky") {
    return (
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-ink bg-paper p-3 md:hidden">
        <Link href={href} className="flex items-center justify-center gap-2 border border-ink px-4 py-3 text-sm tracking-[0.02em]">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent-green)] inline-block" />
          {label}
        </Link>
      </div>
    );
  }

  const sizing = variant === "big" ? "px-7 py-3.5 text-sm gap-2.5" : "px-3.5 py-2 text-xs gap-2";

  return (
    <Link href={href} className={`inline-flex items-center border border-ink tracking-[0.02em] hover:border-[var(--color-accent-green)] transition-colors ${sizing}`}>
      <span className="w-2 h-2 rounded-full bg-[var(--color-accent-green)] inline-block" />
      {label}
    </Link>
  );
}
```

### `components/nav.tsx`
```tsx
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { LineCta } from "./line-cta";

export function Nav({ dict, locale }: { dict: Dictionary["nav"]; locale: Locale }) {
  const otherLocale: Locale = locale === "th" ? "en" : "th";

  return (
    <nav className="flex items-center justify-between gap-4 flex-wrap border-b border-ink px-5 py-5 md:px-12">
      <Link href={`/${locale}`} className="font-bold text-[15px] tracking-[-0.02em] no-underline">
        {dict.brand}
      </Link>

      <div className="flex gap-5 flex-wrap items-center">
        {dict.items.map((item) => (
          <Link key={item.href} href={`/${locale}${item.href}`} className="text-xs uppercase tracking-[0.03em] no-underline border-b-2 border-transparent pb-1 hover:[border-color:var(--color-accent-blue)] transition-colors">
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3.5">
        <LocaleSwitch current={locale} other={otherLocale} />
        <LineCta label={dict.lineLabel} />
      </div>
    </nav>
  );
}

function LocaleSwitch({ current, other }: { current: Locale; other: Locale }) {
  return (
    <Link href={`/${other}`} className="text-xs tracking-[0.03em] no-underline" aria-label={`Switch to ${other === "th" ? "Thai" : "English"}`}>
      <span className={current === "th" ? "font-bold underline" : ""}>TH</span>
      {" / "}
      <span className={current === "en" ? "font-bold underline" : ""}>EN</span>
    </Link>
  );
}
```

### `components/footer.tsx`
```tsx
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { LineCta } from "./line-cta";

export function Footer({ dict }: { dict: Dictionary["footer"]; locale: Locale }) {
  return (
    <>
      <footer className="border-t border-ink px-5 py-8 md:px-12 flex items-center justify-between flex-wrap gap-4 text-xs">
        <span>{dict.copyright}</span>
        <LineCta label={dict.line} />
      </footer>
      <LineCta label={dict.line} variant="sticky" />
      <div className="h-16 md:hidden" aria-hidden />
    </>
  );
}
```

### `components/proof-stat.tsx`
```tsx
export function ProofStat({
  value, label, color, borderColor,
}: { value: string; label: string; color?: string; borderColor: string }) {
  return (
    <div className="pl-4" style={{ borderLeft: `1px solid ${borderColor}` }}>
      <div className="tabular-nums font-bold text-[clamp(28px,4vw,40px)]" style={color ? { color } : undefined}>
        {value}
      </div>
      <div className="text-xs uppercase tracking-[0.03em] mt-1.5">{label}</div>
    </div>
  );
}
```

### `components/service-row.tsx`
```tsx
import Link from "next/link";
import type { ServiceEntry } from "@/lib/i18n/dictionaries/types";

/** Thin-rule service listing row — no card, no shadow, per the design system. */
export function ServiceRow({ service }: { service: ServiceEntry }) {
  return (
    <Link href={service.href} className="group flex items-center justify-between gap-6 py-5 border-t border-ink last:border-b no-underline">
      <div className="flex items-center gap-4">
        <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ background: service.color }} />
        <div>
          <div className="text-base font-bold">{service.name}</div>
          <div className="text-xs opacity-70 mt-0.5">{service.desc}</div>
        </div>
      </div>
      <div className="tabular-nums text-sm shrink-0">{service.price}</div>
    </Link>
  );
}
```

### `app/[locale]/layout.tsx`
```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com";

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: { th: `${siteUrl}/th`, en: `${siteUrl}/en` },
    },
  };
}

export default async function LocaleLayout({
  children, params,
}: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-mono)]">
        <Nav dict={dict.nav} locale={locale as Locale} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict.footer} locale={locale as Locale} />
      </body>
    </html>
  );
}
```

### `app/[locale]/page.tsx` (home — the reference pattern for the other 11 pages)
```tsx
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";
import { ProofStat } from "@/components/proof-stat";
import { ServiceRow } from "@/components/service-row";
import { LineCta } from "@/components/line-cta";

const DOT_COLORS = [
  "var(--color-accent-blue)", "var(--color-accent-yellow)",
  "var(--color-accent-green)", "var(--color-accent-red)",
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const { home } = dict;
  const bodyFontClass = locale === "th" ? "font-[family-name:var(--font-thai)]" : "font-[family-name:var(--font-en)]";

  return (
    <section className="px-5 md:px-12 pt-10 md:pt-20 pb-16 max-w-[1400px]">
      <div className="flex gap-3 mb-7">
        {DOT_COLORS.map((color) => (
          <span key={color} className="w-2 h-2 rounded-full inline-block" style={{ background: color }} />
        ))}
      </div>

      <h1 className="text-[clamp(36px,6.5vw,72px)] leading-[1.05] tracking-[-0.02em] font-bold mb-6">
        {home.headline}
      </h1>

      <p className={`${bodyFontClass} text-[clamp(16px,2vw,18px)] leading-[1.55] max-w-[640px] mb-10`}>
        {home.sub}
      </p>

      <div className="flex gap-8 flex-wrap mb-10">
        <ProofStat value="22,000" label={home.proofLabel} color="var(--color-accent-blue)" borderColor="var(--color-accent-blue)" />
        <ProofStat value="฿25,000" label={home.priceLabel} borderColor="var(--color-ink)" />
      </div>

      <LineCta label={home.lineCta} variant="big" />

      <h2 className="text-2xl font-bold mt-20 mb-2">{home.servicesTitle}</h2>
      <div>
        {home.services.map((service) => (
          <ServiceRow key={service.href} service={service} />
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-20 mb-6">{home.proofTitle}</h2>
      <div className="flex gap-8 flex-wrap">
        {home.proofs.map((proof) => (
          <ProofStat key={proof.desc} value={proof.num} label={proof.desc} color={proof.color} borderColor={proof.color} />
        ))}
      </div>
    </section>
  );
}
```

---

## Setup steps (you run these)

```bash
cd ~/Projects/thai-business
mkdir website && cd website
# paste in the files above, then:
npm install        # or: pnpm install, if you install pnpm first
npm run dev         # http://localhost:3000 redirects to /th
npm run typecheck
npm run build
```

## The other 11 pages

Same pattern as `app/[locale]/page.tsx`: create `app/[locale]/services/page.tsx`,
`app/[locale]/services/workspace/page.tsx`, `pricing/`, `about/`, `contact/`,
`how-it-works/`, `work/`, and the 4 service subpages. For each one: open the matching
`.dc.html` mockup, read its inline styles and the data in its bottom `<script>` block,
add that page's content to both `dictionaries/th.ts` and `en.ts` under a new key
(`Dictionary` type needs the matching field added first), then build the JSX from the
mockup's structure using the shared components. Feed this pattern to Cursor with the
`.cursor/rules` in place and it should replicate it consistently page to page.
