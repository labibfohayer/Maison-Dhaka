# 🏰 Complete Reverse Engineering Analysis & Blueprint
## Project: Le Cercle — Luxury Real Estate Template Replica
**Target URL:** `https://www.webild.io/templates/luxury-real-estate`  
**Live Preview Engine:** `https://webild-mcp-components.vercel.app/templates/luxury-real-estate`  
**Generated On:** 2026-11-19  
**Quality Protocol:** Strict Watchdog Zero-Regression Verified  

---

## 1. Executive Summary & Architecture Overview

The target application is an ultra-premium real estate portfolio and showcase site titled **"Le Cercle"**, designed for luxury properties on Spain's Costa del Sol (Marbella, Puerto Banús, Sierra Blanca, La Zagaleta).

The site utilizes a single-page architecture with smooth section navigation (`#hero`, `#about`, `#properties`, `#contact`), high-end scroll-driven animations, Lenis smooth scrolling, GSAP ScrollTrigger for video scrubbing, and Framer Motion for interactive transitions, full-screen menu morphing, and text reveals.

### Technology Stack
- **Framework:** Next.js 15+ (App Router) / React 19
- **Styling:** Tailwind CSS v4 / modern Tailwind variables + custom design tokens
- **Typography:**
  - Headings / Serif: **Argon** (`Argon_Regular1.woff`)
  - Body / UI / Sans: **Inter Tight** (`Inter Tight`, sans-serif)
- **Animation Suite:**
  - **Lenis:** Smooth inertial scrolling (`@studio-freight/lenis` / `lenis`)
  - **GSAP + ScrollTrigger:** Frame-accurate video playback scrubbing on scroll
  - **Framer Motion:** Loading screen, clip-path full-screen navigation modal, scroll-based text color fill, word reveals, parallax image scaling, and contact card entrance
- **Icons:** Lucide React (`ArrowUpRight`)

---

## 2. Sitemap & Route Hierarchy

| Route | Type | Description | Anchor Targets |
| :--- | :--- | :--- | :--- |
| `/` | Landing / Single-Page Experience | Complete luxury real estate presentation | `#hero`, `#about`, `#properties`, `#contact` |
| `#hero` | Anchor Section | 300vh scroll-paced video hero showcase with turnkey headline | - |
| `#about` | Anchor Section | Text-color-fill narrative statement & high-res estate photography | - |
| `#properties` | Anchor Section | 2-column grid showcasing 6 luxury villas with parallax hover cards | - |
| `#contact` | Anchor Section | Parallax background card with consultation inquiry form & agent contact | - |
| `mailto:hello@lecercle.com` | External Action | Direct email link with concierge agent avatar | - |

---

## 3. Section Breakdown & DOM Hierarchy

