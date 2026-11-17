import type { Metadata, Viewport } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Real Olive Oil Squeeze Bottles – SRSTI",
  description: "Pixel-perfect replica of SRSTI with exact animations, typography, color palette, and micro-interactions.",
  icons: {
    icon: [
      {
        url: "/cdn/shop/t/38/assets/favicon-32x32.static_small.png?v=97222300656985941251682500131",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/cdn/shop/t/38/assets/favicon-16x16.static_small.png?v=137613868103863135591682500131",
        sizes: "16x16",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Exact Fonts & Bundle Styles */}
        <link rel="stylesheet" href="/assets/fonts.static.css" />
        <link rel="stylesheet" href="/assets/bundle.css" />

        {/* Primary Main Brand Color (#b9d6a8) Theme Enforcement */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --color-brand: #b9d6a8 !important;
                --color-primary: #b9d6a8 !important;
                --color-atc-btn: #b9d6a8 !important;
              }
              .bg-brand {
                background-color: #b9d6a8 !important;
              }
              .text-brand {
                color: #26381e !important;
              }
              .btn--large:before,
              .btn--small:before,
              .btn--std:before {
                background-color: #b9d6a8 !important;
                color: #1F2718 !important;
              }
              .badge--product,
              .badge--collection-product {
                background-color: #b9d6a8 !important;
                color: #1F2718 !important;
              }
              .hover\\:bg-brand:hover,
              .lg\\:hover\\:bg-brand:hover {
                background-color: #a8ca94 !important;
              }
            `,
          }}
        />

        {/* Motion Preference Check */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = localStorage.getItem('srsti-pause-motion');
                  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  if (stored === 'true' || (stored === null && reduce)) {
                    document.documentElement.classList.add('pause-motion');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />

        {/* SRSTI Branding Enforcer */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function enforceSrsti() {
                  var logoSelectors = 'a[href="/"].mc svg, a[href="/"] > span > svg, .logo-wobble svg, svg-icon[icon="logo"] svg, footer svg-icon svg';
                  document.querySelectorAll(logoSelectors).forEach(function(svg) {
                    var hasOnlySrstiText = svg.querySelector('text') && svg.textContent.trim() === 'SRSTI' && !svg.querySelector('path');
                    if (hasOnlySrstiText) return;
                    svg.setAttribute('viewBox', '0 0 132 36');
                    svg.setAttribute('width', '132');
                    svg.setAttribute('height', '36');
                    svg.innerHTML = '<text x="1" y="30" font-family="\\'ITC Garamond Condensed\\', serif" font-weight="900" font-size="44" textLength="130" lengthAdjust="spacingAndGlyphs" stroke="currentColor" stroke-width="1.2" paint-order="stroke fill" fill="currentColor">SRSTI</text>';
                  });
                  document.querySelectorAll('[aria-label*="Graza"], [aria-label*="graza"]').forEach(function(el) {
                    var current = el.getAttribute('aria-label');
                    if (current) {
                      el.setAttribute('aria-label', current.replace(/graza/gi, "SRSTI"));
                    }
                  });
                }
                enforceSrsti();
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', enforceSrsti);
                }
                window.addEventListener('load', enforceSrsti);
                setInterval(enforceSrsti, 200);
                new MutationObserver(enforceSrsti).observe(document.documentElement, { childList: true, subtree: true });
              })();
            `,
          }}
        />
      </head>
      <body
        className="overlay-active transition--opacity template-index page- bg-background text-text font-body text-15 md:text-16"
        suppressHydrationWarning
      >
        <div id="a11y-status" className="visually-hidden" aria-live="polite" aria-atomic="true"></div>
        {children}
      </body>
    </html>
  );
}
