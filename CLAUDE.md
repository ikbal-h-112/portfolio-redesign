# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-file static portfolio for **Md Ikbal Hossain** (Data Analyst). Everything lives in `index.html` — no build system, no framework, no dependencies to install. Open via `file://` or any static host.

**Two directories in play:**
| Directory | Main file | Purpose |
|-----------|-----------|---------|
| `/Users/ikbalhossain/Documents/claude_code/portfolio/` | `index.html` | Production — source of truth, push to GitHub |
| `/Users/ikbalhossain/Documents/claude_code/test/` | `demo.html` | Local working copy for experimentation |

**Preview rule:** Build changes in `demo_preview.html` first. Never touch `demo.html` directly until user approves the preview. Once approved, apply identical changes to `demo.html` AND `index.html`, then commit and push.

---

## Architecture

`index.html` is structured in three distinct layers:

1. **Tailwind config** (`<script>` block after CDN import) — custom color tokens (`navy.*`, `accent.*`) and font families. All color changes go here first.
2. **Component styles** (`<style type="text/tailwindcss">`) — reusable `@layer components` classes (`.btn-primary`, `.card`, `.nav-link`, `.tag-pill`, `.aos`, etc.). Use `@apply` here for any new repeating patterns instead of duplicating utility strings in HTML.
3. **Raw CSS** (`<style>`) — strictly for keyframe animations and pseudo-element effects that Tailwind can't express (`blobPulse`, `dotPulse`, `barGrow`, `.hero-grid-bg::before`, `.skill-fill` width transition, `#nav.scrolled`).

JS is a single IIFE at the bottom with clearly labelled sections:
1. Theme toggle (dark/light, `localStorage` key `theme`, toggles `html.dark` class)
2. Nav `.scrolled` class (threshold: 50px scroll)
3. Mobile hamburger open/close
4. Active nav link (`IntersectionObserver`, rootMargin `-40% 0px -55% 0px`)
5. Scroll animations (`IntersectionObserver` on `.aos` → adds `.visible`)
6. Skill bar animation (`IntersectionObserver` on `.card[data-animated="false"]`, threshold 0.3 → sets `.skill-fill` width from `data-width` attr)
7. Smooth scroll with 64px header offset
8. **Project category filter** — `applyFilter(category)`, staggered reveal, placeholder show/hide *(added session 2)*

---

## Key Conventions

- **Dark mode**: Tailwind `darkMode: 'class'`. Default is dark (`<html class="dark">`). Light mode = remove `dark` class. Write light styles first, `dark:` overrides second.
- **Skill bars**: Set target width via `data-width="85"` on `.skill-fill` divs. JS reads this on intersection and sets `style.width`. Do not set width in CSS.
- **Project visuals**: All project card images are inline SVGs with gradient backgrounds — no `<img>` tags in project cards. Keep them as inline SVG.
- **Scroll animations**: Add class `aos` to any element that should fade-in-up on scroll. The observer handles the rest.
- **No resume links**: Do not add `./resume.pdf` download links anywhere. This is intentional.
- **Email**: `ikbalhossain112@gmail.com` — real address, used in the contact section mailto link and display text.

---

## Color Tokens (Tailwind config)

| Token | Value | Purpose |
|-------|-------|---------|
| `navy-950` | `#0a0f1e` | Page background |
| `navy-900` | `#0d1424` | Section alt background |
| `navy-800` | `#111827` | Card background |
| `navy-700` | `#1e2d45` | Borders, skill tracks |
| `navy-600` | `#243756` | Dashed borders (placeholder cards) |
| `accent` | `#2563eb` | Primary CTA, links, active filter tab |
| `accent-cyan` | `#06b6d4` | Tags, skill fills, eyebrows |

---

## Custom CSS Classes (`@layer components`)

