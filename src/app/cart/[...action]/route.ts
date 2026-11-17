import { NextRequest, NextResponse } from "next/server";
import { mockCart, corsHeaders } from "@/lib/cart";

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.includes("/cart/add")) {
    return NextResponse.json(mockCart.items[0], {
      status: 200,
      headers: corsHeaders,
    });
  }
  return NextResponse.json(mockCart, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.includes("/cart/add")) {
    return NextResponse.json(mockCart.items[0], {
      status: 200,
      headers: corsHeaders,
    });
  }
  return NextResponse.json(mockCart, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}
