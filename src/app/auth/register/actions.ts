"use server";

import { redirect } from "next/navigation";
import { isRegisterEnabled } from "@/config";
import { register } from "@/features/auth/actions/register";

export async function registerUser(
  state: string | null,
  formData: FormData,
): Promise<string> {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  // Security
  if (!isRegisterEnabled()) {
    throw new Response("Registration is not permitted at the moment.", {
      status: 403,
    });
  }

  // Validation
  if (!name) {
    throw new Response("Name is required.", {
      status: 400,
    });
  }

  if (!email) {
    throw new Response("Email is required.", {
      status: 400,
    });
  }

  if (!password || !confirmPassword) {
    throw new Response("Password is required.", {
      status: 400,
    });
  }

  if (password != confirmPassword) {
    throw new Response("Password does not match confirmation.", {
      status: 400,
    });
  }

  // Create new user
  const error = await register(name, email, password);
  if (error) {
    return error;
  }

  redirect("/");
}
