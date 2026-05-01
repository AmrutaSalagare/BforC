# BforC Career Portal — Frontend Design Plan
### `career.bforc.in` · Job Board & Talent Marketplace

---

## 0. Design Intent

**Brief:** Unique · Minimalistic · Modern · Creative · Elegant · Light-Cinematic · Scroll-based interactive · Pastel · Women-oriented

**Design Language:** *"Calm Ambition"*

If the main site is a magazine, the career portal is a **curated workspace** — purposeful, focused, and deeply welcoming. It should feel like the nicest desk you've ever sat at: clean, warm, functional, and quietly inspiring.

The portal solves a real user problem (finding meaningful work). Every design decision should reduce friction while making users feel respected and capable.

---

## 1. Constraint Analysis

| Factor | Decision |
|---|---|
| **Audience** | Indian women job seekers (primary); NGO employers (secondary) |
| **Device** | Mobile-first critical — many users on 4G smartphones |
| **Mood** | Welcoming, professional, warm — not corporate or clinical |
| **UX priority** | Low friction, fast feedback, trust at every touchpoint |
| **Tech** | Next.js App Router · Tailwind CSS · Framer Motion · shadcn/ui · Supabase |

---

## 2. Design Identity

### 2.1 Personality Keywords
```
Focused · Warm · Trustworthy · Inclusive · Quietly confident
```

### 2.2 Mood Principles
- **Calm Ambition:** The space a woman feels when she knows what she wants and is on her way
- **Pastel precision:** Soft, airy interface — nothing heavy or intimidating
- **Progressive revelation:** Only show what's needed. Complexity hidden until needed (Hick's Law)
- **Micro-delight:** Small moments that make the job search feel less stressful
- **Mobile-native feel:** Touch-friendly, thumb-reachable CTAs, swipe interactions where natural

### 2.3 What This Is NOT
- NOT a typical Naukri clone — no blue corporate UI
- NOT dark mode heavy
- NOT purple-tinted (purple banned)
- NOT a bento-grid layout for its own sake
- NOT overwhelming with features — progressive disclosure only

---

## 3. Colour System

### 3.1 Philosophy
The career portal utilizes a highly distinct, feminine-oriented pink, magenta, and purple palette. 
60% soft pink-white foundation (`#faf5fa`) → 30% soft lavender/pink surfaces (`#f6e5f3`, `#f1c4e6`) → 10% bold magenta/primary accents (`#a84370`, `#d926a2`).

The portal utilizes rich 3D animated backgrounds with soft multiply blending and frosted glass overlays (`backdrop-blur`) to create depth without sacrificing text readability.

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

### 3.3 Colour Rules (Portal-specific)
- Job cards: `--card` background, `--primary` for "Women-Friendly" badge
- Filter pills: active state uses `--accent` background + `--foreground` text
- Category Explore: Floating Radial Orbital Timeline over a 3D animated background
- High Contrast Glassmorphism: Floating text elements use `bg-white/60 backdrop-blur-md` for legibility.

---

## 4. Typography

### 4.1 Font Stack (Shared with main site)

| Role | Font | Weights |
|---|---|---|
| **Display / Section headers** | `Cormorant Garamond` | 300, 400 |
| **Body / UI / Labels / Forms** | `DM Sans` | 300, 400, 500, 600 |
| **Accent Label / Tags** | `DM Mono` | 400 |

> In the portal, Cormorant is used more sparingly than the main site — only for section heroes, welcome headings, and emotional moments (job application success, pricing page).

### 4.2 Type Scale (Major Third ratio 1.25 — more compact than main site for UI density)

```
Base: 16px (UI density appropriate for dashboard)

xs:   ~10px  → tags, chip labels, meta
sm:   ~13px  → captions, helper text, timestamps
base: 16px   → body, form labels, card body
lg:   ~20px  → card titles, sub-headings
xl:   ~25px  → section H2
2xl:  ~31px  → page H1 (DM Sans)
3xl:  ~57px  → hero display (Cormorant only)
```

### 4.3 Typography Rules (Portal)
- Forms: DM Sans 400, labels above inputs (never placeholder-only), helper text sm
- Job card title: DM Sans 600, lg
- Company name: DM Sans 400, muted
- Dashboard headings: DM Sans 600, xl — NOT Cormorant (functional, not editorial)
- Pricing page tier names: Cormorant 400, 2xl — emotional moment

---

## 5. Layout & Grid

