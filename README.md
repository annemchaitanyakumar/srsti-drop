# SRSTI (Next.js)

A pixel-perfect, multi-page replica of **SRSTI** converted into a full-featured **Next.js (App Router)** project with exact animations, typography, color palette, responsive design, and micro-interactions.

## Features & Replicated Pages

### 1. The Signature Olive Oil Drop Animation ("About SRSTI")
- Located in the **"Olive oil so fresh, you can taste it"** section on the homepage.
- **The Top Tap/Olive:** Starts at the top olive illustration with floating, animated `*Drip* *Drip*` text.
- **The Scrubbed Drop:** As you scroll, an animated olive oil droplet (`#intro-drop`) scales up and is pinned by GSAP ScrollTrigger right in the center, flowing through the freshness content slides.
- **The Wobble:** As the droplet reaches the bottom, it triggers the signature SRSTI logo wobble animation (`.logo-wobble`).
- **High-Z Stacking & Pinning:** Rendered with elevated z-index and subtle drop-shadows to ensure it stays pinned cleanly over the slides across all viewport sizes.

---

### 2. Fully Replicated Next.js Pages & Routes

The following routes are fully rendered with complete styles, interactive Vue components, Next.js SSG/SSR, and carousels:

- **Homepage:** `/` (`src/app/page.tsx`)
- **Product Pages:** (`src/app/products/[slug]/page.tsx`)
  - **"The Duo" (Sizzle & Drizzle Combo Pack):** `/products/sizzle-drizzle-combo-pack`
  - **"Original" Olive Oil Mayo:** `/products/original-mayo`
  - **Potato Chips:** `/products/potato-chips`
  - **"The Trio":** `/products/the-trio`
  - **"Fancy" Mayo:** `/products/fancy-mayo`
  - **Garlic Aioli:** `/products/garlic-aioli`
  - **"Drizzle":** `/products/drizzle`
  - **"Sizzle":** `/products/sizzle`
  - **Refills, Cans & Sets:** `/products/drizzle-refill-can`, `/products/sizzle-refill-can`, `/products/duo-refill-can`, `/products/sizzle-bag-in-box`, `/products/the-starter-kit`, `/products/gift-set-drizzle-sizzle`, `/products/the-graza-tote`
- **Collections:** (`src/app/collections/[slug]/page.tsx`)
  - **Shop All:** `/collections/all`
  - **Olive Oil:** `/collections/olive-oil`
  - **Bundles:** `/collections/bundles`
  - **Gifts:** `/collections/gifts`
- **Content & Utility Pages:** (`src/app/pages/[slug]/page.tsx`)
  - **About Us:** `/pages/about-us`
  - **Subscribe & Save:** `/pages/subscribe`
  - **Store Locator (Find Us):** `/pages/store-locator`
  - **FAQs:** `/pages/faqs`
  - **Recipes Blog (The Glog):** `/pages/glog` & `/blogs/recipes`
- **API & Mock Routes:**
  - **Cart JSON Endpoint:** `/cart.json` (`src/app/cart.json/route.ts`)
  - **Cart Action Interceptors:** `/cart/add.js`, `/cart/update.js`, `/cart/change.js` (`src/app/cart/[...action]/route.ts`)
  - **Transparent Shopify CDN & Local Asset Proxy:** `/cdn/shop/[...path]` (`src/app/cdn/shop/[...path]/route.ts`)
  - **Cutout Saver:** `/api/save-cutout` (`src/app/api/save-cutout/route.ts`)

---

### 3. Exact Typography & Color System
- **Fonts**: `GT Alpina Typewriter` (Light, Light Italic, Medium, Medium Italic), `ITC Garamond Condensed` (Regular, Italic), and `Apercu` (Bold) from local `.woff2` files in `public/assets/fonts/`.
- **Colors**: Sourced directly from CSS variables (`--color-brand: #b9d6a8` [Primary Homepage Sage/Olive Green], `--color-accent: #9EEF80`, `--color-secondary: #FBD535`, `--color-text: #3C422E`, `--color-background: #F6E6D9`, `--color-highlight: #FFF4EC`, `--color-stroke: #9FCD7A`).

---

## How to Run

### Development Mode
```bash
npm run dev
# Server runs on http://localhost:3000/
```

### Production Build & Serve
```bash
npm run build
npm start
# Server runs on http://localhost:3000/
```
