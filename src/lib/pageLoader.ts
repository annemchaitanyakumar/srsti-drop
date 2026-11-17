import fs from "fs";
import path from "path";

export interface PageData {
  title: string;
  bodyClass: string;
  dataPage: string;
  bodyContent: string;
}

export function loadPage(
  category: "home" | "products" | "collections" | "pages" | "blogs",
  slug?: string
): PageData {
  const contentDir = path.join(process.cwd(), "content");
  let targetFile = "";

  if (category === "home") {
    const candidate = path.join(contentDir, "home.html");
    if (fs.existsSync(/*turbopackIgnore: true*/ candidate)) {
      targetFile = candidate;
    } else {
      const fallback = path.join(process.cwd(), "index.html");
      if (fs.existsSync(/*turbopackIgnore: true*/ fallback)) {
        targetFile = fallback;
      }
    }
  } else if (slug) {
    const specificDir = path.join(contentDir, category, slug, "index.html");
    const specificFile = path.join(contentDir, category, `${slug}.html`);

    if (fs.existsSync(/*turbopackIgnore: true*/ specificDir)) {
      targetFile = specificDir;
    } else if (fs.existsSync(/*turbopackIgnore: true*/ specificFile)) {
      targetFile = specificFile;
    } else {
      // Fallbacks
      if (category === "products") {
        targetFile = path.join(contentDir, "products", "sizzle-drizzle-combo-pack", "index.html");
      } else if (category === "collections") {
        targetFile = path.join(contentDir, "collections", "all", "index.html");
      } else if (category === "pages") {
        targetFile = path.join(contentDir, "pages", "about-us", "index.html");
      } else if (category === "blogs") {
        targetFile = path.join(contentDir, "blogs", "recipes", "index.html");
      }
    }
  }

  if (!targetFile || !fs.existsSync(/*turbopackIgnore: true*/ targetFile)) {
    return {
      title: "SRSTI",
      bodyClass: "template-index bg-background text-text",
      dataPage: "",
      bodyContent: "<div class='p-20 text-center'>Page not found</div>",
    };
  }

  const html = fs.readFileSync(/*turbopackIgnore: true*/ targetFile, "utf8");

  // Extract title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  let title = titleMatch ? titleMatch[1].trim() : "SRSTI";
  title = title.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/\n\s*/g, " ");

  // Extract body attributes
  const bodyTagMatch = html.match(/<body\b([^>]*)>/i);
  const bodyAttrsStr = bodyTagMatch ? bodyTagMatch[1] : "";

  const classMatch = bodyAttrsStr.match(/class="([^"]*)"/i);
  const bodyClass = classMatch ? classMatch[1] : "overlay-active transition--opacity bg-background text-text font-body";

  const dataPageMatch = bodyAttrsStr.match(/data-page="([^"]*)"/i);
  const dataPage = dataPageMatch ? dataPageMatch[1] : "";

  // Extract inner body content
  let bodyContent = html;
  if (bodyTagMatch) {
    const bodyStartIdx = html.indexOf(bodyTagMatch[0]) + bodyTagMatch[0].length;
    const bodyEndIdx = html.lastIndexOf("</body>");
    if (bodyStartIdx !== -1 && bodyEndIdx !== -1) {
      bodyContent = html.substring(bodyStartIdx, bodyEndIdx);
    }
  }

  return {
    title,
    bodyClass,
    dataPage,
    bodyContent,
  };
}
