# Ali Ghnainia — Developer Portfolio

A static, responsive bilingual portfolio for Ali Ghnainia, a Java / Spring Boot Full Stack Developer in Sfax, Tunisia. English and French pages share components and use locale-aware content files. It presents documented professional work through written case studies and original code-drawn architecture visuals. SAEIV and STATLINK contain no private code, internal URLs or system screenshots.

## Stack

- Next.js 16 App Router with static export
- React 19, TypeScript, Tailwind CSS 4
- No backend or runtime API dependencies

## Local setup

Requires Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to the final canonical public origin before a production build. On Windows PowerShell, copy the template with `Copy-Item .env.example .env.local`, then **replace** `https://YOUR-DOMAIN-HERE` with the real domain. Do not deploy the placeholder value.

Open <http://localhost:3000>. `/` leads to `/en`; `/fr` provides the French version. The site works locally without `.env.local`; canonical and hreflang metadata are omitted and the sitemap contains no URLs until a real site origin is configured. Vercel uses the HTTP redirect in `vercel.json`; the static root page also provides a refresh fallback.

## Quality checks and build

```bash
npm run lint
npm run typecheck
npm run build
```

The static output is written to `out/`. Both locales and their three project routes are generated at build time. No server is needed to host `out/`.

## Deploy to Vercel

1. Import this repository as a Next.js project.
2. Set `NEXT_PUBLIC_SITE_URL` to the final canonical site origin, without a trailing slash.
3. Deploy. Next.js uses `output: "export"`; Vercel can serve the generated static site.
4. Confirm `/` redirects to `/en`, both language routes work, and `/sitemap.xml`, `/robots.txt`, project pages and both CV links are correct.

No GitHub remote or deployment is configured in this repository.

## Custom domain / DNS setup

1. Deploy the project to Vercel.
2. Open **Project Settings → Domains**.
3. Add the root domain and its `www` variant.
4. Copy the **exact DNS records shown by Vercel** into the DNS provider. Do not assume fixed A or CNAME values; Vercel may give project-specific records.
5. Choose one canonical domain in Vercel and redirect the other variant to it.
6. Set `NEXT_PUBLIC_SITE_URL` in Vercel's Production environment to that canonical origin, for example `https://your-real-domain.tld`.
7. Redeploy so the build uses the new value.
8. Verify `/sitemap.xml`, `/robots.txt`, canonical links and `hreflang` links on `/en`, `/fr` and both project-language variants.

The DNS instructions in the Vercel dashboard are authoritative for the actual domain.

## Structure

```text
src/
  app/
    [locale]/page.tsx        English/French homepage route
    [locale]/projects/[slug]/page.tsx  Localized project routes
    [locale]/layout.tsx      Localized metadata, header, footer, Person JSON-LD
    (redirect)/             Static root fallback for / → /en
    globals.css              Tailwind import and visual system
    sitemap.ts, robots.ts    Search engine files
  components/
    home-page.tsx, project-case-page.tsx  Shared page components
    locale-chrome.tsx, language-switcher.tsx  Navigation and locale switch
    portrait-card.tsx, locale-visuals.tsx     Portrait and diagrams
  content/
    en.ts, fr.ts, i18n.ts    Localized content and locale helpers
    site.ts                  Shared factual profile, project and metric source
public/cv/                   English and French general CVs
public/images/               Optional approved professional portrait
```

## Update content

Edit `src/content/site.ts` for shared factual project data and metrics. English interface and experience copy live in `src/content/en.ts`; French translations and French case studies live in `src/content/fr.ts`. Each project slug generates matching `/en/projects/[slug]` and `/fr/projects/[slug]` routes. Keep claims and metrics aligned across both locales.

The header switcher keeps the current project slug when changing language. Page components are shared, with no i18n library dependency.

## Replace the CV

Replace `public/cv/Ali_GHNAINIA_CV_EN.pdf` and `public/cv/Ali_GHNAINIA_CV_FR.pdf` with the latest **general** English and French CVs, respectively. Keep those names or update the locale dictionaries. Do not use role-specific tailored CVs. The current files were copied from the job-search workspace's explicitly identified English and French master PDFs.

## Add the professional portrait

Place the final approved photo at `public/images/ali-profile.jpg` and rebuild. Use a high-resolution portrait crop, roughly **4:5**, with a neutral or dark background. Until that file exists at build time, the hero shows a designed monogram placeholder. No photo is generated or pulled from another profile automatically.

## Add screenshots later

Store only approved, public-safe images under `public/projects/<slug>/`. Add an image reference in the corresponding project entry and render it in `src/components/visuals.tsx` or the project page. Keep the code-drawn architecture visual as a fallback. Do not upload screenshots from private company systems without permission and review.

## SEO

Locale-specific titles, descriptions, Open Graph tags, Person structured data, canonical and `hreflang` links, `robots.txt` and a bilingual `sitemap.xml` are included. Set `NEXT_PUBLIC_SITE_URL` before production deployment so generated URLs use the correct canonical origin.