```
<Lenis root>
  ├── <NavbarFullscreenStatic>
  │     ├── Logo: "Le Cercle" (links to "/")
  │     ├── CTA Button: "Book a Tour" (smooth scrolls to "#contact")
  │     ├── Hamburger Button (animated two-line bar with 45-degree rotation)
  │     └── Fullscreen Overlay (polygon clip-path curtain reveal)
  │           └── Navigation Links: Properties, About, Contact
  │
  ├── <div id="hero" data-section="hero">
  │     └── <HeroVideoScroll>
  │           ├── Initial Loader: Brand tag sweep + progress line fill (clipPath + scaleX)
  │           ├── 300vh Container with Sticky 100svh Video Viewport
  │           ├── Background Video: hero.mp4 scrubbed on scroll via GSAP ScrollTrigger
  │           ├── Radial Gradient & Backdrop Blur Overlay
  │           └── Content Card:
  │                 ├── Tag Badge: "Le Cercle Premium Real Estate"
  │                 ├── H1: "Live Where the Sun Meets the Sea" (Argon Serif, 60px/72px)
  │                 ├── Description: "Exclusive beachfront villas and luxury apartments..."
  │                 ├── Primary Button: "View Properties" -> #properties
  │                 └── Secondary Button: "Book a Tour" -> #contact
  │
  ├── <div id="about" data-section="about">
  │     └── <AboutTextFill>
  │           ├── H2: "For those who travel like it's an art form."
  │           │     └── TextColorFillOnScroll (progressive word opacity 0.15 -> 1.0)
  │           └── Parallax Image: statement-1600.webp (scale 1.11 -> 1.0 on scroll)
  │
  ├── <div id="properties" data-section="properties">
  │     └── <FeaturesMediaColumns>
  │           ├── Header:
  │           │     ├── Tag Badge: "Properties"
  │           │     ├── H2: "Our Villas" (Argon Serif, 48px)
  │           │     └── Description: "Handpicked residences in Marbella's most coveted..."
  │           └── 2-Column Grid (6 Villa Items):
  │                 ├── 1. Villa Serena (5-bedroom retreat, infinity pool)
  │                 ├── 2. Casa del Sol (beachfront living, rooftop lounge)
  │                 ├── 3. Villa Andalucía (courtyard, olive grove, heated pool)
  │                 ├── 4. The Meridian (4-bedroom penthouse, smart home)
  │                 ├── 5. Villa Blanca (minimalist estate, private cinema, spa)
  │                 └── 6. Casa Dorada (golden-hour perfection, wine cellar)
  │
  ├── <div id="contact" data-section="contact">
  │     └── <ContactParallaxCard>
  │           ├── Background: cta-bg-1600.webp with subtle y: [-10%, 10%] parallax
  │           └── Frosted Glass Floating Card (backdrop-blur-xl bg-white/10 border-white/10):
  │                 ├── H2: "Get In Touch" (Argon Serif, 30px)
  │                 ├── Input: "Your name"
  │                 ├── Input: "Your email"
  │                 ├── Textarea: "Tell us about your dream property..."
  │                 ├── Button: "Send Message" (interactive feedback state)
  │                 └── Concierge Agent Pill:
  │                       ├── Text: "Prefer to talk? Book a private tour."
  │                       └── Email Link with Avatar: "Email Us" (avatar-1600.webp)
  │
  └── <footer>
        └── <FooterBasic>
              ├── 4 Columns: Properties, Services, Locations, Company
              ├── Divider Line (1px border-foreground/15)
              └── Bottom Bar:
                    ├── Left: "© 2026 Le Cercle. All rights reserved."
                    └── Right: "Marbella, Costa del Sol"
```

---

## 4. Design Tokens & Visual Hierarchy

### Color Palette
- **Background (`--background`):** `#faf8f5` (Warm Mediterranean Alabaster / Sand)
- **Foreground (`--foreground`):** `#1a1a1a` (Deep Carbon Charcoal)
- **Card Background (`--card`):** `#ffffff`
- **Primary (`--primary`):** `#1a1a1a`
- **Primary Foreground (`--primary-foreground`):** `#faf8f5`
- **Secondary (`--secondary`):** `#f0ece6` (Soft Travertine)
- **Secondary Foreground (`--secondary-foreground`):** `#1a1a1a`
- **Muted (`--muted`):** `#e8e6e3`
- **Muted Foreground (`--muted-foreground`):** `#686867`
- **Accent (`--accent`):** `#c9a96e` (Subtle Sunlit Champagne Gold)
- **Border (`--border`):** `#dfdddb`
- **Glass Card Overlay:** `rgba(255, 255, 255, 0.1)` with `backdrop-filter: blur(24px)` and `border: 1px solid rgba(255, 255, 255, 0.15)`

