# stdops launch readiness

Marketing site: Next.js 15 App Router, Firebase App Hosting (`thai-business-website`), Thai default `/th`, English `/en`. Canonical origin: `https://stdops.studio`. Firebase project: `stdops-af357`. Storage bucket: `gs://stdops-af357.firebasestorage.app`.

Audit date: 11 Sep 2026. This file is the handoff for a new chat. **Do not rebuild sitemap, robots, hreflang, GA4, or CSP from scratch — they already exist.**

## Verdict

Not fully launch-ready as a professional commercial site. SEO plumbing is strong. Remaining blockers are production LINE URL, Search Console verification token, legal pages, and CI.

## Already in good shape (do not redo)

| Area | Where |
| --- | --- |
| Bilingual XML sitemap + hreflang (`x-default` → th) | `app/sitemap.ts` |
| `robots.txt` pointing at sitemap | `app/robots.ts` |
| Canonical, hreflang, OG, Twitter, robots meta | `lib/seo.ts` |
| GA4 `G-1YS57ZNCJX` + SPA `page_view` | `components/ga-tag.tsx`, `components/ga-page-view.tsx`, `apphosting.yaml` |
| JSON-LD: ProfessionalService, WebSite, Service, Article, FAQPage, Person, BreadcrumbList | `lib/json-ld.ts` |
| Security headers (CSP, HSTS, XFO DENY, nosniff, COOP, Permissions-Policy) | `next.config.ts` |
| Firestore rules deny all client access (Admin SDK only) | `firestore.rules` |
| Storage public read only on `content/**` | `storage.rules` |
| Locale middleware: unprefixed → `/th` | `middleware.ts` |
| Draft blog posts excluded from sitemap / 404 | `lib/blog/load-posts.ts` |
| About + Work + service screenshots from Firebase Storage | `lib/content/storage.ts`, `lib/content/load-images.ts` |

### Firebase Storage objects (confirmed HTTP 200)

Bucket: `gs://stdops-af357.firebasestorage.app`

- `content/about/photo.jpg`
- `content/work/case-supermarket.png`
- `content/work/case-pharma.png`
- `content/work/case-mfg.png`
- `content/work/case-fintech.png`
- `content/work/case-royalties.png`
- `content/services/snapshot-workspace-automation.png`
- `content/services/snapshot-business-website.png`
- `content/services/snapshot-ai-flows.png`
- `content/services/snapshot-data-engineering.png`
- `content/services/snapshot-new-business.png` (in Storage, **no page uses it yet**)

Public URL pattern:

`https://firebasestorage.googleapis.com/v0/b/stdops-af357.firebasestorage.app/o/{urlencoded-path}?alt=media`

`loadContentImages()` returns these Storage URLs directly. It does **not** read Firestore for images anymore.

## Done in the 11 Sep 2026 session

- Service detail pages load screenshots from Storage (same pattern as Work/About).
- Contact form POSTs to `/api/contact` and writes Firestore collection `contactMessages` via Admin SDK (honeypot + in-memory rate limit). Clients cannot read/write that collection.
- Branded 404 + error pages (TH/EN), site chrome, LINE CTA. Fixed `app/global-error.tsx` CSS import (`./globals.css`).
- Root layout emits Google verification meta **when** `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is set.

## Open P0 — still blocking a pro launch

### 1. LINE add-friend URL (env)

Every LINE button uses `getLineAddFriendUrl()` → `NEXT_PUBLIC_LINE_ADD_FRIEND_URL`, fallback `#line`.

**Need from Patricia:** HTTPS add-friend URL from LINE Official Account Manager (`https://lin.ee/…` or `https://line.me/R/ti/p/@…`).

Then set in `.env.local` and `apphosting.yaml` as `NEXT_PUBLIC_LINE_ADD_FRIEND_URL` (`availability: [BUILD, RUNTIME]`). Redeploy App Hosting so the client bundle picks it up.

Optional: `NEXT_PUBLIC_MESSENGER_URL` the same way (currently `#messenger`).

### 2. Search Console verification (env)

Code is ready (`lib/env.ts` `getGoogleSiteVerification()`, merged into `pageMetadata` and root `generateMetadata`).

**Need from Patricia:** Search Console → URL-prefix property `https://stdops.studio` → HTML tag → paste only the `content="…"` token into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (`.env.local` + `apphosting.yaml`). After deploy: Sitemaps → submit `https://stdops.studio/sitemap.xml`.

