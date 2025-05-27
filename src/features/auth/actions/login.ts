"use server";

import { verify } from "@/lib/password";
import { createSession, TokenInterface } from "@/lib/session";
import { prisma } from "@/lib/database";
import { JWTPayload, SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set.");
}

export async function loginAction(
  email: string,
  password: string,
): Promise<string | void> {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
      deletedAt: null,
    },
  });

  if (!user || !(await verify(password, user.password))) {
    return "user not found";
  }

  const payload: TokenInterface & JWTPayload = {
    id: user.id.toString(),
    email: user.email,
    role: user.role,
  };

  // Generate JWT token using jose
  const secret = new TextEncoder().encode(JWT_SECRET);
  const sessionToken = await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime("7d")
    .sign(secret);

  return createSession(sessionToken);
}