### Typography Scale
- **Display H1:** `Argon`, 60px (desktop) / 36px (mobile), leading `1.15`, font-weight 400
- **Display H2 (About):** `Argon`, 60px (desktop) / 32px (mobile), leading `1.15`, font-weight 400
- **Section H2 (Properties):** `Argon`, 48px (desktop) / 28px (mobile), leading `1.15`, font-weight 400
- **Card H3 (Villas):** `Argon`, 24px (desktop) / 20px (mobile), leading `1.25`, font-weight 400
- **Card H2 (Contact):** `Argon`, 30px (desktop) / 24px (mobile), leading `1.2`, font-weight 400
- **Body / Lead:** `Inter Tight`, 18px (desktop) / 16px (mobile), leading `1.375`, font-weight 400
- **UI / Buttons / Badges:** `Inter Tight`, 14px, font-weight 400 / 500
- **Footer Links / Captions:** `Inter Tight`, 16px & 14px, font-weight 400

### Spacing & Layout
- **Max Container Width:** `max-w-6xl` (1152px / 72rem) with `px-6`
- **Grid Gaps:** 20px (`gap-5`) for property cards; 32px-40px (`gap-8 md:gap-10`) section gaps
- **Border Radii:** `rounded-lg` (12px / 0.75rem), `rounded-full` (9999px)

---

## 5. Animation & Interaction Specifications

### 1. Page Load Preloader
- Container: Fullscreen overlay (`fixed inset-0 z-1001 bg-foreground`)
- Brand Tag: "Le Cercle Premium Real Estate"
  - Inset reveal clip-path from `inset(0% 100% 0% 0%)` to `inset(0% 0% 0% 0%)` over `2.0s` ease `[0.76, 0, 0.24, 1]`
- Progress Bar: Width 192px (`w-48`), height 2px, scaling from `0` to `1`
- Exit Transition: Opacity `0`, slide up `-20px`, overlay fades over `0.8s`

### 2. Fullscreen Navigation Drawer
- Trigger: Two-line hamburger button in navbar
- Animation: `clip-path` morph from `polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)` to `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`
- Duration: `0.7s` cubic-bezier `[0.9, 0, 0.1, 1]`
- Link Stagger: Each nav item slides up `translateY(100%)` -> `translateY(0%)` with delay `0.3s + index * 0.05s`
- Hover State: Text shifts right `group-hover:ml-4`, arrow rotates 45 degrees `group-hover:rotate-45`

### 3. Hero Video Scrubbing
- Container: `h-[300vh]`, video element pinned sticky at `top: 0`, `h-svh`
- Trigger: Scroll progress from top of container to bottom of container
- Easing: `scrub: 0.5`
- Calculation: `video.currentTime = video.duration * progress`

### 4. About Text Color Fill
- Trigger: Scroll progress between `['start 0.8', 'start 0.2']`
- Calculation: Per-word opacity mapped smoothly from `0.15` (dimmed) to `1.0` (fully active)

### 5. Parallax Image Zoom
- All photography elements use dynamic transform scaling from `1.11` to `1.0` as they enter and traverse the viewport

### 6. Interactive Inquiry Form
- Inputs provide live state management, validation feedback, and clean focus ring transitions
- Submit button transforms to "Sending..." with disabled safety guard, and resets on success

---

## 6. Asset Inventory

| Asset Name | Source Path | Dimensions / Type | Usage |
| :--- | :--- | :--- | :--- |
| `hero.mp4` | `/public/assets/hero.mp4` | 1080p MP4 H.264 | Scrubbing Hero background |
| `statement-1600.webp` | `/public/assets/statement-1600.webp` | 1600x1067 WebP | About section statement hero |
| `villa-serena-1600.webp` | `/public/assets/villa-serena-1600.webp` | 1600x1600 WebP | Villa Serena property card |
| `casa-del-sol-1600.webp` | `/public/assets/casa-del-sol-1600.webp` | 1600x1600 WebP | Casa del Sol property card |
| `villa-andalucia-1600.webp`| `/public/assets/villa-andalucia-1600.webp`| 1600x1600 WebP | Villa Andalucía property card |
| `the-meridian-1600.webp` | `/public/assets/the-meridian-1600.webp` | 1600x1600 WebP | The Meridian property card |
| `villa-blanca-1600.webp` | `/public/assets/villa-blanca-1600.webp` | 1600x1600 WebP | Villa Blanca property card |
| `casa-dorada-1600.webp` | `/public/assets/casa-dorada-1600.webp` | 1600x1600 WebP | Casa Dorada property card |
| `cta-bg-1600.webp` | `/public/assets/cta-bg-1600.webp` | 1600x1067 WebP | Contact section parallax background |
| `avatar-1600.webp` | `/public/assets/avatar-1600.webp` | 400x400 WebP | Concierge agent contact avatar |
| `Argon_Regular1.woff` | `/public/fonts/Argon_Regular1.woff` | WOFF Font | Heading / Display typography |
| `favicon.svg` | `/public/favicon.svg` | SVG Vector | Site Favicon & Brand Mark |

