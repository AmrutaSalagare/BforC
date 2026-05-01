# BforC Main Site — Frontend Design Plan
### `bforc.in` · Marketing & Organisational Presence

---

## 0. Design Intent

**Brief:** Unique · Minimalistic · Modern · Creative · Elegant · Light-Cinematic · Scroll-based interactive · Pastel · Women-oriented

**Design Language:** *"Quiet Power"*

This site does not shout. It breathes. The aesthetic is **light-cinematic** — editorial magazine stills, natural light, generous whitespace, and type that moves with intention. Every scroll reveals something. The site is a narrative — not a brochure.

---

## 1. Constraint Analysis

| Factor | Decision |
|---|---|
| **Audience** | Social sector professionals, donors, NGO partners — Millennials + Gen X |
| **Mood** | Empowering, warm, trustworthy, globally grounded |
| **Device** | Mobile-first; many users on smartphone |
| **Tech** | Next.js App Router · Tailwind CSS · Framer Motion · shadcn/ui |

---

## 2. Design Identity

### 2.1 Personality Keywords
```
Warm · Luminous · Purposeful · Globally rooted · Quietly elegant
```

### 2.2 Mood Principles
- **Light-cinematic:** Think editorial magazine, not a standard NGO site
- **Pastel warmth:** Not saccharine pink — aged rose, warm ivory, hushed sage
- **Generous breathing room:** Whitespace IS the design
- **Type as hero:** Large editorial type at key moments — like a printed poster
- **Narrative scroll:** Each section is a chapter in the organisation's story

---

## 3. Colour System

### 3.1 Philosophy
60% soft pink-white foundation (`#faf5fa`) → 30% soft lavender/pink surfaces (`#f6e5f3`, `#f1c4e6`) → 10% bold magenta/primary accents (`#a84370`, `#d926a2`).

All colours are deeply integrated with a highly feminine and modern pink/magenta hue, bringing vibrant energy.

### 3.2 Palette (CSS Variables)

```css
:root {
  --background: #faf5fa;
  --foreground: #501854;
  
  --card: #faf5fa;
  --card-foreground: #501854;
  
  --popover: #ffffff;
  --popover-foreground: #501854;
  
  --primary: #a84370;
  --primary-foreground: #ffffff;
  
  --secondary: #f1c4e6;
  --secondary-foreground: #77347c;
  
  --muted: #f6e5f3;
  --muted-foreground: #834588;
  
  --accent: #f1c4e6;
  --accent-foreground: #77347c;
  
  --destructive: #ab4347;
  --destructive-foreground: #ffffff;

  --border: #efbdeb;
  --input: #e7c1dc;
  --ring: #db2777;
  
  --chart-1: #d926a2;
  --chart-2: #6c12b9;
  --chart-3: #274754;
  --chart-4: #e8c468;
  --chart-5: #f4a462;
}
```

### 3.3 Colour Rules
- Never pure white (`#fff`) — always `--color-bg`
- Never pure black — always `--color-text`
- Accent (terracotta) only for: primary CTAs, key stat callouts, active nav underlines
- Sage exclusively for partner and reach sections
- Blush for decorative dividers and quote block backgrounds

---

## 4. Typography

### 4.1 Font Stack

| Role | Font | Weights |
|---|---|---|
| **Display / Hero** | `Cormorant Garamond` | 300, 400, 500 italic |
| **Body / UI** | `DM Sans` | 300, 400, 500, 600 |
| **Accent Label** | `DM Mono` | 400 |

> **Why:** Cormorant brings editorial emotional depth. DM Sans grounds it in warm modern clarity. DM Mono for small uppercase eyebrow labels adds refinement without pretence.

### 4.2 Type Scale (Perfect Fifth ratio 1.5 — for emotional impact)

```
Base: 17px (slightly larger for mobile accessibility)

xs:   ~11px  → tags, meta, DM Mono labels
sm:   ~14px  → captions
base: 17px   → body paragraphs
lg:   ~26px  → card titles, sub-headings
xl:   ~38px  → section H2
2xl:  ~57px  → page H1
3xl:  ~85px  → hero display (Cormorant, weight 300)
```

All sizes use `clamp()` for fluid scaling.

### 4.3 Typography Rules
- Hero text: Cormorant, weight 300, tracking `-0.03em`, line-height `1.1`
- Section H2: Cormorant, weight 400, italic optional for resonance
- Body: DM Sans 400, line-height `1.65`, max-width `62ch`
- Eyebrow labels: DM Mono, xs, tracking `+0.12em`, `--color-text-faint`

---

## 5. Layout & Grid

### 5.1 Grid
- 12-column desktop, 4-column mobile
- Vertical padding: `clamp(80px, 12vw, 160px)`
- Horizontal gutter: `clamp(24px, 6vw, 80px)`

