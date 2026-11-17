import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const { name, dataUrl } = await request.json();
    if (!name || !dataUrl) {
      return NextResponse.json({ error: "Missing name or dataUrl" }, { status: 400 });
    }

    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "");
    const buf = Buffer.from(base64Data, "base64");

    const safeName = path.basename(name);
    const pubDir = path.join(process.cwd(), "public", "assets", "images");
    if (!fs.existsSync(pubDir)) {
      fs.mkdirSync(pubDir, { recursive: true });
    }
    fs.writeFileSync(path.join(pubDir, safeName), buf);

    return NextResponse.json({ success: true, size: buf.length }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
