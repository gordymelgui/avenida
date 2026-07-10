---
name: Urban Underground
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#cfc4c5'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#988e90'
  outline-variant: '#4c4546'
  surface-tint: '#c6c6c6'
  primary: '#c6c6c6'
  on-primary: '#303030'
  primary-container: '#000000'
  on-primary-container: '#757575'
  inverse-primary: '#5e5e5e'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#aed500'
  on-tertiary: '#293500'
  tertiary-container: '#000000'
  on-tertiary-container: '#667e00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#c7f300'
  tertiary-fixed-dim: '#aed500'
  on-tertiary-fixed: '#171e00'
  on-tertiary-fixed-variant: '#3d4d00'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
  signal-orange: '#FF4D00'
  industrial-purple: '#8357C5'
  concrete-gray: '#333333'
typography:
  display-xl:
    fontFamily: anton
    fontSize: 120px
    fontWeight: '400'
    lineHeight: 110px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: anton
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 60px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 44px
  body-md:
    fontFamily: spaceGrotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: spaceMono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
  code-sm:
    fontFamily: spaceMono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 64px
  grid-columns: '12'
---

## Brand & Style

The design system is rooted in the "Raw Industrial" movement, capturing the unpolished, high-energy aesthetic of streetwear culture. It is designed for an audience that values authenticity, subversion, and the "underground" spirit. The brand personality is unapologetic, technical, and high-impact.

The design style is a hybrid of **Brutalism** and **Technical Modernism**. It prioritizes high-contrast layouts, heavy borders, and a focus on "raw" materials. Expect to see heavy use of grain textures, concrete-inspired backgrounds, and oversized, aggressive typography that breaks traditional alignment to create a sense of movement and urgency.

## Colors

The palette is anchored in a high-contrast "Void and Light" philosophy. Deep blacks (`#000000`) and near-blacks (`#1A1A1A`) provide a dense, industrial foundation. **Neon Volt** (`#D1FF00`) serves as the primary functional accent, cutting through the darkness with radioactive intensity.

**Signal Orange** is reserved for critical warnings and "industrial hazard" signifiers. **Industrial Purple** is used sparingly as a legacy brand accent for depth in gradients or secondary call-to-actions. Text should primarily reside in **Stark White** or the high-vis Neon to ensure legibility against the dark, textured backgrounds.

## Typography

The typography strategy is built on scale and aggression. **Anton** is used for headlines to create a condensed, heavy-weight impact reminiscent of street posters and industrial signage. Headlines should often be set in all-caps.

**Space Grotesk** handles body copy, providing a technical, geometric clarity that balances the heaviness of the display type. For metadata, technical specs, and utility labels, **Space Mono** provides a "hacker/underground" aesthetic that reinforces the industrial narrative. Use exaggerated font sizes for lead-ins to break the grid.

## Layout & Spacing

This design system utilizes a **Fixed-Fluid Hybrid Grid**. While the main content containers follow a strict 12-column structure, elements are encouraged to "break" the grid—overflowing margins or overlapping other elements to create a collage-like, brutalist feel.

Spacing is based on a tight 4px baseline, but large-scale layouts should utilize massive "dead zones" (whitespace) to emphasize the raw elements. Gutters are kept thin (16px) to maintain a dense, compact feel in data-heavy areas, while sections should be separated by aggressive 120px+ vertical margins.

## Elevation & Depth

Depth in this design system is achieved through **Tonal Stacking** and **Texture Overlay**, rather than traditional light-source shadows. 

1.  **Z-Axis Stacking:** Surfaces do not "float." They are layered using high-contrast borders (2px solid white or neon).
2.  **Texture:** Use a persistent film grain or "noise" overlay across the entire UI (opacity 3-5%) to remove the digital "cleanliness." 
3.  **Distress:** Interactive elements may use "glitch" offsets or subtle concrete textures in the background to signify a higher elevation. Avoid blurs; use hard-edged offsets to represent depth.

## Shapes

The shape language is strictly **Sharp (0px)**. Roundness is perceived as "soft" or "consumer-friendly," which contradicts the raw, underground aesthetic of this system. 

Every button, input field, and container must have 90-degree corners. To add visual interest without using radii, use "clipped corners" (45-degree chamfers) on specialty components like chips or status indicators to evoke a military or industrial fabrication look.

## Components

### Buttons
Buttons are high-impact blocks. The "Primary" state is a solid Neon Green or Signal Orange block with Black text. The "Secondary" state is a Black block with a 2px White border. On hover, buttons should invert colors instantly—no transitions—to create a "flicker" effect.

### Input Fields
Fields consist of a bottom-border only (2px White) or a full technical box with no radius. Labels must be in `label-caps` (Space Mono) positioned directly above the field. Error states use the Signal Orange border and a "Hazard" icon.

### Cards
Cards are defined by heavy 2px borders. They should not have background fills that differ significantly from the page background; instead, use a subtle "Concrete" grain texture to differentiate the surface.

### Chips & Tags
Used for categorization, these resemble "industrial labels." Use Space Mono, all-caps, with a background color that matches the "Concrete Gray" or "Signal Orange" for alerts.

### Navigation
The navigation should feel like an architectural blueprint. Use thin lines to separate links and include "coordinates" or "serial numbers" (e.g., 001, 002) next to menu items to enhance the technical vibe.