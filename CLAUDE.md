# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-file static portfolio for **Md Ikbal Hossain** (Data Analyst). Everything lives in `index.html` — no build system, no framework, no dependencies to install. Open via `file://` or any static host.

## Architecture

`index.html` is structured in three distinct layers:

1. **Tailwind config** (`<script>` block after CDN import) — custom color tokens (`navy.*`, `accent.*`) and font families. All color changes go here first.
2. **Component styles** (`<style type="text/tailwindcss">`) — reusable `@layer components` classes (`.btn-primary`, `.card`, `.nav-link`, `.tag-pill`, `.aos`, etc.). Use `@apply` here for any new repeating patterns instead of duplicating utility strings in HTML.
3. **Raw CSS** (`<style>`) — strictly for keyframe animations and pseudo-element effects that Tailwind can't express (`blobPulse`, `dotPulse`, `barGrow`, `.hero-grid-bg::before`, `.skill-fill` width transition, `#nav.scrolled`).

JS is a single IIFE at the bottom (~100 lines) with clearly labelled sections:
- Theme toggle (dark/light, `localStorage` key `theme`, toggles `html.dark` class)
- Nav `.scrolled` class (threshold: 50px scroll)
- Mobile hamburger open/close
- Active nav link (`IntersectionObserver`, rootMargin `-40% 0px -55% 0px`)
- Scroll animations (`IntersectionObserver` on `.aos` → adds `.visible`)
- Skill bar animation (`IntersectionObserver` on `.card[data-animated="false"]`, threshold 0.3 → sets `.skill-fill` width from `data-width` attr)
- Smooth scroll with 64px header offset

## Key Conventions

- **Dark mode**: Tailwind `darkMode: 'class'`. Default is dark (`<html class="dark">`). Light mode = remove `dark` class. Write light styles first, `dark:` overrides second.
- **Skill bars**: Set target width via `data-width="85"` on `.skill-fill` divs. JS reads this on intersection and sets `style.width`. Do not set width in CSS.
- **Project visuals**: All project card images are inline SVGs with gradient backgrounds — no `<img>` tags in project cards. Keep them as inline SVG.
- **Scroll animations**: Add class `aos` to any element that should fade-in-up on scroll. The observer handles the rest.
- **No resume links**: Do not add `./resume.pdf` download links anywhere. This is intentional.
- **Email placeholder**: `ikbalhossain@example.com` is a placeholder — do not treat it as real.

## Color Tokens (Tailwind config)

| Token | Dark value | Purpose |
|---|---|---|
| `navy-950` | `#0a0f1e` | Page background |
| `navy-800` | `#111827` | Card background |
| `navy-700` | `#1e2d45` | Borders, skill tracks |
| `accent` | `#2563eb` | Primary CTA, links |
| `accent-cyan` | `#06b6d4` | Tags, skill fills, eyebrows |

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
Update hero headline and availability badge copy
Add real contact email and LinkedIn URL to contact section
Fix skill bar animation not triggering on mobile
Replace project SVG visuals with higher-contrast versions
```

**Push immediately after every commit** — this is the safety net. GitHub is the source of truth for reverting if something breaks.
