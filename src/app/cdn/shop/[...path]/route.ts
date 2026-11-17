import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await context.params;
  const reqPath = `/cdn/shop/${pathSegments.join("/")}`;
  const lowerPath = reqPath.toLowerCase();
  const root = process.cwd();

  // 1. Check for product image overrides
  let localImageFile: string | null = null;

  if (
    lowerPath.includes("pure_") ||
    lowerPath.includes("_png") ||
    (lowerPath.startsWith("/assets/images/") && lowerPath.endsWith(".png"))
  ) {
    const filename = pathSegments[pathSegments.length - 1];
    const candidate = path.join(root, "public", "assets", "images", filename);
    if (fs.existsSync(candidate)) {
      localImageFile = candidate;
    }
  }

  if (!localImageFile) {
    if (
      (lowerPath.includes("original") || lowerPath.includes("orig")) &&
      (lowerPath.includes("mayo") || lowerPath.includes("squeeze") || lowerPath.includes("jar") || lowerPath.includes("classic_jar"))
    ) {
      localImageFile = path.join(root, "public", "assets", "images", "orig_mayo_srsti.jpg");
    } else if (
      lowerPath.includes("fancy") &&
      (lowerPath.includes("mayo") || lowerPath.includes("squeeze") || lowerPath.includes("jar"))
    ) {
      localImageFile = path.join(root, "public", "assets", "images", "fancy_mayo_srsti.jpg");
    } else if (
      (lowerPath.includes("garlic") || lowerPath.includes("aioli")) &&
      (lowerPath.includes("mayo") || lowerPath.includes("aioli") || lowerPath.includes("squeeze") || lowerPath.includes("jar"))
    ) {
      localImageFile = path.join(root, "public", "assets", "images", "garlic_aioli_srsti.jpg");
    } else if (
      (lowerPath.includes("driz") || lowerPath.includes("drizzle")) &&
      !lowerPath.includes("can") &&
      !lowerPath.includes("glass")
    ) {
      localImageFile = path.join(root, "public", "assets", "images", "driz_srsti.jpg");
    } else if (
      (lowerPath.includes("sizzle") || lowerPath.includes("sizz")) &&
      !lowerPath.includes("can") &&
      !lowerPath.includes("glass") &&
      !lowerPath.includes("box") &&
      !lowerPath.includes("spray")
    ) {
      localImageFile = path.join(root, "public", "assets", "images", "sizzle_srsti.jpg");
    } else if (
      lowerPath.includes("frizzle") ||
      lowerPath.includes("squeeze") ||
      lowerPath.includes("frizzlesqueeze")
    ) {
      localImageFile = path.join(root, "public", "assets", "images", "squeeze_srsti.jpg");
    } else if (
      lowerPath.includes("duo-can") ||
      lowerPath.includes("duo_can") ||
      lowerPath.includes("duocan") ||
      lowerPath.includes("resize12") ||
      lowerPath.includes("resize24")
    ) {
      localImageFile = path.join(root, "public", "assets", "images", "duo_cans_srsti.jpg");
    } else if (
      lowerPath.includes("duo-glass") ||
      lowerPath.includes("duo_glass") ||
      lowerPath.includes("duoglass") ||
      lowerPath.includes("duo-glass_1")
    ) {
      localImageFile = path.join(root, "public", "assets", "images", "duo_glass_srsti.jpg");
    } else if (lowerPath.includes("trio") && !lowerPath.includes("spray")) {
      localImageFile = path.join(root, "public", "assets", "images", "trio_srsti.jpg");
    } else if (
      lowerPath.includes("homepage_feature") ||
      lowerPath.includes("homepage-feature")
    ) {
      localImageFile = path.join(root, "public", "assets", "images", "homepage_feature_srsti.jpg");
    } else if (lowerPath.includes("resize13") || lowerPath.includes("resize15")) {
      localImageFile = path.join(root, "public", "assets", "images", "driz_srsti.jpg");
    } else if (lowerPath.includes("resize14") || lowerPath.includes("resize22")) {
      localImageFile = path.join(root, "public", "assets", "images", "sizzle_srsti.jpg");
    } else if (
      lowerPath.includes("image1_1") ||
      lowerPath.includes("vertical_b4a7a293") ||
      lowerPath.includes("recipe_sear")
    ) {
      localImageFile = path.join(root, "public", "assets", "images", "recipe_sear_srsti.jpg");
    } else if (
      lowerPath.includes("screenshot_2024-09-20") ||
      lowerPath.includes("skillet_4") ||
      lowerPath.includes("soup_x400") ||
      lowerPath.includes("garlic_bread_pasta")
    ) {
      localImageFile = path.join(root, "public", "assets", "images", "sizzle_srsti.jpg");
    } else if (lowerPath.includes("img_9435")) {
      localImageFile = path.join(root, "public", "assets", "images", "garlic_aioli_srsti.jpg");
    } else if (
      lowerPath.includes("marg-tini") ||
      lowerPath.includes("02_2_x400") ||
      lowerPath.includes("02_1_x400") ||
      lowerPath.includes("carciofo")
    ) {
      localImageFile = path.join(root, "public", "assets", "images", "driz_srsti.jpg");
    } else if (
      lowerPath.includes("tavoletti") ||
      lowerPath.includes("ce20c6df") ||
      lowerPath.includes("screen_shot_2024-05-06") ||
      lowerPath.includes("img_8501") ||
      lowerPath.includes("275968465") ||
      lowerPath.includes("round_2_7_1") ||
      lowerPath.includes("284618073") ||
      lowerPath.includes("img_1676") ||
      lowerPath.includes("img_0345") ||
      lowerPath.includes("332723317")
    ) {
      localImageFile = path.join(root, "public", "assets", "images", "homepage_feature_srsti.jpg");
    }
  }

  // If local override exists, serve it directly
  if (localImageFile && fs.existsSync(localImageFile)) {
    const ext = path.extname(localImageFile).toLowerCase();
    const contentType = ext === ".png" ? "image/png" : "image/jpeg";
    const fileBuf = fs.readFileSync(localImageFile);
    return new Response(fileBuf, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  // 2. Otherwise transparently proxy to Shopify CDN
  const query = request.nextUrl.search;
  let shopifyTarget = "";
  const mappedPath = reqPath.replace(/srsti_refill_/g, "graza_refill_");

  if (mappedPath.startsWith("/cdn/shop/videos/")) {
    shopifyTarget = "https://cdn.shopify.com" + mappedPath.replace(/^\/cdn\/shop/, "") + query;
  } else if (mappedPath.startsWith("/cdn/shop/files/")) {
    shopifyTarget = "https://cdn.shopify.com/s/files/1/0550/0003/9638/files/" + mappedPath.replace(/^\/cdn\/shop\/files\//, "") + query;
  } else if (mappedPath.startsWith("/cdn/shop/t/38/assets/")) {
    shopifyTarget = "https://cdn.shopify.com/s/files/1/0550/0003/9638/t/38/assets/" + mappedPath.replace(/^\/cdn\/shop\/t\/38\/assets\//, "") + query;
  } else if (mappedPath.startsWith("/cdn/shop/articles/")) {
    shopifyTarget = "https://cdn.shopify.com/s/files/1/0550/0003/9638/articles/" + mappedPath.replace(/^\/cdn\/shop\/articles\//, "") + query;
  } else {
    shopifyTarget = "https://cdn.shopify.com" + mappedPath.replace(/^\/cdn\/shop/, "") + query;
  }

  try {
    const proxyRes = await fetch(shopifyTarget, {
      headers: {
        Accept: request.headers.get("accept") || "*/*",
      },
    });

    const responseHeaders = new Headers();
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    const cType = proxyRes.headers.get("content-type");
    if (cType) responseHeaders.set("Content-Type", cType);
    const cLength = proxyRes.headers.get("content-length");
    if (cLength) responseHeaders.set("Content-Length", cLength);
    responseHeaders.set("Cache-Control", "public, max-age=86400");

    return new Response(proxyRes.body, {
      status: proxyRes.status,
      headers: responseHeaders,
    });
  } catch (err: any) {
    return new Response("CDN Proxy Error", { status: 502 });
  }
}
