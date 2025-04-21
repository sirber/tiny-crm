"use server";

import { getUserModel } from "@/lib/models";
import { hash } from "@/lib/password";

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<string | void> {
  const hashedPassword = await hash(password);
  const User = await getUserModel();

  try {
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch {
    return "could not create user";
  }
}
