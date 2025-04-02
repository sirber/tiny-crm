"use server";

import { clearToken } from "@/lib/session";

export async function logoutAction(): Promise<void> {
  return clearToken();
}
