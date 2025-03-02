"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "./actions";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        logoutUser().then(() => {
            router.push("/");
        });
    }, [router]);

    return <p>Logging out...</p>;
}