Do **not** use gcloud for this.

### 3. Contact form locally

Production App Hosting has Admin credentials (`FIREBASE_CONFIG`). Local submit returns 503 unless `GOOGLE_APPLICATION_CREDENTIALS` points at a Firebase **service account JSON** (Console → Project settings → Service accounts → Generate new private key). Put the **file path** in `.env.local`. Do not commit the JSON. Do not paste the JSON into chat.

## Open P1 — professional before calling it done

1. **Privacy policy TH + EN** and footer link (GA4 + contact form; Thailand PDPA).
2. **Short terms** page + footer link.
3. **Organization JSON-LD:** logo, `sameAs` (LINE/LinkedIn), contact point. `lib/json-ld.ts` currently has Bangkok/TH only — no street, phone, email, logo.
4. **Footer NAP:** “Bangkok, Thailand” + legal links. Street address only if she wants it public.
5. **CI:** GitHub Action running `npm run lint`, `npm run typecheck`, `npm run build` on PRs. No `.github/workflows` today.
6. **`loading.tsx`** for client navigations (no pending UI today).
7. **Thai DRAFT copy** in `lib/i18n/dictionaries/th.ts` (four `// DRAFT:` comments) — native review.
8. **`public/` is gitignored.** That is OK if production images stay on Storage. Do not rely on `public/` for deploy.
9. **`.firebaserc` is gitignored** — local Firebase CLI project linking is machine-specific.

## P2 — later, not launch-blocking

- Meta Pixel (env placeholder only, no code).
- Cookie banner (after privacy policy).
- Per-blog OG images (shared locale OG exists: `app/[locale]/opengraph-image.tsx`).
- Wire `snapshot-new-business.png` to a page if wanted.
- Sentry / uptime.
- `minInstances: 1` in `apphosting.yaml` (currently `0` → cold starts).
- Nonce-based CSP (today `script-src`/`style-src` allow `unsafe-inline`).
- Hide contact form on local when Admin creds are missing, or document 503.

## Google Search — facts (not a ranking cheat sheet)

Google needs crawlable HTTPS pages, unique titles, mobile layout, helpful content. This repo already has sitemap, robots, canonicals, hreflang, structured data.

**Required ops, not extra tags:** Search Console property + sitemap submit.

**Not required for organic ranking:** PWA manifest, llms.txt, IndexNow, cookie CMP.

**Off-site:** Google Business Profile for Bangkok local pack; consistent NAP.

Home metadata comes from `app/[locale]/layout.tsx` `dict.meta`; other routes override via `pageMetadata()`. Fallback site origin if env missing: `https://your-domain.com` (`lib/safe-url.ts`) — production sets `NEXT_PUBLIC_SITE_URL`.

## Security notes

- No API keys committed except public client IDs (GA measurement ID, Firebase project/bucket, site URL).
- Contact writes are Admin SDK only; Firestore rules remain deny-all for clients.
- JSON-LD escapes `<`. FAQ/LINE URLs go through `isSafeHref` / `safeHttpsUrl`.
- No cookie consent yet — legal/PDPA gap if GA4 runs in production.

## SRE / deploy notes

- App Hosting: `minInstances: 0`, `maxInstances: 2`, 512 MiB.
- No custom health check, no Sentry, no tests.
- `next.config.ts` `images.remotePatterns` includes `firebasestorage.googleapis.com`.
- `.env.local` may use `gs://stdops-af357.firebasestorage.app`; `getStorageBucket()` strips the `gs://` prefix.

## Suggested next-chat prompt

```
Read LAUNCH-READINESS.md at the repo root. Continue P0: wire LINE and Search Console once I paste the URLs/tokens. Then P1 legal pages + footer + CI. Do not rebuild sitemap/GA4/CSP. Match existing site styles (Tailwind tokens, dictionaries TH/EN, no hardcoded English in components).
```

## Values still needed from Patricia

Paste in chat (these are public client IDs, except the service-account **path**):

1. `NEXT_PUBLIC_LINE_ADD_FRIEND_URL` — `https://lin.ee/…` or `https://line.me/R/ti/p/@…`
2. `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — Search Console HTML-tag content token
3. Optional: `NEXT_PUBLIC_MESSENGER_URL`
4. Optional for local contact testing: absolute path to Firebase service account JSON as `GOOGLE_APPLICATION_CREDENTIALS` in `.env.local` (never commit the file)
