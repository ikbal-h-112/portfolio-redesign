# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-file static portfolio for **Md Ikbal Hossain** (Data Analyst). Everything lives in `index.html` — no build system, no framework, no dependencies to install. Open via `file://` or any static host.

**Live URL:** https://ikbal-h-112.github.io/portfolio-redesign/
**GitHub repo:** https://github.com/ikbal-h-112/portfolio-redesign

**Working directory (Windows):** `C:\Projects\portfolio-redesign\` — single copy, no separate demo/test directory. `index.html` is production and source of truth; edits go straight here.

**Preview rule:** Preview changes locally (open `index.html` via `file://` or a static server) before committing anything visually risky. There is no separate `demo.html`/`demo_preview.html` on this machine — that Mac-only workflow has been retired.

---

## Design System (session 3 redesign — modern monochrome)

The site was fully redesigned in session 3 to match a modern near-black, rounded, monochrome reference (pill buttons, centered badge-headed sections, big two-block project cards). **Dark-only** — the dark/light toggle was removed.

- **Font**: `Alexandria` (rounded geometric sans) for everything; `JetBrains Mono` only for tiny badges/meta.
- **No accent color** — the palette is monochrome. Color comes only from tech-brand icon glyphs and the green availability dot.
- **Everything is rounded**: `rounded-full` pills for buttons/badges/tags/filters, `rounded-2xl`/`rounded-3xl` for cards.
- **Section header pattern** (centered): `.badge` eyebrow pill → `.section-heading` → `.section-sub`.

## Architecture

`index.html` is structured in three distinct layers:

1. **Tailwind config** (`<script>` block after CDN import) — custom color tokens (`base`, `panel`, `card`, `card2`, `line`) and font families. All color changes go here first.
2. **Component styles** (`<style type="text/tailwindcss">`) — reusable `@layer components` classes (`.btn-white`, `.btn-ghost`, `.badge`, `.tech-pill`, `.aos`, etc.). Use `@apply` here for any new repeating patterns instead of duplicating utility strings in HTML.
3. **Raw CSS** (`<style>`) — strictly for keyframes and effects Tailwind can't express (`dotPulse`, hamburger spans, `#nav.scrolled`).

JS is a single IIFE at the bottom with clearly labelled sections:
1. Nav `.scrolled` class (threshold: 50px scroll)
2. Mobile hamburger open/close
3. Active nav link (`IntersectionObserver`, rootMargin `-40% 0px -55% 0px`)
4. Scroll animations (`IntersectionObserver` on `.aos` → adds `.visible`)
5. Smooth scroll with 72px header offset
6. **Project category filter** — `applyFilter(category)`, staggered reveal, placeholder show/hide

---

## Key Conventions

- **Dark only**: no `dark:` variants, no theme toggle, no `localStorage` theme key. Colors are hardcoded to the dark palette.
- **Project visuals**: project card covers are inline SVG glyphs on a shared dark radial-gradient background (`radial-gradient(ellipse …, #232323 0%, #161616 70%)`) with one muted accent color per project at ~0.5 opacity. Exception: Tong Coffee House uses real screenshots. No external image URLs.
- **Tech icons**: hand-drawn simplified inline SVG glyphs in brand colors (Python blue/yellow, Power BI yellow, etc.) — NOT copied brand logo paths. Reused in hero `.icon-tile` tiles and `.tech-pill` chips.
- **Profile photo**: `photo.png` in repo root. Used in nav (rounded-full avatar), hero right card (`aspect-[4/5] object-cover object-top`), and footer. Do NOT use external image URLs.
- **Buttons**: white pill (`.btn-white`) is the primary CTA, always with a `→` arrow SVG; ghost pill (`.btn-ghost`) is secondary. No blue/colored buttons.
- **Scroll animations**: add class `aos` to any element that should fade-in-up on scroll.
- **No resume links**: Do not add `./resume.pdf` download links anywhere. This is intentional.
- **Email**: `ikbalhossain112@gmail.com` — real address, used in the contact section mailto link and display text.

---

## Color Tokens (Tailwind config)

| Token | Value | Purpose |
|-------|-------|---------|
| `base` | `#0f0f0f` | Page background |
| `panel` | `#141414` | Mobile nav drawer, thumbnail strips |
| `card` | `#191919` | Card / pill background |
| `card2` | `#1f1f1f` | Badge, tag, icon-circle background |
| `line` | `#282828` | All borders |

Text: `text-white` headings, `text-neutral-400` body, `text-neutral-500` muted/meta.

---

## Custom CSS Classes (`@layer components`)

- `.btn-pill`, `.btn-white`, `.btn-ghost`, `.btn-sm` — rounded-full button variants
- `.badge` — section eyebrow pill (mono, uppercase, tracked)
- `.section-heading`, `.section-sub`, `.nav-link` — typography
- `.tag-pill` — small rounded tag chip on project cards
- `.tech-pill` — tech-stack pill with icon (Tech Stack section)
- `.icon-tile` — square rounded icon tile (hero tool row)
- `.input-dark` — form inputs
- `.aos` / `.aos.visible` — scroll animation
- `.filter-tab`, `.filter-tab-active` (white bg), `.filter-tab-inactive`, `.filter-hidden` — project filter tabs

