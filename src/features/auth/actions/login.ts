"use server";

import { verify } from "@/lib/password";
import { createSession, TokenInterface } from "@/lib/session";
import { getUserModel } from "@/lib/models";
import { JWTPayload, SignJWT } from "jose";
import { IUserDocument } from "@/schemas/User";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set.");
}

export async function loginAction(
  email: string,
  password: string,
): Promise<string | void> {
  const User = await getUserModel();
  const user = (await User.findOne({
    email: email,
    deletedAt: null,
  })) as IUserDocument | null;

  if (!user || !(await verify(password, user.password))) {
    return "user not found";
  }

  const payload: TokenInterface & JWTPayload = {
    id: user._id.toString(),
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
