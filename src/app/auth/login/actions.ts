"use server";

import { redirect } from "next/navigation";
import { loginAction } from "@/features/auth/actions/login";

export async function loginUser(
  state: string | null,
  formData: FormData,
): Promise<string> {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return "Email and password are required";
  }

  const error = await loginAction(email, password);
  if (error) {
    return error;
  }

  // Redirect after login
  redirect("/");
}
