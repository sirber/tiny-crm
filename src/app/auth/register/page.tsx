"use client";

import { isRegisterEnabled } from "@/config";
import { RegisterForm } from "@/features/auth/RegisterForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Register() {
  const router = useRouter();

  useEffect(() => {
    if (!isRegisterEnabled()) {
      router.replace("/");
    }
  }, [router]);

  return <RegisterForm />;
}
