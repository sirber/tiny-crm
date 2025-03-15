"use server";

import { cookies } from "next/headers";
import prisma from "./database";
import { User } from "@prisma/client";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

export interface TokenInterface {
  id: string;
  email: string;
  role: string;
}

export async function createSession(sessionToken: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const cookieStore = await cookies();

  cookieStore.set("token", sessionToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getUser(): Promise<User | null> {
  const payload = await getToken();
  if (!payload) {
    return null;
  }

  return prisma.user.findFirst({
    where: {
      id: {
        equals: payload.id,
      },
    },
  });
}

export async function getToken(): Promise<TokenInterface | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify<TokenInterface>(token, secret);

    return payload;
  } catch {
    return null;
  }
}

export async function validateToken(): Promise<boolean> {
  const token = await getToken();

  return !!token;
}

export async function clearToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}