### 5.2 Layout Patterns

| Pattern | Where Used |
|---|---|
| Full-bleed typographic hero | Home, Our Action |
| Split narrative 55/45 | Our Story, Services |
| Single-column editorial | Mission/vision, founder quote |
| Masonry-lite | Testimonials |
| Stacked reveal cards | Services list |
| World map full-bleed | Our Reach |

### 5.3 Spacing (8pt system)
```
4 → micro | 8 → xs | 16 → sm | 24 → md | 32 → lg
48 → xl   | 64 → 2xl | 96 → 3xl | 128 → section padding
```

---

## 6. Scroll-Based Interactions (Framer Motion)

> **Principle:** The scroll IS the timeline. Content reveals like frames in a film.

### 6.1 Global Behaviour
- All sections: `whileInView` with `opacity 0→1` + `y 40px→0`, ease-out, 700ms
- Child stagger: 0.12s per element

### 6.2 Section-by-Section Interactions

**Hero:**
- Background: parallax at 0.4x scroll speed — creates cinematic depth
- Headline: clips up from below on load (not scroll — immediate, 900ms)
- Sub-text: fades in at 400ms delay
- CTA: springs from scale 0.9→1.0
- Scroll indicator: breathing pulse loop

**Our Story / About:**
- Opening: single large Cormorant italic quote fills viewport
- Scroll → quote fades, body content rises from below
- Founder photo: blurred → sharp fade on entry
- Values: each card slides in from right, staggered 0.1s

**Our Action:**
- Key stats count up on scroll entry (Intersection Observer + count-up hook)
- Background shifts subtly from ivory → warm blush through the section

**Our Services:**
- Sticky left sidebar: service number and title update as you scroll
- Each service panel slides into position on scroll
- Active service expands; others condense

**Our Partners:**
- Logos fade-in with upward drift on viewport entry (stagger 0.08s)
- Greyscale default → full colour on hover

**Our Reach:**
- SVG world map with pulsing ripple dots at BforC locations
- Dot: `scale + opacity` loop, 2000ms ease-in-out
- "18 countries" counts up on scroll entry

**Contact:**
- Form fields slide up sequentially (stagger 0.08s)
- Focus state: border transitions to terracotta-rose

### 6.3 Navigation Scroll
- Transparent on hero → frosted ivory (`backdrop-blur-md`) after scrolling past hero (300ms ease-in-out)
- Thin terracotta progress bar at top of viewport
- Scroll-spy highlights active section in nav

---

## 7. Component Specifications

### 7.1 Navigation
```
Height: 64px | Position: sticky
Logo: left, DM Sans medium
Links: max 5 — Home · Our Story · Services · Partners · Contact
CTA: "Partner with Us" — ghost button, terracotta border
Mobile: hamburger → full-screen overlay, large Cormorant nav links
```

### 7.2 Hero
```
Height: 100svh
Headline: Cormorant 3xl weight 300, near-black
Sub-text: DM Sans weight 300, muted, max 60ch
Background: warm ivory + 3% SVG noise texture overlay
Accent: 1px terracotta horizontal rule (60px wide) beneath headline
CTAs: "Explore our work" (primary) · "Our partners" (ghost)
No image — type IS the visual statement
```

### 7.3 Section Eyebrow Label
```
Format: "— SECTION NAME —"
Font: DM Mono · xs · tracking +0.12em · --color-text-faint
Margin-bottom: 24px above section heading
```

### 7.4 Service Card
```
No border — uses whitespace + shadow only
Padding: 32px
Number: Cormorant large, muted (decorative)
Title: DM Sans semibold
Body: DM Sans regular, muted
Hover: translateY(-4px), shadow deepens, terracotta underline under title
```

### 7.5 Partner Logo Card
```
Container: 120×60px, object-fit: contain
Background: --color-surface-2
Border-radius: 8px
Default: greyscale filter
Hover: scale(1.04), full colour, sage background tint
```

### 7.6 Quote / Testimonial Block
```
Container: full-width, blush background band
Quote: Cormorant italic xl, centered, max-width 700px
Attribution: DM Sans sm, muted, thin separator above
Multiple quotes: horizontal scroll on mobile, 3-col on desktop
```

### 7.7 CTA Buttons
```
PRIMARY:
  Background: --color-accent | Text: --color-on-accent
  Height: 48px | Padding: 0 32px | Border-radius: 4px
  Font: DM Sans 500
  Hover: darken 8% + translateY(-2px) | Active: scale(0.97)

GHOST:
  Background: transparent | Border: 1.5px solid --color-accent
  Text: --color-accent
  Hover: 8% terracotta fill tint
```