### 5.1 Grid
- Desktop: 12-column grid, max-width `1280px`
- Tablet: 8-column
- Mobile: 4-column (single column for most content)
- Gutter: `clamp(16px, 4vw, 48px)`

### 5.2 Layout Patterns by Section

| Section | Layout Pattern |
|---|---|
| Homepage hero | Full-bleed, centered type + search bar |
| Job search | 3-col: filter sidebar 280px · job list 1fr · optional detail panel |
| Job card grid | Responsive grid: 1-col mobile · 2-col tablet · 3-col desktop |
| Company directory | 2-col grid (logo cards) |
| Candidate dashboard | Sidebar nav 240px + main content area |
| Employer dashboard | Sidebar nav 240px + main content area |
| Pricing page | 3 card columns (horizontal on desktop, stacked on mobile) |
| Auth pages | Single card, centered, max-width 420px |

### 5.3 Dashboard Sidebar
```
Width: 240px (collapsed: 64px with icons only)
Background: --color-lavender (soft lavender, portal-specific)
Nav items: DM Sans 500, 16px, with icon left
Active item: terracotta left border (3px) + terracotta text
Mobile: bottom tab bar (4-5 items), sidebar hidden
```

---

## 6. Scroll-Based Interactions (Framer Motion)

### 6.1 Homepage Scroll Narrative

**Hero:**
- Search bar: slides up from below on load (600ms, spring easing)
- Headline: clips up from below, 800ms `cubic-bezier(0.16,1,0.3,1)`
- Featured job cards: staggered fade-up (0.1s each) as they scroll into view
- Category chips: horizontal slide-in from left, staggered

**Featured Jobs:**
- Job cards: fade-up with stagger (0.08s) on viewport entry
- On hover: card lifts 6px, shadow deepens, "Quick Apply" button slides up from card bottom
- "Save" heart: pulses on click (scale 1.3→1.0 with spring)

**Company Logos:**
- Horizontal auto-scroll strip (carousel) — pauses on hover
- Greyscale → full colour on hover (same as main site)

**Testimonials / Success Stories:**
- Quote fades in, attribution line draws left→right (underline reveal animation)
- Avatar fades in with slight scale 0.95→1.0

**Pricing:**
- Cards fan out from center on scroll entry (scale 0.9→1.0, stagger 0.1s)
- Recommended tier pulses gently on entry (scale 1.0→1.02→1.0, once)

### 6.2 Dashboard & Portal Interactions

