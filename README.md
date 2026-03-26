# Lumière Coffee — Premium Coffee Shop Website

A production-ready, high-end coffee shop website built with React, Framer Motion, and custom CSS.

## Features

- **Cinematic intro loader** with brand reveal animation
- **Custom magnetic cursor** (desktop)
- **Sticky navbar** with scroll-triggered transparency + active section highlighting
- **Full-screen hero** with parallax background, layered overlays, animated headline
- **Interactive menu** with category filtering, hover tilt, and staggered animations
- **About section** with scroll-triggered split layout, image parallax, and stats
- **Mid-page CTA banner** with parallax background
- **Testimonials carousel** with animated slide transitions
- **Contact form** with floating labels, validation, and success state
- **Embedded Google Map**
- **Footer** with newsletter input, social links, and hours
- **Floating WhatsApp button** with pulsing animation
- Fully **responsive** (mobile-first)

## Setup

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

## Build for Production

```bash
npm run build
```

## Structure

```
src/
  components/
    IntroLoader.jsx     — Cinematic loading screen
    CustomCursor.jsx    — Magnetic custom cursor
    Navbar.jsx          — Sticky nav with mobile menu
    Hero.jsx            — Full-screen parallax hero
    Menu.jsx            — Interactive menu cards
    About.jsx           — Split layout about section
    FloatingCTA.jsx     — WhatsApp button + CTA banner
    Testimonials.jsx    — Animated testimonial carousel
    Contact.jsx         — Form with validation + map
    Footer.jsx          — Minimal elegant footer
  hooks/
    useScrollAnimation.js — IntersectionObserver hook
  App.js
  index.js
public/
  index.html
```

## Tech Stack

- **React 18** — Functional components + hooks
- **Framer Motion 11** — All animations
- **Custom CSS** — No external CSS framework (pure inline + `<style>` blocks)
- **Google Fonts** — Cormorant Garamond + Jost
- **Unsplash** — High-quality imagery (CDN, no downloads needed)
