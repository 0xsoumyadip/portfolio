# Personal Portfolio Website — Implementation Plan

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Lucide Icons

---

## Assumptions (labeled — confirm or override before Phase 1)

| #   | Assumption                                                                                                                                                                                   | Why it matters                                                                              |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| A1  | You have a resume PDF, real project data, and a headshot/illustration ready or in progress                                                                                                   | Content blocks implementation more than code does                                           |
| A2  | Deployment target is **Vercel** (native Next.js support, zero-config)                                                                                                                        | Affects env var setup, analytics, image optimization                                        |
| A3  | Contact form uses a transactional email API (**Resend**) rather than a full backend                                                                                                          | Simplest secure option for a static-ish portfolio                                           |
| A4  | You want **3–6 featured projects**, not a large catalog                                                                                                                                      | Affects whether filtering/pagination is worth building                                      |
| A5  | No CMS — content lives in local TypeScript/JSON files you edit directly                                                                                                                      | Fastest to ship; upgrade path to a CMS noted in Future Improvements                         |
| A6  | Single-language (English) site                                                                                                                                                               | Skips i18n routing complexity                                                               |
| A7  | You want a single-page scrolling site with anchor navigation (Hero → Contact), not separate routed pages per section, but **project case studies get their own routes** (`/projects/[slug]`) | Common, effective pattern for portfolios; confirm if you'd rather have fully separate pages |

**Information I need from you before implementation starts:**

1. Full name, title/tagline, and a 2–3 sentence bio
2. Resume file (PDF) and whether you want an inline preview or download-only
3. Project list: name, description, problem solved, tech stack, links (GitHub/live demo), and images for each
4. Work experience: company, role, dates, bullet achievements, tech used, per role
5. Education/certifications (if any)
6. Skills list, grouped how you'd like (or let me group them)
7. Social links (GitHub, LinkedIn, X/Twitter, email, etc.)
8. Preferred accent color / any existing brand color, or "your call"
9. Domain name (for SEO metadata, sitemap, canonical URL)
10. Analytics preference: Vercel Analytics, Plausible, GA4, or none

---

## 1. Project Overview

A single-page, section-based portfolio (with dedicated project case-study routes) built for speed, accessibility, and a distinctive but restrained visual identity. Content is fully data-driven so you can update copy/projects/experience without touching component code. Target: 95+ Lighthouse across the board, full keyboard/screen-reader support, and sub-second perceived load.

---

## 2. Design Concept

**Direction:** "Quiet confidence" — a small, restrained palette (near-black/near-white base, one accent color), a strong type scale doing most of the visual work, generous whitespace, and motion that responds to scroll/interaction rather than plays on its own.

- **Typography:** One variable sans-serif for UI/body (e.g., Geist Sans or Inter) + optionally one distinctive display face for the hero name only, used sparingly. Large, confident hero type (clamp-based fluid sizing), tight line-height on headings, relaxed line-height on body copy.
- **Color system:** Neutral base (zinc/slate scale) + a single accent used for links, CTAs, active states, and focus rings only — never decoratively. Dark mode is a true palette swap, not just inverted grayscale.
- **Spacing:** 8px baseline grid, consistent section vertical rhythm (e.g., `py-24 md:py-32`), max content width ~1200px with generous side padding on mobile.
- **Imagery:** Real project screenshots in consistent aspect-ratio frames (browser-chrome or device-frame mockups), not stock photography.
- **Motion:** Scroll-triggered fade/slide-up on section entry (once, not on every scroll), micro-interactions on hover/focus, no parallax, no auto-playing carousels.
- **What we're avoiding:** gradient text, glassmorphism, floating blobs, excessive box-shadow "neumorphism," icon-soup skill grids, generic "hire me" template energy.

---

## 3–4. Site Structure & Navigation

Single scrolling page at `/` with anchor sections; project detail pages at `/projects/[slug]`.

```
/                     → Hero, About, Skills, Experience, Projects (preview grid), Resume, Contact
/projects/[slug]      → Full case study for a project
/resume               → (optional) dedicated printable resume view, or just a download link
```

