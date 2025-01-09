"use client";

import { isRegisterEnabled } from "@/config";
import { Register } from "@/features/auth/Register";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PageRegister() {
  const router = useRouter();

  useEffect(() => {
    if (!isRegisterEnabled()) {
      router.replace("/");
    }
  }, [router]);

  return <Register />;
}
