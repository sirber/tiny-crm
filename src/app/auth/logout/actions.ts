"use server";

import { redirect } from "next/navigation";
import { logoutAction } from "@/features/auth/actions/logout";

export async function logoutUser() {
  await logoutAction();

  redirect("/");
}
