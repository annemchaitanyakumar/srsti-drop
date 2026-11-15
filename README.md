# SRSTI Exact Replica

A pixel-perfect, multi-page replica of **SRSTI** with exact animations, typography, color palette, responsive design, and micro-interactions.

## Features & Replicated Pages

### 1. The Signature Olive Oil Drop Animation ("About SRSTI")
- Located in the **"Olive oil so fresh, you can taste it"** section on the homepage.
- **The Top Tap/Olive:** Starts at the top olive illustration with floating, animated `*Drip* *Drip*` text.
- **The Scrubbed Drop:** As you scroll, an animated olive oil droplet (`#intro-drop`) scales up and is pinned by GSAP ScrollTrigger right in the center, flowing through the freshness content slides.
- **The Wobble:** As the droplet reaches the bottom, it triggers the signature SRSTI logo wobble animation (`.logo-wobble`).
- **High-Z Stacking & Pinning:** Rendered with elevated z-index and subtle drop-shadows to ensure it stays pinned cleanly over the slides across all viewport sizes.

---

### 2. Fully Replicated Pages & Routes

The following pages are fully replicated with complete styles, interactive Vue components, and carousels:

- **Homepage** (`/` or `index.html`)
- **Product Pages:**
  - **"The Duo" (Sizzle & Drizzle Combo Pack):** [`/products/sizzle-drizzle-combo-pack`](file:///d:/Projects/----------------------------/products/sizzle-drizzle-combo-pack/index.html)
  - **"Original" Olive Oil Mayo:** [`/products/original-mayo`](file:///d:/Projects/----------------------------/products/original-mayo/index.html)
  - **Potato Chips:** [`/products/potato-chips`](file:///d:/Projects/----------------------------/products/potato-chips/index.html)
  - **"The Trio":** [`/products/the-trio`](file:///d:/Projects/----------------------------/products/the-trio/index.html)
  - **"Fancy" Mayo:** [`/products/fancy-mayo`](file:///d:/Projects/----------------------------/products/fancy-mayo/index.html)
  - **Garlic Aioli:** [`/products/garlic-aioli`](file:///d:/Projects/----------------------------/products/garlic-aioli/index.html)
- **Collections:**
  - **Shop All:** [`/collections/all`](file:///d:/Projects/----------------------------/collections/all/index.html)
  - **Olive Oil:** [`/collections/olive-oil`](file:///d:/Projects/----------------------------/collections/olive-oil/index.html)
  - **Bundles:** [`/collections/bundles`](file:///d:/Projects/----------------------------/collections/bundles/index.html)
  - **Gifts:** [`/collections/gifts`](file:///d:/Projects/----------------------------/collections/gifts/index.html)
- **Content & Utility Pages:**
  - **About Us:** [`/pages/about-us`](file:///d:/Projects/----------------------------/pages/about-us/index.html)
  - **Subscribe & Save:** [`/pages/subscribe`](file:///d:/Projects/----------------------------/pages/subscribe/index.html)
  - **Store Locator (Find Us):** [`/pages/store-locator`](file:///d:/Projects/----------------------------/pages/store-locator/index.html)
  - **FAQs:** [`/pages/faqs`](file:///d:/Projects/----------------------------/pages/faqs/index.html)
  - **Recipes Blog (The Glog):** [`/blogs/recipes`](file:///d:/Projects/----------------------------/blogs/recipes/index.html) & [`/pages/glog`](file:///d:/Projects/----------------------------/pages/glog/index.html)

---

### 3. Exact Typography & Color System
- **Fonts**: `GT Alpina Typewriter` (Light, Light Italic, Medium, Medium Italic), `ITC Garamond Condensed` (Regular, Italic), and `Apercu` (Bold) from local `.woff2` files in `assets/fonts/`.
- **Colors**: Sourced directly from CSS variables (`--color-brand: #D1E030`, `--color-accent: #9EEF80`, `--color-secondary: #FBD535`, `--color-text: #3C422E`, `--color-background: #F6E6D9`, `--color-highlight: #FFF4EC`, `--color-stroke: #9FCD7A`).

---

## How to Run

### Local Server (Recommended)
```bash
npm start
# Server runs on http://localhost:3000/
```

# srsti-drop