**No heavy scroll animations in dashboard** — respects task-focused context (Occam's Razor).

```
Navigation:
  - Tab switches: fade crossfade (150ms)
  - Active indicator: smooth slide along bottom border

Job Application Flow:
  - Each step: slides in from right (200ms ease-out)
  - Progress bar: fills smoothly between steps

Profile Strength Meter:
  - Mint gradient bar fills left→right on load (800ms ease-out)
  - Percentage counts up (count-up hook, 1000ms)

Resume Upload:
  - Drop zone: pulses gently when file is dragged over (scale 1.02, border terracotta)
  - Upload progress: circular progress ring fills (stroke-dashoffset animation)
  - Success: green checkmark springs in (scale 0→1.2→1.0)

Job Save:
  - Heart icon fills on click with spring animation
  - Subtle confetti burst (3-4 particles, 300ms, then gone)

Filters:
  - Pill toggles: smooth background fill on select (150ms)
  - Filter sidebar: slide in from left on mobile (300ms ease-out)

Form Inputs:
  - On focus: label lifts + shrinks (floating label pattern, 200ms)
  - Border: transitions from surface-2 to terracotta (200ms)
  - Error: brief horizontal shake (3 cycles, 50ms each)
  - Success: border transitions to mint (200ms)
```

### 6.3 Page Transitions
- Between portal pages: fade (150ms) — fast, functional
- Auth modals: scale from center (250ms spring)

---

## 7. Component Specifications

### 7.1 Search Bar (Homepage Hero)

```
Width: full on mobile, max 680px on desktop
Height: 56px on desktop, 48px on mobile
Layout: [🔍 icon] [text input "Role, skills, organisation..."] [📍 location] [Search button]
Background: white (pure — contrast against ivory bg)
Border: 1px hsl(20, 8%, 80%)
Border-radius: 8px
Focus: border → 2px terracotta
Search button: terracotta CTA inside the bar, right-aligned
Shadow: subtle warm shadow (not blue!)
Mobile: stacks to 2 rows — search input · location | Search button
```

### 7.2 Job Card

```
Container:
  Background: --color-surface-2
  Border-radius: 12px
  Padding: 24px
  Border: 1px solid transparent
  Hover: border → 1px terracotta (10% opacity) + translateY(-6px) + shadow deepen

Content layout (top → bottom):
  Row 1: [Company logo 40px] [Company name (muted)] [Posted date (faint, right-aligned)]
  Row 2: Job title (DM Sans 600, lg)
  Row 3: [📍 Location] [💰 Salary range] — DM Sans sm, muted
  Row 4: Tags — "Women-Friendly ✦" (terracotta) · "Remote" · "Social Impact"
  Row 5 (on hover, slides up): [Quick Apply] [Save ♡]

Women-Friendly badge:
  Background: hsl(12, 52%, 58%) at 12% opacity
  Text: --color-accent
  Border: 1px solid --color-accent at 30% opacity
  Icon: small star/flower mark
```

### 7.3 Filter Sidebar

```
Position: sticky, top 80px
Width: 280px
Background: --color-surface
Border-right: 1px solid --color-surface-2

Sections: Role Type · Salary · Experience · Remote · Women-Friendly Companies

Filter pill (inactive):
  Background: --color-surface-2
  Border: 1px solid hsl(20, 8%, 80%)
  Text: --color-text-muted
  Border-radius: 20px (pill)
  Height: 32px

Filter pill (active):
  Background: --color-mint
  Text: hsl(160, 45%, 30%)
  Border: none
  Transition: 150ms ease-out
```

### 7.4 Company Profile Card

```
Logo: 64px × 64px, object-fit contain, border-radius 8px
Company name: DM Sans 600
Women-Friendly Rating: star row, terracotta fill
Policies: small mint badge tags (Maternity Leave · Flexible Hours · Remote)
Open roles: DM Sans sm, muted, right side
Hover: card lifts 4px, border lights to terracotta 20%
```

### 7.5 Profile Strength Meter

```
Container: full-width, height 8px, border-radius 4px
Track: --color-surface-2
Fill: linear-gradient(90deg, hsl(160,40%,70%), hsl(160,45%,40%))
Percentage text: DM Sans 600, lg, mint color, above bar
Label: "Profile Strength" DM Mono xs tracking wide
```

### 7.6 Subscription Pricing Cards

```
Layout: 3 cards horizontal (stacked on mobile)

FREE:
  Background: --color-surface
  Border: 1px solid --color-surface-2
  Header bg: --color-surface-2

STARTER (₹499/yr):
  Background: hsl(355, 28%, 96%)  — very light blush
  Border: 1px solid --color-blush
  Label: "STARTER" in DM Mono xs

PREMIUM (₹899/yr) — Recommended:
  Background: hsl(12, 52%, 58%) at 6% opacity
  Border: 2px solid --color-accent
  Shadow: warm terracotta glow (box-shadow)
  Label: "POPULAR ✦" in DM Mono xs, terracotta
  Scale: 1.02 relative to others (Anchoring + Von Restorff)

All cards:
  Border-radius: 16px
  Padding: 32px
  Price: Cormorant 3xl weight 300 (emotional moment)
  CTA: primary button at bottom
```

### 7.7 Auth Pages (Sign Up / Log In)

```
Background: --color-bg (warm ivory)
Card: centered, max-width 420px, background white, border-radius 16px
Shadow: warm, multi-layer
Padding: 40px

Heading: DM Sans 600, 2xl
Sub: DM Sans 400, muted, sm

Inputs:
  Floating label pattern
  Border: 1px hsl(20, 8%, 80%) → terracotta on focus
  Border-radius: 8px
  Height: 52px

CTA: Full-width primary button, 52px height
Divider: "or continue with" — thin rule, DM Mono xs
Social: Google sign-in (outline button)

Role selector (Sign Up only):
  Two large cards: "I'm looking for work" · "I'm hiring"
  Selected: terracotta border + faint terracotta fill
  Border-radius: 12px
```

### 7.8 Resume Upload Zone

```
Container: dashed border, border-radius 12px, padding 40px, center-aligned
Border color: --color-surface-2 → terracotta when dragging
Background: --color-surface → very faint terracotta 4% when dragging
Icon: upload arrow, muted, 40px
Text: "Drop your resume here or browse" DM Sans base
Sub: "PDF or DOC · max 5MB" DM Sans sm, faint
CTA: "Browse file" — ghost button
Progress: circular ring (mint) fills on upload
Success state: checkmark springs in, "Resume uploaded! We're extracting your details..." (mint)
```

### 7.9 Navigation (Portal)

```
Height: 64px | Position: sticky
Logo: left — links back to bforc.in home
Centre: search input (compact, appears after hero scroll)
Right: [Notifications bell] [Profile avatar dropdown]

Mobile:
Top: Logo + hamburger (opens sidebar drawer)
Bottom: Tab bar — Home · Jobs · Saved · Applications · Profile
```

---

## 8. Page Visual Plans

### Homepage (`career.bforc.in`)
```
[NAV — transparent → frosted ivory on scroll]

[HERO — 80svh, centered]
  └─ Eyebrow: "— WHERE COMPASSION MEETS CAREER —" (DM Mono)
  └─ Headline: Cormorant 3xl "Find Work That Moves the World"
  └─ Sub: DM Sans "Curated roles in social impact, NGOs & purpose-driven organisations"
  └─ SEARCH BAR — slides up on load (spring animation)
  └─ Popular categories: chips below bar (fade-in stagger)

[FEATURED JOBS — scroll reveal stagger]
  └─ Eyebrow + "Browse all jobs →"
  └─ 3-column job card grid (2-col tablet, 1-col mobile)

[FEATURED COMPANIES]
  └─ Auto-scroll horizontal strip, logo cards
  └─ "Women-Friendly ✦" badge on eligible companies

[CATEGORIES — Radial Orbital Timeline]
  └─ Interactive 3D orbital layout: Remote · Return to Work · Flexible · Leadership · NGO
  └─ Nodes orbit central hub at 60fps via GPU acceleration (framer-motion useAnimationFrame)
  └─ Click to focus: Pauses orbit, highlights related nodes via pulse animation

[SUCCESS STORIES — blush band]
  └─ Cormorant italic quote + avatar + name + job placed

[WHY BFORC — 3 value columns]
  └─ Women-Friendly Ratings · Social Impact Focus · AI Resume Parsing

[PRICING TEASER]
  └─ "Start free. Grow with purpose."
  └─ 3 tier cards (smaller preview version, full pricing on /pricing page)

[FOOTER]
```

### Job Search Page
```
[NAV]
[PAGE HEADER]
  └─ DM Sans xl: "Find Your Impact Role"
  └─ Result count: "342 roles found" (DM Sans sm, muted)
  
[LAYOUT — 3 columns on desktop]
  ├─ LEFT: Filter sidebar (sticky)
  ├─ CENTRE: Job card list (infinite scroll or paginated)
  └─ RIGHT: Job detail preview panel (desktop only, slides in on card click)

[JOB CARDS — fade-up stagger on initial load]
[PAGINATION / LOAD MORE — mint "Load more" ghost button]
```

### Job Detail Page
```
[NAV]
[HERO — warm beige bg, max-width 800px centered]
  └─ Company logo + name
  └─ Job title (DM Sans 600, 2xl)
  └─ Tags + salary + location
  └─ [Apply Now] [Save Job] — side by side

[BODY]
  └─ About the role
  └─ Responsibilities
  └─ Requirements
  └─ About the company → link to company profile

[STICKY APPLY BAR — mobile only]
  └─ Fixed bottom bar: Job title + [Apply Now] button
```

### Company Directory
```
[NAV]
[HEADER] → "Discover Women-Friendly Workplaces" (Cormorant italic)
[SEARCH + FILTER] → search input + sector filter chips
[COMPANY CARDS — 2-col grid] → Logo · rating · policy badges · open roles
```

### Candidate Dashboard
```
[LEFT SIDEBAR — lavender]
  → Profile · Saved Jobs · Applications · Alerts · Subscription

[MAIN AREA]
  ├─ Welcome header: "Good morning, [Name] 🌿" (DM Sans 600)
  ├─ Profile Strength Meter (mint progress bar)
  ├─ Quick stats: Saved (N) · Applied (N) · Alerts (N)
  ├─ Recommended jobs (3 cards)
  └─ Recent applications (list with status tags)
```

### Employer Dashboard
```
[LEFT SIDEBAR]
  → My Jobs · Applications · Talent Search · Company Profile · Billing

[MAIN AREA]
  ├─ Active listings count + applicant total
  ├─ Recent applications (candidate cards with status)
  └─ Post new job CTA (terracotta full-width button)
```

### Pricing Page
```
[NAV]
[HERO — center]
  └─ Cormorant: "Start free. Grow with purpose."
  └─ Toggle: Monthly / Annual (save 20% indicator)

[3 PRICING CARDS — fan in from center on scroll]
  └─ Free · Starter · Premium (detailed specs from career.md)

[TRUST STRIP]
  └─ "No hidden fees · Cancel anytime · Your data, your control"

[FAQ ACCORDION]
  └─ 5-6 common questions

[FOOTER]
```

### Auth Pages
```
Sign Up:
  └─ Role selector (seeker / employer) → form
  └─ Google Sign In option
  └─ Link to Log In

Log In:
  └─ Email + Password
  └─ Forgot password link
  └─ Link to Sign Up
```

---

## 9. UX Psychology Applied

| Law | Application |
|---|---|
| **Hick's Law** | Homepage shows max 5 job categories; advanced filters hidden behind "More filters" |
| **Fitts' Law** | "Apply" button full-width on mobile; sticky bottom apply bar |
| **Zeigarnik Effect** | Profile strength meter keeps users returning to complete their profile |
| **Goal Gradient** | Application progress: "3 of 4 steps complete — you're almost there!" |
| **Peak-End Rule** | Job application success screen: warm illustration + "We're rooting for you" |
| **Tesler's Law** | AI resume parsing auto-fills the profile — complexity shifted to the system |
| **Von Restorff** | Premium plan visually distinct from Free and Starter |
| **Anchoring** | Premium plan shown alongside Free to anchor its value |
| **Social Proof** | "2,400 women found their role here" on homepage hero |
| **Trust** | Employer verified badge · "Your data is yours" on resume upload |

---

## 10. Motion Summary (Portal)

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Hero headline | Clip-up reveal | 800ms | `cubic-bezier(0.16,1,0.3,1)` |
| Search bar entry | Slide up + spring | 600ms | spring (stiffness 150) |
| Job cards (load) | Fade + slide-up stagger | 500ms | ease-out |
| Card hover lift | translateY(-6px) | 200ms | ease-out |
| "Save" heart click | Scale spring | 300ms | spring bounce |
| Filter pill toggle | Background fill | 150ms | ease-out |
| Upload progress ring | Stroke dashoffset | live | ease-out |
| Profile strength bar | Width expand | 800ms | ease-out |
| Auth modal | Scale from center | 250ms | spring |
| Dashboard tab switch | Fade crossfade | 150ms | ease-in-out |
| Form error shake | Horizontal shake | 300ms | linear |

`prefers-reduced-motion`: Disable slide/scale animations. Retain opacity fades and colour transitions.

---

## 11. Tailwind Token Setup

```js
// Configured via standard shadcn CSS variables in globals.css
// Uses custom @theme inline mapping for Tailwind v4 compatibility.
```

---

## 12. Mobile-First Rules (Critical for this portal)

- **Search bar:** 2-row layout on mobile (search · location | button)
- **Job cards:** single column, full-width
- **Filters:** hidden by default → "Filters" button opens a bottom sheet drawer (not sidebar)
- **Dashboard nav:** bottom tab bar (4 items max) replaces left sidebar
- **Apply button:** sticky bottom bar on job detail pages
- **Resume upload:** large tap target, supports camera capture on mobile
- **Pricing cards:** vertically stacked, horizontal scroll optional
- **Touch targets:** all interactive elements minimum 48×48px
- All form inputs: minimum height 52px, font-size 16px (prevents iOS zoom)

---

## 13. Accessibility Checklist

- [ ] WCAG 2.1 AA — all text/background pairs
- [ ] All form inputs: explicit `<label>`, no placeholder-only
- [ ] Error messages: linked to inputs via `aria-describedby`
- [ ] Loading states: `aria-live="polite"` for job list updates
- [ ] Modal dialogs: focus trap + `aria-modal="true"`
- [ ] Job cards: `role="article"`, card title as `<h3>`
- [ ] Filter changes: announce updated result count to screen readers
- [ ] Keyboard navigation: full tab order, visible focus ring (terracotta outline)
- [ ] Skip to main content link (first focusable element)
- [ ] `prefers-reduced-motion` in all Framer Motion variants

---

## 14. Shared Design Tokens (Coordinate with Main Site Teammate)

Defined in Turborepo `packages/design-tokens`:

| Token | Value |
|---|---|
| Font: Display | Cormorant Garamond |
| Font: Body | DM Sans |
| Color: Accent | `hsl(12, 52%, 58%)` |
| Color: BG | `hsl(38, 28%, 97%)` |
| Border radius (card) | `8px–12px` |
| Border radius (button) | `4px` |
| Spacing base | `8px` |

Portal-exclusive additions: `mint`, `lavender`, semantic colours.

---

*Design plan for `career.bforc.in`. For main marketing site design see `main_design.md`.*
