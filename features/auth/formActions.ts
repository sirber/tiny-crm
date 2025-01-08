"use server";

import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import argon2 from "argon2";
import { redirect } from "next/navigation";
import { createSession } from "./session";
import { hash } from "./password";

const prisma = new PrismaClient();

export async function login(
  state: string | null,
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

export async function register(
  state: string | null,
  formData: FormData
): Promise<string> {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  // Validation
  if (!name) {
    return "name must not be empty";
  }

  if (!email) {
    return "email must not be empty";
  }

  if (!password || !confirmPassword) {
    return "password must not be empty";
  }

  if (password != confirmPassword) {
    return "password does not match";
  }

  // Create new user
  const hashedPassword = await hash(password);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch {
    return "could not create user";
  }

  // TODO: banner of some sort

  redirect("/");
}
