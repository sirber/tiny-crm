import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/lib/session";

export async function middleware(req: NextRequest) {
  const isValid = await validateToken();
  if (isValid) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/auth/login", req.url));
}

export const config = {
  matcher: "/((?!_next|auth|favicon.ico).*)",
};
