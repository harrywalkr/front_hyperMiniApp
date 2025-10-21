import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { device } = userAgent(request);


  const viewport = device.type || "desktop";

  url.searchParams.set("viewport", viewport);

  const response = NextResponse.rewrite(url);

  response.headers.set("x-viewport", viewport);

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
