"use server";

import { redirect } from "next/navigation";
import { clearToken } from "@/lib/session";

export async function logoutUser() {
  await clearToken();

  redirect("/");
}
