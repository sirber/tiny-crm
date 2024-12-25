"use server";

import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import argon2 from "argon2";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function login(
  previousState: string | null,
  formData: FormData
): Promise<string> {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    throw new Response("Email and password are required.", { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (null === user) {
    return "user not found";
  }

  if (!argon2.verify(user.password, password)) {
    return "user not found";
  }

  const sessionToken = uuid();

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      sessionToken: sessionToken,
    },
  });

  await createSession(sessionToken);

  redirect("/");
}

async function createSession(sessionToken: string) {
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

export const check = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return false;
  }

  const user = await prisma.user.findFirst({
    where: {
      sessionToken: {
        equals: token,
      },
    },
  });

  return !!user;
};
