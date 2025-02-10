"use server";

import { cookies } from "next/headers";
import prisma from "./database";

export async function createSession(sessionToken: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  cookieStore.set("session", sessionToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getUser() {
  const token = await getToken();
  if (!token) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: {
      sessionToken: {
        equals: token,
      },
    },
  });

  return user;
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  return token || null;
}

export async function check(): Promise<boolean> {
  const user = await getUser();

  return !!user;
}
