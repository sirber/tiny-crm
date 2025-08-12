import { NextRequest, NextResponse } from "next/server";
import { clearToken, getRole, validateToken } from "@/lib/session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isValid = await validateToken();

  if (!isValid) {
    await clearToken();
    
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (pathname.startsWith("/admin")) {
    const role = await getRole();
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next|auth|favicon.ico).*)",
};
