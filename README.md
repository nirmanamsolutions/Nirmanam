# Nirmanam Solutions

> **Premium Software Engineering & Design Studio**  
> Architecting high-performance web applications, native mobile apps, and scalable cloud systems.  
> Live Deployment: [nirmanamsolutions.vercel.app](https://nirmanamsolutions.vercel.app/)

---

## Overview

This repository houses the official company web platform for **Nirmanam Solutions** — an engineering and digital product studio based in Pune, India. 

The application is built on modern React 19 and Vite, featuring a responsive dark/light architectural aesthetic inspired by industrial brutalism, chamfered geometries, smooth Framer Motion micro-interactions, asset-synchronized preloading, and integrated client inquiry processing via EmailJS.

---

## Key Highlights

- **Hero & Brand Narrative**: Video-backed hero viewport with staggered typography and interactive call-to-actions.
- **Interactive Case Studies (Work)**: Showcase of enterprise web and mobile platforms with dynamic device mockups, category filters, and live project references:
  - *Sarvasvaa Dairy Management System* (React Native, Node.js, Express, MongoDB Atlas)
  - *SkillSutra E-Learning Platform* (React, HLS DRM streaming, Stripe API)
  - *Shivratna Kirana Retail System* (React 19, offline-first stock, thermal billing, jsPDF)
- **Service Stack Breakdown**: Detailed competency matrix covering Web Platforms, Mobile Architecture, Product Design & UX, Custom APIs, Cloud/DevOps, and Core Web Vitals optimization.
- **Engineering Process**: Visual walkthrough of our delivery methodology — from discovery and architectural modeling to production hardening.
- **Client Inquiry System**: Real-time project inquiry terminal connected to EmailJS with client-side field validation and delivery status tracking.
- **Zero-Flicker Asset Loader**: Preloads critical media assets (hero video, about video, project visuals) before revealing the interface to prevent layout shifts.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) |
| **Motion & Dynamics** | [Framer Motion](https://www.framer.com/motion/) |
| **Styling & Design Tokens** | Pure CSS Tokens + [Tailwind CSS](https://tailwindcss.com/) utilities + Chamfer Geometry |
| **Typography** | Quantico (Display/Brutalist Monospace) + Inter (Body) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Form Transmission** | [EmailJS Browser SDK](https://www.emailjs.com/) |
| **Code Quality** | Oxlint |
| **Hosting & CI/CD** | Vercel / Netlify |

---

## Project Structure

```
├── public/                     # Static production assets
│   ├── favicon.svg             # Brand favicon
│   ├── project_*.png           # High-resolution portfolio mockups
│   ├── sitemap.xml             # Search engine index map
│   └── robots.txt              # Crawler permissions
├── src/
│   ├── components/
│   │   ├── common/             # Reusable atomic UI (Button, ChamferCard, SectionHeader, etc.)
│   │   ├── layout/             # Navigation header, Mobile drawer, Footer
│   │   ├── sections/           # Page sections (Hero, About, Services, Portfolio, Process, Contact)
│   │   └── ui/                 # Preloader (Loader.jsx) and interactive overlays
│   ├── data/
│   │   └── siteContent.js      # Centralized single source of truth for all content & meta
│   ├── hooks/                  # Custom React hooks (useIsMobile, useAssetsReady, etc.)
│   ├── index.css               # Design system variables, color tokens, and utility resets
│   ├── App.jsx                 # App shell, asset orchestration, and section assembly
│   └── main.jsx                # DOM mount entry point
├── .env.example                # Environment variables blueprint
├── package.json                # Project dependencies and script declarations
└── vite.config.js              # Vite bundling and plugin configurations
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nirnamam/swebsite.git
   cd swebsite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the project root:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_CONTACT_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```

4. **Launch the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts Vite local dev server with Hot Module Replacement (HMR) |
| `npm run build` | Compiles optimized production bundle into `dist/` |
| `npm run preview` | Runs a local web server serving the production `dist/` build |
| `npm run lint` | Runs Oxlint for fast static analysis and linting checks |

---

## Deployment

The application is optimized for zero-configuration deployments on **Vercel** or **Netlify**:

1. **Build Command:** `npm run build`
2. **Output Directory:** `dist`
3. **Environment Variables:** Ensure `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_CONTACT_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` are defined in your deployment dashboard settings.

---

## Studio Contact & Links

- **Website**: [nirmanamsolutions.vercel.app](https://nirmanamsolutions.vercel.app/)
- **Email**: [nirmanamsolutions@gmail.com](mailto:nirmanamsolutions@gmail.com)
- **Location**: Pune, Maharashtra, India
- **LinkedIn**: [linkedin.com/company/nirmanam-solutions](https://linkedin.com/company/nirmanam-solutions)
- **GitHub**: [github.com/nirnamam](https://github.com/nirnamam)

---

© 2026 Nirmanam Solutions. All rights reserved.