### 7.8 Footer
```
Background: hsl(20, 12%, 14%) — warm near-black
Text: hsl(38, 20%, 85%)
Layout: 4-column (About · Services · Partners · Contact)
Bottom bar: DM Mono xs · copyright · social · legal
Social: line icons, hover → terracotta
```

---

## 8. Page Visual Plans

### Home
```
[NAV]
[HERO 100svh] → Cormorant headline · sub · terracotta rule · CTAs · scroll indicator
[IMPACT STRIP — blush bg] → 18 Countries · 11 Partners · 5 Services (count-up)
[STORY TEASER — 55/45 split] → Pull quote left · body + link right
[SERVICES PREVIEW] → 3 cards horizontal · "See all →"
[PARTNERS STRIP] → Logo grid (grey→colour)
[TESTIMONIALS — blush band] → Cormorant italic quote · carousel
[CONTACT CTA] → "Ready to create impact together?" · two CTAs
[FOOTER]
```

### Our Story
```
[NAV]
[EDITORIAL HERO — blush bg] → Full-bleed Cormorant italic "from global to local"
[STORY BODY] → Single column, max 680px, approved draft copy
[PULL QUOTE] → Cormorant italic, terracotta left border
[VISION · MISSION · PURPOSE] → 3 beige cards, staggered fade-in
[VALUES] → Alternating left/right layout: number + title + description
[FOUNDER STATEMENT — blush] → Cormorant italic, PENDING content
[TEAM GRID] → 2-col cards: photo + name + role · hover: bio overlay
[GLOBAL ADVISORS] → Minimal list with thin rules
[FOOTER]
```

### Our Action
```
[NAV]
[HERO — large type] → "The right person, in the right place, at the right time."
[PROBLEM + NEED] → Editorial alternating blocks with terracotta rule labels
[VALUE PROPS] → 3-col: All-Women · Diverse Experts · 18 Countries (count-up)
[FOOTER]
```

### Our Services
```
[NAV]
[SECTION HERO] → Cormorant "What We Do" · overview sentence
[SCROLL-LINKED STACK] → Sticky left: service #/title; Right: detail + bullets
[FOOTER]
```

### Our Partners
```
[NAV]
[HEADER] → "We grow together" Cormorant italic
[PARTNER GRID — sage bg, asymmetric] → Logo + hover tooltip
[FOOTER]
```

### Our Reach
```
[NAV]
[WORLD MAP full-bleed SVG] → Pulsing terracotta dots · hover tooltips · "18 Countries" count-up
[IMPACT NUMBERS] → Counter strip below map
[FOOTER]
```

### Contact
```
[NAV]
[HERO — minimal] → Cormorant "Let's build something meaningful." · address + email
[FORM] → Name · Email · Organisation · Message · Primary CTA
[FOOTER]
```

---

## 9. Motion Summary

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Hero headline | Clip-up reveal | 900ms | `cubic-bezier(0.16,1,0.3,1)` |
| Section content | Fade + slide-up | 700ms | ease-out |
| Stagger offset | 0.12s per child | — | — |
| Stats count-up | Count animation | 1500ms | ease-out |
| Map dots | Ripple loop | 2000ms | ease-in-out |
| Nav blur | Background blur | 300ms | ease-in-out |
| Card hover lift | translateY(-4px) | 200ms | ease-out |
| Button hover | translateY(-2px) | 150ms | ease-out |

`prefers-reduced-motion`: decorative scroll animations disabled; opacity fades retained.

---

## 10. Tailwind Token Setup

```js
// Configured via standard shadcn CSS variables in globals.css
// Uses custom @theme inline mapping for Tailwind v4 compatibility.
```

---

## 11. Shared Design Tokens (Coordinate with Career Portal)

Define in Turborepo `packages/design-tokens`:

| Token | Value |
|---|---|
| Font: Display | Cormorant Garamond |
| Font: Body | DM Sans |
| Color: Accent | `hsl(12, 52%, 58%)` |
| Color: BG | `hsl(38, 28%, 97%)` |
| Border radius (card) | `8px` |
| Border radius (button) | `4px` |
| Spacing base | `8px` |

---

## 12. Accessibility Checklist

- [ ] All colours: WCAG 2.1 AA 4.5:1 minimum
- [ ] Keyboard navigation throughout
- [ ] `aria-label` on all icon-only buttons
- [ ] Explicit `<label for>` — no placeholder-only labels
- [ ] Semantic HTML: `<main>`, `<nav>`, `<section>`, `<article>`
- [ ] `next/image` priority on above-fold assets, lazy below
- [ ] Google Fonts: `display: swap`, `preconnect`
- [ ] `prefers-reduced-motion` handled in all Framer Motion variants

---

*Design plan for `bforc.in`. For career portal design see `career_design.md`.*
