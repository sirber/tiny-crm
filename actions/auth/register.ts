"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { hash } from "@/lib/password";

const prisma = new PrismaClient();

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
