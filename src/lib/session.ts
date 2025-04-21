"use server";

import { cookies } from "next/headers";
import { IUserDocument } from "@/schemas/User";
import { jwtVerify } from "jose";
import { getUserModel } from "./models";
import mongoose from "mongoose";

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

export async function getUser(): Promise<IUserDocument> {
  const payload = await getToken();
  if (!payload) {
    throw new Error("No token found");
  }

  const User = await getUserModel();
  const user = await User.findOne({
    _id: new mongoose.Types.ObjectId(payload.id),
    deletedAt: null,
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function getRole(): Promise<string> {
  const payload = await getToken();

  if (!payload) {
    throw new Error("No token found");
  }

  return payload.role;
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