**Navigation:**

- Sticky header, transparent over hero → solid background with subtle border/blur after scroll past hero (small blur, not heavy glassmorphism).
- Desktop: logo/name left, section links center/right, theme toggle + "Resume" CTA button right.
- Mobile: logo + hamburger → shadcn `Sheet` sliding from the right with full nav + socials + resume CTA + theme toggle.
- Active-section highlighting via `IntersectionObserver` (not scroll-position math) updating a client-side nav state.
- Smooth scroll via native CSS `scroll-behavior: smooth` + `scroll-margin-top` on section anchors (accounts for sticky header height), respecting `prefers-reduced-motion`.

---

## 5. Section-by-Section Plan

### Hero

- Eyebrow text (e.g., "Full-Stack Developer") + large name + one-line value proposition + 2–3 sentence intro.
- Primary CTA: "View Projects" (scrolls to Projects). Secondary CTA: "Download Resume" (direct file link) or "Contact Me."
- Social icon row (Lucide icons: Github, Linkedin, Mail, Twitter/X as needed) with accessible labels.
- Optional profile photo or a lightweight abstract SVG/illustration — kept simple, not a hero illustration cliché.
- Entrance animation: staggered fade/slide-up on mount (name → tagline → CTAs → socials), ~400–600ms total, disabled under reduced motion.

### About

