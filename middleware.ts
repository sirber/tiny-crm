import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function middleware(req: Request) {
  // Skip unprotected routes
  if (req.url.includes("/_next/")) {
    return NextResponse.next();
  }

  if (req.url.includes("/auth/")) {
    return NextResponse.next();
  }

  // CHeck User Session
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  if (sessionToken) {
    const user = prisma.user.findFirst({
      where: {
        sessionToken: {
          equals: sessionToken,
        },
        deletedAt: {
          not: null,
        },
      },
    });

    if (null !== user) {
      return NextResponse.next();
    }
  }

  // Redirect to Login
  const loginUrl = new URL("/auth/login", req.url);
  return NextResponse.redirect(loginUrl);
}
