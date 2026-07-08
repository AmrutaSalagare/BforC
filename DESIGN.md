---
name: Brains for Compassion
description: A women-led social impact organisation bridging global insight with local change.
colors:
  primary: "#a84370"
  secondary: "#f1c4e6"
  neutral-bg: "#faf5fa"
  neutral-text: "#501854"
  muted-bg: "#f6e5f3"
  muted-text: "#834588"
typography:
  display:
    fontFamily: "var(--font-cormorant), Georgia, serif"
  body:
    fontFamily: "var(--font-dm-sans), system-ui, sans-serif"
  label:
    fontFamily: "var(--font-dm-mono), monospace"
    letterSpacing: "0.12em"
rounded:
  sm: "calc(0.5rem * 0.6)"
  md: "calc(0.5rem * 0.8)"
  lg: "0.5rem"
spacing:
  sm: "8px"
  md: "16px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "4px"
    padding: "12px 28px"
  button-ghost:
    textColor: "{colors.primary}"
    rounded: "4px"
    padding: "12px 28px"
---

# Design System: Brains for Compassion

## 1. Overview

**Creative North Star: "The Grounded Catalyst"**

The design bridges global professionalism with local warmth. It relies on a restrained color palette that feels tactile and inviting, using a warm blush background instead of stark white. The typography pairs a sophisticated, editorial serif (Cormorant) for displays with an approachable, readable sans-serif (DM Sans) for body copy. The aesthetic is clean and purposeful, rejecting the sterile feel of corporate consultancy layouts and the noisy, high-tech aesthetics of generic SaaS.

**Key Characteristics:**
- Warm, tinted backgrounds (no pure white or #fff)
- High-contrast, elegant typography
- Quiet confidence and restraint in layout
- Purposeful, calm motion

## 2. Colors

The palette is restrained and rooted in warm, muted hues to convey compassion and grounded expertise.

### Primary
- **Editorial Magenta** (#a84370): Used for primary actions, critical emphasis, and subtle accents. Its rarity ensures it commands attention without shouting.

### Secondary
- **Soft Lavender** (#f1c4e6): Used for secondary backgrounds, soft highlights, and bringing warmth to neutral spaces.

### Neutral
- **Warm Blush Background** (#faf5fa): The core canvas. A tinted off-white that removes the harshness of screens and feels tactile.
- **Deep Plum Ink** (#501854): The primary text color. Softer than pure black but dark enough for crisp legibility.
- **Muted Orchid** (#834588): Used for secondary text, metadata, and supporting information.

### Named Rules
**The Tinted Canvas Rule.** Never use pure #fff or #000. All neutrals must carry a hint of the brand's warmth (blush or plum) to maintain the tactile, human feel.

## 3. Typography

**Display Font:** Cormorant Garamond (with Georgia, serif fallback)
**Body Font:** DM Sans (with system-ui, sans-serif fallback)
**Label/Mono Font:** DM Mono (with monospace fallback)

**Character:** A pairing that balances the authoritative, editorial wisdom of a classic serif with the modern, approachable clarity of a clean sans-serif.

### Hierarchy
- **Display** (300, clamp(2rem, 5vw, 3.5rem), 1.1): Used for hero headlines and section titles. Evokes an editorial, story-driven feel.
- **Body** (400, 1rem, 1.6): Used for all long-form reading and descriptions. Line length capped at 65–75ch for comfort.
- **Label** (400, 0.688rem, 0.12em, uppercase): Used for eyebrows, metadata, and tiny structural markers.

### Named Rules
**The Editorial Pacing Rule.** Hierarchy must be driven by stark contrast in scale and weight, not subtle steps. The jump from an eyebrow label to a display headline should feel dramatic.

## 4. Elevation

The system uses a hybrid approach: flat by default, with soft, diffuse shadows (warm shadows) reserved strictly for interactive or floating elements like cards and navigation.

### Shadow Vocabulary
- **Warm Shadow Small** (`0 1px 4px oklch(from var(--foreground) l c h / 0.06)`): Used for subtle depth on hover states.
- **Warm Shadow Medium** (`0 4px 12px oklch(from var(--foreground) l c h / 0.08)`): Used for resting cards that need separation from the background.

### Named Rules
**The Warm Depth Rule.** Shadows must never be pure black or gray. They are derived from the deep plum text color (`var(--foreground)`) to blend naturally with the warm environment.

## 5. Components

### Buttons
- **Shape:** 4px radius (subtle rounding, neither sharp nor pill-shaped).
- **Primary:** Solid Editorial Magenta background with white text.
- **Hover / Focus:** Translates up slightly (`-translate-y-0.5`) with a transition.
- **Ghost:** Transparent background with a 1px Editorial Magenta border and text.

### Cards / Containers
- **Corner Style:** 16px radius (rounded-2xl) for a soft, approachable container.
- **Background:** Solid Warm Blush or pure white (`var(--surface)`).
- **Shadow Strategy:** Uses Warm Shadow Medium for separation.
- **Internal Padding:** Generous padding (32px / p-8) to let content breathe.

## 6. Do's and Don'ts

### Do:
- **Do** use the Warm Blush background for all foundational canvas areas.
- **Do** cap body text line lengths around 65–75 characters to maintain readability.
- **Do** use Cormorant for large, italicized pull quotes to emphasize human voices.

### Don't:
- **Don't** use high-tech, noisy SaaS templates with glowing neon and glassmorphism.
- **Don't** use sterile, corporate consultancy layouts with generic stock photos.
- **Don't** use aggressive marketing patterns like huge conversion buttons or side-stripe colored borders on cards.