- Short bio (2–3 paragraphs): journey, what you focus on now, what drives you.
- Optional stat row (years experience, projects shipped, companies worked with) as a lightweight `Card`/grid — only if the numbers are genuinely compelling, not filler.
- Optional "currently" line (what you're learning/building now) — adds a human, current feel.

### Skills

- Grouped by category (Frontend, Backend, Databases, DevOps/Cloud, Tools/Other) using shadcn `Tabs` or a segmented layout — clicking a category filters the visible chips, avoiding one giant wall of icons.
- Each skill rendered as a `Badge`, optionally with a Lucide/brand icon, in a responsive flex-wrap grid.
- Avoid subjective proficiency bars (e.g., "React 90%") — hiring managers generally find them unconvincing; prefer grouping + optional years-used tag instead.

### Projects

- Most important section — gets the most visual weight and screen real estate.
- Featured project: one larger "hero" card (full-width or 2/3 width) for your best work.
- Remaining projects: responsive grid of `Card`s (image, title, one-line description, tech badges, GitHub + live-demo icon links).
- Hover interaction: subtle lift + image zoom (`scale-105` on the image inside an `overflow-hidden` wrapper), CTA affordance appears.
- Each card links to `/projects/[slug]` for a full case study: problem → approach → key features → tech decisions → screenshots → results/learnings.
- Optional category filter (e.g., "Web," "Mobile," "Open Source") via `Tabs` — only include if you'll have 6+ projects; skip for 3–5.

### Resume

- Short summary line + prominent "Download Resume (PDF)" button.
- Optional inline preview using an `<iframe>` or a rendered summary of key sections (not required — a clean download CTA is often enough).

### Contact

- Form: Name, Email, Message (shadcn `Input`, `Textarea`, `Label`, `Button`) with client + server-side validation (Zod).
- Submits via a Next.js Route Handler (`/api/contact`) to **Resend** (or similar) — keeps API keys server-side only, never exposed to the client.
- Rate-limiting (basic IP-based) and a honeypot field to deter spam bots.
- Direct email + social links shown alongside the form as an alternative contact path.
- Success/error state shown via shadcn `Sonner`/`Toast`, not a page reload.

### Footer

- Name/logo, quick nav links, social icons, © year (computed, not hardcoded), optional "Built with Next.js & shadcn/ui" line.

---

## 6. Component Architecture

```
<RootLayout>
  <ThemeProvider>
    <Header />              // sticky nav + mobile Sheet + theme toggle
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />          // grid of <ProjectCard />
      <Resume />
      <Contact />           // <ContactForm />
    </main>
    <Footer />
  </ThemeProvider>
</RootLayout>

/projects/[slug]/page.tsx   // <ProjectHeader /> <ProjectGallery /> <ProjectContent /> <ProjectNav />
```

**Server vs. Client components:**

- Default everything to **Server Components**. Only mark `"use client"` where interactivity/state/browser APIs are required:
  - `ThemeToggle`, `MobileNav`/`Sheet`, `ContactForm`, `ActiveSectionObserver`, any scroll-reveal wrapper, `ProjectFilterTabs` (if used).
- Static data (projects, experience, skills) is read at build/request time in Server Components and passed down as props — no client-side fetching needed for a portfolio.

---

## 7. Folder Structure

```
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── api/
│   │   └── contact/route.ts
│   └── projects/
│       └── [slug]/
│           ├── page.tsx
│           └── opengraph-image.tsx      // optional dynamic OG image
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── mobile-nav.tsx
│   │   └── footer.tsx
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── skills.tsx
│   │   ├── experience.tsx
│   │   ├── projects.tsx
│   │   ├── resume.tsx
│   │   └── contact.tsx
│   ├── shared/
│   │   ├── section-heading.tsx
│   │   ├── scroll-reveal.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── project-card.tsx
│   │   └── social-links.tsx
│   └── ui/                              // shadcn/ui generated components
├── config/
│   ├── site.ts                          // name, title, description, urls
│   ├── nav.ts
│   ├── skills.ts
│   ├── experience.ts
│   ├── projects.ts
│   └── social.ts
├── types/
│   └── index.ts
├── lib/
│   ├── utils.ts                         // cn() etc. (from shadcn)
│   ├── email.ts                         // Resend client
│   └── validations/
│       └── contact.ts                   // Zod schema
├── public/
│   ├── images/
│   ├── resume.pdf
│   └── favicon assets
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 8. Data Architecture

```ts
// types/index.ts

export interface SocialLink {
  label: string;
  url: string;
  icon: "github" | "linkedin" | "twitter" | "mail" | "instagram";
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "DevOps" | "Tools";
  icon?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  companyUrl?: string;
  role: string;
  startDate: string; // "2023-01"
  endDate: string | "Present";
  location?: string;
  achievements: string[];
  technologies: string[];
  logo?: string;
}

export interface Project {
  slug: string;
  name: string;
  description: string; // short, for cards
  problem: string; // for case-study page
  approach: string;
  keyFeatures: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  coverImage: string;
  gallery?: string[];
  featured?: boolean;
  category?: string;
  order: number;
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
}
```

Content lives in plain `.ts` files under `config/` (typed against the interfaces above) so updating a project or job is a matter of editing an object literal, with full TypeScript autocomplete/validation — no UI code touched. `Future Improvements` covers migrating this to a headless CMS or MDX if content updates become frequent.

---

## 9. shadcn/ui Components to Use

| Component                            | Where                                            |
| ------------------------------------ | ------------------------------------------------ |
| `Button`                             | CTAs throughout                                  |
| `Card`                               | Project cards, stat cards, timeline entries      |
| `Badge`                              | Skills, tech tags                                |
| `Sheet`                              | Mobile navigation                                |
| `Dialog`                             | Optional project quick-preview modal             |
| `Tabs`                               | Skills categories, project filtering             |
| `Tooltip`                            | Icon-only social links, nav icons                |
| `Separator`                          | Between sections/footer columns                  |
| `Input`, `Textarea`, `Label`, `Form` | Contact form                                     |
| `Sonner` (toast)                     | Form submit feedback                             |
| `Avatar`                             | Profile image fallback handling                  |
| `Skeleton`                           | Loading state if any client fetch is added later |

Deliberately **not** using: `Accordion`, `Carousel`, `NavigationMenu` (dropdown mega-menu is overkill for a portfolio's flat nav), `Table` — none earn their complexity here.

---

## 10. Animation Strategy

- **Approach:** CSS/Tailwind transitions + `IntersectionObserver`-driven class toggling for scroll reveal. Add **Framer Motion** only if you want spring-based, more expressive animation (hero stagger, page transitions to `/projects/[slug]`) — otherwise pure CSS keeps the bundle smaller.
- **Patterns:**
  - Hero: staggered opacity/translate-y entrance on mount.
  - Sections: fade + translate-y(16px)→0 the first time each section enters the viewport (`once: true`), via a shared `<ScrollReveal>` client wrapper.
  - Project cards: `transition-transform` lift (`hover:-translate-y-1`) + image `scale-105` inside `overflow-hidden`.
  - Buttons/links: color/background transitions on hover/focus, ~150ms.
  - Nav: underline/indicator slide for active section; mobile `Sheet` uses its built-in slide transition.
- **Guardrails:**
  - Wrap all non-essential motion in `@media (prefers-reduced-motion: no-preference)`; provide instant-state fallback otherwise.
  - Animate only `transform` and `opacity` (GPU-friendly, no layout thrash).
  - Reserve image space via explicit `width`/`height` or `aspect-ratio` to avoid CLS during entrance animations.

---

## 11. Dark / Light Theme Strategy

- `next-themes` package + shadcn's standard theming setup (CSS variables in `globals.css` for both `:root` and `.dark`).
- `attribute="class"`, `defaultTheme="system"`, `enableSystem`.
- `ThemeToggle` client component (sun/moon Lucide icons) with a no-flash `suppressHydrationWarning` on `<html>` per shadcn's documented pattern.
- All custom colors (not just shadcn defaults) defined as CSS variables so accent color changes propagate everywhere.

---

## 12. SEO Strategy

- Per-page `metadata` (Next.js Metadata API) in `app/layout.tsx` (site-wide defaults) and per-route overrides in `app/projects/[slug]/page.tsx` (`generateMetadata`).
- Open Graph + Twitter card metadata, with a static or dynamically generated OG image (`opengraph-image.tsx`) per project.
- `app/sitemap.ts` and `app/robots.ts` using Next's built-in generators — auto-includes all project slugs.
- Canonical URL set via `metadataBase`.
- Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`, `<footer>`), single `<h1>` (hero name), logical `h2`/`h3` descent per section.
- Optional JSON-LD structured data (`Person` schema) injected in the root layout for richer search snippets.
- Favicon/app icons via `app/icon.tsx` or static files in `app/` (Next auto-detects `icon.png`, `apple-icon.png`).