---

## 7. Verbatim Copy Ledger

- **Brand Name:** `Le Cercle`
- **Nav Items:** `Properties` (`#properties`), `About` (`#about`), `Contact` (`#contact`)
- **Nav CTA:** `Book a Tour` (`#contact`)
- **Hero Tag:** `Le Cercle Premium Real Estate`
- **Hero H1:** `Live Where the Sun Meets the Sea`
- **Hero Description:** `Exclusive beachfront villas and luxury apartments on the Costa del Sol. Your Mediterranean dream, delivered turnkey.`
- **Hero Primary Button:** `View Properties` (`#properties`)
- **Hero Secondary Button:** `Book a Tour` (`#contact`)
- **About H2:** `For those who travel like it's an art form.`
- **Properties Tag:** `Properties`
- **Properties H2:** `Our Villas`
- **Properties Description:** `Handpicked residences in Marbella's most coveted locations, each designed for effortless Mediterranean living.`
- **Villa 1 Title:** `Villa Serena`
- **Villa 1 Description:** `A sunlit 5-bedroom retreat with infinity pool, panoramic sea views, and private garden terraces.`
- **Villa 2 Title:** `Casa del Sol`
- **Villa 2 Description:** `Contemporary beachfront living with floor-to-ceiling glass, rooftop lounge, and direct beach access.`
- **Villa 3 Title:** `Villa Andalucía`
- **Villa 3 Description:** `Traditional charm meets modern luxury — courtyard, olive grove, and a heated outdoor pool.`
- **Villa 4 Title:** `The Meridian`
- **Villa 4 Description:** `Sleek 4-bedroom penthouse villa with smart home technology and sweeping coastal views.`
- **Villa 5 Title:** `Villa Blanca`
- **Villa 5 Description:** `Minimalist white-washed estate with private cinema, spa suite, and landscaped Mediterranean gardens.`
- **Villa 6 Title:** `Casa Dorada`
- **Villa 6 Description:** `Golden-hour perfection — west-facing terraces, wine cellar, and an open-plan chef's kitchen.`
- **Contact H2:** `Get In Touch`
- **Contact Inputs:** `Your name`, `Your email`
- **Contact Textarea:** `Tell us about your dream property...`
- **Contact Button:** `Send Message`
- **Contact Footer Text:** `Prefer to talk? Book a private tour.`
- **Contact Footer Link:** `Email Us` (`mailto:hello@lecercle.com`)
- **Footer Column 1 (Properties):** `Villas`, `Apartments`, `Penthouses`, `New Developments`
- **Footer Column 2 (Services):** `Property Search`, `Legal Assistance`, `Interior Design`, `Property Management`
- **Footer Column 3 (Locations):** `Golden Mile`, `Puerto Banús`, `Sierra Blanca`, `La Zagaleta`
- **Footer Column 4 (Company):** `About Us`, `Contact`, `Privacy Policy`, `Terms of Service`
- **Footer Left Text:** `© 2026 Le Cercle. All rights reserved.`
- **Footer Right Text:** `Marbella, Costa del Sol`
