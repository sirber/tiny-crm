"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/auth/logout/actions";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    logoutUser();
  }, [router]);

  return <p>Logging out...</p>;
}
