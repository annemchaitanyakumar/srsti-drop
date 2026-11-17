import { NextResponse } from "next/server";
import { mockCart, corsHeaders } from "@/lib/cart";

export async function GET() {
  return NextResponse.json(mockCart, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST() {
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