---

## Page Sections (in order)

1. Nav (avatar + name, links, white "Contact Me →" pill)
2. Hero (`#home`) — availability badge, "Data Analyst." headline, intro, CTAs, tool tiles; photo card right
3. Tech Stack (`#skills`) — centered header + icon pills
4. Projects (`#projects`) — centered header, filter pills, 2-col card grid
5. Certifications (`#certifications`) — 3 cards
6. Contact (`#contact`) — link cards + form
7. Footer

There is no About or Experience section. (Experience accordion à la the reference design can be added once there are real roles to list.)

---

## Projects — All 10 Real Cards

| # | Title | `data-categories` | GitHub slug |
|---|-------|-------------------|-------------|
| 0a | BevBot — AI Lead Generation Chatbot | `all automation` | `BevBot` |
| 0b | Expense Analyzer — AI Receipt Scanner | `all automation` | `Expense-Analyzer` |
| 1 | Breast Cancer Prediction | `all python-ml` | `Breast-Cancer-Prediction` |
| 2 | Lung Disease Analysis | `all data-analysis` | `Lung-Disease-Analysis` |
| 3 | Stock Price Prediction | `all python-ml` | `Stock-Price-Prediction` |
| 4 | Cyclistic Bike Share Case Study | `all sql r` | `Cyclistic-Bike-Share-Analysis` |
| 5 | 8 Week SQL Challenge | `all sql` | `8-Week-SQL-Challenge` |
| 6 | Twitter Sentiment Analysis | `all python-ml nlp` | `Twitter-Sentiment-Analysis` |
| 7 | Starbucks EDA & Visualisation | `all data-analysis` | `Starbucks-EDA-and-Visualization` |
| 8 | Tong Coffee House — 2023 Half Year Review | `all power-bi` | `Tong-Coffee-House-PowerBI` |

GitHub base: `https://github.com/ikbal-h-112/`

Card structure (session 3): each project is an `<article data-categories="…">` made of **two stacked rounded-2xl blocks** with a small gap — a cover block (SVG glyph or screenshot) and a content block (title + year, description paragraph, `.tag-pill` row, white "Source Code →" pill).

AOS stagger delays: 0, 50, 100, 150, 200, 250, 300, 350ms via `style="transition-delay:Xms"`

---

## Project Filter Tabs

Filter pill bar sits centered between the section header and the grid. Active tab = white bg / black text. 10 tabs total:

| Tab label | `data-filter` | Shows |
|-----------|---------------|-------|
| All | `all` | All 10 real projects |
| Automation | `automation` | Projects 0a, 0b (BevBot, Expense Analyzer) |
| Python / ML | `python-ml` | Projects 1, 3, 6 |
| Data Analysis | `data-analysis` | Projects 2, 7 |
| SQL | `sql` | Projects 4, 5 |
| NLP | `nlp` | Project 6 |
| R | `r` | Project 4 |
| Tableau | `tableau` | Placeholder card |
| Power BI | `power-bi` | Project 8 (Tong Coffee House) |
| Publications | `publications` | Placeholder card |

### Placeholder cards
Two "Coming Soon" cards (Tableau, Publications) with `style="display:none"` by default — same two-block article structure but `border-2 border-dashed border-line` and a gray glyph at low opacity.

### JS filter logic (IIFE section 6)
- `applyFilter(category)` toggles active/inactive classes on tabs and shows/hides cards
- Cards not matching get `filter-hidden` + `display:none` after 220ms
- Visible cards get staggered `transition-delay` (50ms per card)
- Double `requestAnimationFrame` triggers CSS transition after `display` change

---

## Git Workflow

- Local repo: `C:\Projects\portfolio-redesign\`
- Remote: `https://github.com/ikbal-h-112/portfolio-redesign`
- Branch: `main`
- Git identity is set locally in this repo (`user.name` / `user.email`) — no global config needed.
- Auth: GitHub CLI (`gh`) is authenticated on this machine and configured as the git credential helper via `gh auth setup-git`. Plain `git push` works with no extra flags.

### Commit discipline — REQUIRED

After every meaningful unit of work, Claude Code **must** stage, commit, and push. Do not batch unrelated changes into one commit. Do not finish a session without pushing.

**When to commit:**
- After completing any visible UI change (section added, layout fixed, style updated)
- After any content update (real data swapped in, copy changed)
- After any structural or architectural change to `index.html`
- After updating `CLAUDE.md`

**Commit message format:**
```
<short imperative summary (50 chars max)>

- Bullet describing what changed and why
- Another bullet if needed
```

Examples of good messages:
```
Add project category filter tabs to projects section
Update hero headline and availability badge copy
Fix skill bar animation not triggering on mobile
Replace project SVG visuals with higher-contrast versions
```

**Push immediately after every commit** — this is the safety net. GitHub is the source of truth for reverting if something breaks.