- `.btn`, `.btn-primary`, `.btn-outline`, `.btn-sm` — button variants
- `.card` — white/dark navy card with border and rounded corners
- `.nav-link`, `.section-eyebrow`, `.section-heading`, `.section-sub` — typography
- `.tag-pill` — cyan monospace tag badge
- `.skill-track` — progress bar track
- `.aos` / `.aos.visible` — scroll animation (opacity-0 translate-y-7 → opacity-100 translate-y-0)
- `.filter-tab`, `.filter-tab-active`, `.filter-tab-inactive`, `.filter-hidden` — project category filter tabs *(added session 2)*

---

## Page Sections (in order)

1. Nav
2. Hero
3. Skills / Tech Stack
4. Projects (`#projects`)
5. Certifications (`#certifications`)
6. Experience / Timeline
7. Contact

---

## Projects — All 7 Real Cards

| # | Title | `data-categories` | GitHub slug |
|---|-------|-------------------|-------------|
| 1 | Breast Cancer Prediction | `all python-ml` | `Breast-Cancer-Prediction` |
| 2 | Lung Disease Analysis | `all data-analysis` | `Lung-Disease-Analysis` |
| 3 | Stock Price Prediction | `all python-ml` | `Stock-Price-Prediction` |
| 4 | Cyclistic Bike Share Case Study | `all sql r` | `Cyclistic-Bike-Share-Analysis` |
| 5 | 8 Week SQL Challenge | `all sql` | `8-Week-SQL-Challenge` |
| 6 | Twitter Sentiment Analysis | `all python-ml nlp` | `Twitter-Sentiment-Analysis` |
| 7 | Starbucks EDA & Visualisation | `all data-analysis` | `Starbucks-EDA-and-Visualization` |

GitHub base: `https://github.com/ikbal-h-112/`

Card class pattern:
```
class="card overflow-hidden flex flex-col group hover:-translate-y-1.5 hover:shadow-xl hover:shadow-accent/20 hover:border-accent/40 transition-all duration-200 aos"
```
AOS stagger delays: 0, 50, 100, 150, 200, 250, 300ms via `style="transition-delay:Xms"`

---

## Project Filter Tabs (added session 2 — live on main)

Filter tab bar sits between the section header and the grid. 9 tabs total:

| Tab label | `data-filter` | Shows |
|-----------|---------------|-------|
| All | `all` | All 7 real projects |
| Python / ML | `python-ml` | Projects 1, 3, 6 |
| Data Analysis | `data-analysis` | Projects 2, 7 |
| SQL | `sql` | Projects 4, 5 |
| NLP | `nlp` | Project 6 |
| R | `r` | Project 4 |
| Tableau | `tableau` | Placeholder card |
| Power BI | `power-bi` | Placeholder card |
| Publications | `publications` | Placeholder card |

### Placeholder cards
Three "Coming Soon" cards with `style="display:none"` by default, `border-2 border-dashed border-navy-600`:
- Tableau — blue SVG on dark navy gradient (`#0c1a2e → #1a3a5c`)
- Power BI — yellow SVG on dark amber gradient (`#1c1000 → #3d2a00`)
- Publications — green SVG on dark green gradient (`#0d1f0d → #1a3d1a`)

### JS filter logic (IIFE section 8)
- `applyFilter(category)` toggles active/inactive classes on tabs and shows/hides cards
- Cards not matching get `filter-hidden` + `display:none` after 220ms
- Visible cards get staggered `transition-delay` (50ms per card)
- Double `requestAnimationFrame` triggers CSS transition after `display` change

---

## Git Workflow

- Local repo: `/Users/ikbalhossain/Documents/claude_code/portfolio/`
- Remote: `https://github.com/ikbal-h-112/portfolio-redesign`
- Branch: `main`
- Git identity is set locally (no global config needed).
- Push command: `GIT_ASKPASS="" git -C /Users/ikbalhossain/Documents/claude_code/portfolio push` (Cursor's askpass must be cleared; credential helper script at `.git/gh-credential-helper.sh` handles auth via `gh` CLI token)

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
