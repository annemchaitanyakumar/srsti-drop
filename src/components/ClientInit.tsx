"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface ClientInitProps {
  bodyClass?: string;
  dataPage?: string;
}

export default function ClientInit({ bodyClass, dataPage }: ClientInitProps) {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Update body class and data-page
    if (bodyClass) {
      document.body.className = bodyClass;
    }
    if (dataPage !== undefined) {
      document.body.setAttribute("data-page", dataPage);
    }
    document.documentElement.style.setProperty("--color-brand", "#b9d6a8");
    document.documentElement.style.setProperty("--color-primary", "#b9d6a8");
    document.documentElement.style.setProperty("--color-atc-btn", "#b9d6a8");

    // 2. Enforce SRSTI logo and branding
    const enforceSrsti = () => {
      const logoSelectors =
        'a[href="/"].mc svg, a[href="/"] > span > svg, .logo-wobble svg, svg-icon[icon="logo"] svg, footer svg-icon svg';
      document.querySelectorAll(logoSelectors).forEach((svg) => {
        const hasOnlySrstiText =
          svg.querySelector("text") &&
          svg.textContent?.trim() === "SRSTI" &&
          !svg.querySelector("path");
        if (hasOnlySrstiText) return;
        svg.setAttribute("viewBox", "0 0 132 36");
        svg.setAttribute("width", "132");
        svg.setAttribute("height", "36");
        svg.innerHTML =
          '<text x="1" y="30" font-family="\'ITC Garamond Condensed\', serif" font-weight="900" font-size="44" textLength="130" lengthAdjust="spacingAndGlyphs" stroke="currentColor" stroke-width="1.2" paint-order="stroke fill" fill="currentColor">SRSTI</text>';
      });

      document.querySelectorAll('[aria-label*="Graza"], [aria-label*="graza"]').forEach((el) => {
        const current = el.getAttribute("aria-label");
        if (current) {
          el.setAttribute("aria-label", current.replace(/graza/gi, "SRSTI"));
        }
      });
    };

    enforceSrsti();
    const interval = setInterval(enforceSrsti, 300);

    // 3. Dispatch vue:appended to mount Vue components on newly added elements
    try {
      document.dispatchEvent(new CustomEvent("vue:appended"));
    } catch (e) {
      // ignore
    }

    // 4. Refresh GSAP ScrollTrigger if present
    const refreshScroll = () => {
      const win = window as any;
      if (win.ScrollTrigger) {
        win.ScrollTrigger.refresh(true);
      }
    };

    const timer1 = setTimeout(() => {
      document.body.classList.remove("overlay-active");
      refreshScroll();
    }, 400);

    const timer2 = setTimeout(refreshScroll, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname, bodyClass, dataPage]);

  return null;
}
