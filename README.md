# 🏰 Maison Dhaka — Ultra-Luxury Real Estate & Architectural Living

[![Live Demo](https://img.shields.io/badge/Live_Demo-maisondhaka.pages.dev-success?style=for-the-badge&logo=cloudflare&logoColor=white)](https://maisondhaka.pages.dev/)

> An ultra-premium, interactive luxury real estate portfolio and showcase application for **Maison Dhaka**, located in Mohakhali DOHS, Dhaka. Engineered with Next.js 15, Tailwind CSS, TypeScript, Framer Motion, GSAP ScrollTrigger, and Lenis Smooth Scroll.

---

## ✨ Features

- **🎬 Scroll-Paced Video Hero:** Sticky 300vh scroll container scrubbing high-resolution architectural villa footage via **GSAP ScrollTrigger**.
- **🔒 Pinned Viewport Lock:** Hero remains completely locked at the top of the viewport until the architectural video animation concludes.
- **🧭 Fullscreen Morphing Navigation:** Smooth `clip-path` polygon curtain drawer with staggered links and interactive hover interactions.
- **📜 Scroll-Driven Text Color Fill:** Word-by-word opacity lighting up dynamically as the narrative statement is scrolled into view.
- **🏡 2-Column Villa Showcase:** 6 curated residences featuring parallax image zoom and staggered slide-up reveals.
- **✉️ Glassmorphic Contact Card:** Backdrop-blur glassmorphism inquiry card with live submission feedback and direct concierge email link.
- **🌊 Inertial Smooth Scroll:** Integrated with **Lenis** for silky-smooth 60fps+ inertial scrolling.
- **📱 100% Fully Responsive:** Pixel-perfect across Desktop (1920px & 1440px), Tablet (768px), and Mobile (375px).

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/) + React 19
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Animations:**
  - [GSAP](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/)
  - [Framer Motion](https://www.framer.com/motion/)
  - [Lenis](https://lenis.darkroom.engineering/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/labibfohayer/Maison-Dhaka.git
cd Maison-Dhaka
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for local development, or access the live production deployment at **[maisondhaka.pages.dev](https://maisondhaka.pages.dev/)**.

### 4. Build for production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx         # Root layout with SEO meta & fonts
│   ├── page.tsx           # Main single-page application
│   └── globals.css        # Global CSS, tokens & font declarations
├── components/
│   ├── Navbar.tsx         # Fullscreen curtain navigation
│   ├── HeroSection.tsx    # 300vh sticky scroll-paced video hero
│   ├── AboutSection.tsx   # Text color fill statement section
│   ├── PropertiesSection.tsx # 2-column villa showcase grid
│   ├── ContactSection.tsx # Glassmorphic inquiry card
│   ├── Footer.tsx         # 4-column structured footer
│   └── motion/            # Reusable scroll & animation primitives
├── data/
│   └── siteData.ts        # Centralized editable content & properties
└── public/
    ├── assets/            # High-res video, WebP images, avatar
    ├── fonts/             # Argon & Inter Tight webfonts
    └── favicon.svg        # Custom luxury house vector favicon
```

---

## 📄 License

Private & Proprietary. © 2026 Maison Dhaka. All rights reserved.