**What I need from you:** final domain, preferred meta description (~155 chars), and an OG preview image or permission to generate one from the hero design.

---

## 13. Accessibility Strategy

- Full keyboard operability: logical tab order, visible focus rings (`focus-visible` styles using the accent color, never `outline: none` without a replacement).
- Semantic landmarks + one skip-to-content link at the top of `<body>`.
- Color contrast checked against WCAG AA for both themes (especially accent-on-background and badge text).
- `Sheet`/`Dialog` from shadcn are Radix-based → focus trap, `Escape` to close, and ARIA roles are handled out of the box; verify labelling (`aria-label` on the trigger/close buttons).
- Form: associated `<Label>`s, `aria-describedby` for error messages, `aria-live="polite"` region for submit status, honeypot field marked `aria-hidden` and visually hidden (not `display:none`, to remain effective against bots that skip hidden fields — actually a genuinely visually-hidden but focusable-avoiding technique is used).
- All images have meaningful `alt` text (project screenshots describe what's shown; decorative elements get `alt=""`).
- Respect `prefers-reduced-motion` everywhere motion is used (see Animation Strategy).
- Icon-only buttons (social links, theme toggle, mobile menu trigger) always paired with `aria-label` or `Tooltip` + visually-hidden text.

---

## 14. Performance Strategy

- `next/image` for every raster image (project screenshots, profile photo) — automatic AVIF/WebP, responsive `sizes`, lazy loading below the fold, `priority` only on the hero image.
- `next/font` (Geist or Inter) for self-hosted, zero-CLS font loading with `display: swap`.
- Keep Server Components as the default; client bundle stays limited to nav, theme toggle, contact form, scroll-reveal wrapper.
- Code-split `/projects/[slug]` naturally via the App Router (separate route segment).
- Avoid heavy animation libraries unless the design truly calls for spring physics — pure CSS transitions where possible.
- Static generation: since content is local data, the entire site can be fully static (`generateStaticParams` for project slugs) and served from Vercel's edge/CDN — no runtime data fetching needed.
- Target Core Web Vitals: LCP < 2.0s (hero text/image), CLS < 0.05 (reserved image/font space), INP < 200ms.

---

## 15. Recommended Dependencies

| Package                                                   | Purpose                                       |
| --------------------------------------------------------- | --------------------------------------------- |
| `next`, `react`, `react-dom` (latest stable)              | Framework                                     |
| `typescript`                                              | Type safety                                   |
| `tailwindcss`, `postcss`, `autoprefixer`                  | Styling                                       |
| `shadcn/ui` CLI + `@radix-ui/*` (installed per-component) | UI primitives                                 |
| `lucide-react`                                            | Icons                                         |
| `next-themes`                                             | Dark/light theme                              |
| `zod`                                                     | Form + API input validation                   |
| `react-hook-form` + `@hookform/resolvers`                 | Contact form state/validation                 |
| `resend`                                                  | Transactional email for contact form          |
| `class-variance-authority`, `clsx`, `tailwind-merge`      | shadcn utility deps (installed automatically) |
| `framer-motion` _(optional)_                              | Only if CSS-only animation feels insufficient |
| `sonner`                                                  | Toast notifications (shadcn-recommended)      |
| ESLint + Prettier + `eslint-config-next`                  | Code quality                                  |

---

## 16. Development Phases

### Phase 1 — Project Setup & Configuration

- `create-next-app` (TypeScript, App Router, Tailwind, ESLint, `src/` optional).
- Initialize shadcn/ui (`npx shadcn@latest init`), configure `components.json`, base theme tokens.
- Set up folder structure (`config/`, `types/`, `lib/`), Prettier + ESLint rules, `.env.local` scaffold.
- **Output:** running dev server with base Tailwind/shadcn theme, no content yet.

### Phase 2 — Design System & Global Components

- Define color tokens (light/dark CSS variables), type scale, spacing scale in `globals.css`/`tailwind.config.ts`.
- Install core shadcn components (Button, Card, Badge, Separator, Tooltip).
- Build `ThemeProvider` + `ThemeToggle`.
- **Output:** themeable base UI kit, storybook-less visual check via a scratch page.

### Phase 3 — Navigation & Layout

- Build `Header`, `MobileNav` (Sheet), `Footer`, root `layout.tsx` with metadata defaults.
- Implement active-section observer + smooth-scroll anchors.
- **Files:** `components/layout/*`, `app/layout.tsx`.

### Phase 4 — Hero / About / Skills

- Build `Hero`, `About`, `Skills` sections wired to `config/site.ts` and `config/skills.ts`.
- Implement `ScrollReveal` wrapper and hero entrance animation.
- **Files:** `components/sections/hero.tsx`, `about.tsx`, `skills.tsx`, `config/skills.ts`.

### Phase 5 — Experience / Projects

- Build `Experience` timeline from `config/experience.ts`.
- Build `Projects` grid + `ProjectCard` + `/projects/[slug]` case-study route with `generateStaticParams`.
- **Files:** `components/sections/experience.tsx`, `projects.tsx`, `shared/project-card.tsx`, `app/projects/[slug]/page.tsx`, `config/projects.ts`.

### Phase 6 — Contact / Resume / Footer

- Build `ContactForm` (react-hook-form + Zod), `app/api/contact/route.ts` (Resend integration, rate limiting, honeypot).
- Build `Resume` section + place `resume.pdf` in `public/`.
- Finalize `Footer`.
- **Files:** `components/sections/contact.tsx`, `resume.tsx`, `app/api/contact/route.ts`, `lib/email.ts`, `lib/validations/contact.ts`.

### Phase 7 — Animation & Polish

- Add scroll-reveal to remaining sections, refine hover/focus micro-interactions, verify `prefers-reduced-motion` fallbacks.
- Visual QA pass across breakpoints (mobile/tablet/desktop), spacing/typography refinement.

### Phase 8 — SEO / Accessibility / Performance

- Add full metadata, OG images, `sitemap.ts`, `robots.ts`, JSON-LD.
- Run axe/Lighthouse audits, fix contrast/focus/ARIA issues.
- Optimize images/fonts, verify Core Web Vitals.

### Phase 9 — Testing & Deployment

- Cross-browser + device testing, form submission end-to-end test, 404/error page check.
- Connect Vercel project, set environment variables (`RESEND_API_KEY`, site URL), configure custom domain.
- Optional: Vercel Analytics, error monitoring (Sentry) if desired.

---

## 17. Testing Checklist

- [ ] All sections render correctly at 375px, 768px, 1024px, 1440px+ widths
- [ ] Keyboard-only pass: can reach and operate every interactive element, focus visible at all times
- [ ] Screen reader spot-check (VoiceOver/NVDA): landmarks, headings, form labels, alt text all sensible
- [ ] `prefers-reduced-motion: reduce` disables/shortens all animation
- [ ] Contact form: valid submit succeeds, invalid input shows inline errors, spam honeypot works, rate limit works
- [ ] Dark/light/system theme all render correctly with no flash-of-wrong-theme
- [ ] All external links (GitHub, live demos, socials) open correctly with `rel="noopener noreferrer"`
- [ ] Resume download works on mobile and desktop
- [ ] Lighthouse: Performance/Accessibility/Best Practices/SEO all 90+ (target 95+)
- [ ] No console errors/warnings in production build
- [ ] 404 page and any error boundaries behave gracefully
- [ ] Sitemap and robots.txt accessible and correct at production domain

---

## 18. Deployment Plan

- **Platform:** Vercel (zero-config Next.js support, edge caching, image optimization included).
- **Environment variables:** `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`, any analytics IDs — set in Vercel project settings, never committed.
- **Domain:** connect custom domain in Vercel dashboard, verify DNS, confirm HTTPS auto-provisioned.
- **Contact form:** verify sender domain in Resend, test end-to-end delivery from production before sharing the site.
- **Analytics:** Vercel Analytics (simplest, no cookie banner needed) or Plausible if you want more detail without cookie consent complexity.
- **Monitoring:** optional Sentry (or Vercel's built-in error logs) for the API route.
- **Preview deployments:** every branch/PR gets a Vercel preview URL automatically — useful for reviewing content changes before merging to `main`.

---

## Technical Risks & Mitigations

| Risk                                           | Mitigation                                                                                                  |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Over-animating hurts performance/accessibility | Keep to CSS transforms/opacity only, gate everything behind reduced-motion, review Phase 7 with a fresh eye |
| Contact form abused for spam                   | Honeypot + rate limiting + Zod validation server-side (never trust client validation alone)                 |
| Image-heavy Projects section hurts LCP         | `next/image` with correct `sizes`, lazy-load below-the-fold cards, only `priority` the hero                 |
| Content drift (stale projects/experience)      | Data-driven config files make updates a 2-minute edit, not a code change                                    |
| Scope creep (CMS, blog, i18n) before v1 ships  | Explicitly deferred to Future Improvements — ship the core portfolio first                                  |

---

## Future Improvements (post-v1)

- Migrate `config/*.ts` content to MDX or a headless CMS (Sanity/Contentful) if you'll update content frequently or want a non-code editing flow.
- Add a lightweight blog/writing section if you want to demonstrate communication skills alongside code.
- Add view-transition-based page transitions between `/` and `/projects/[slug]` (View Transitions API) for a more premium feel.
- Add a light analytics-driven "most viewed project" indicator.
- Internationalization if targeting non-English audiences.
- Automated visual regression testing (Chromatic/Playwright) once the design stabilizes.

---

**Next step:** send over the information requested at the top (bio, projects, experience, resume, socials, domain, color preference) and I'll move into Phase 1.
