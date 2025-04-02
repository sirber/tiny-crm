"use server";

import prisma from "@/lib/database";
import { hash } from "@/lib/password";

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<string | void> {
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
}
