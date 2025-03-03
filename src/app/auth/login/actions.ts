"use server";

import {PrismaClient} from "@prisma/client";
import {redirect} from "next/navigation";
import {createSession, TokenInterface} from "@/lib/session";
import {verify} from "@/lib/password";
import {JWTPayload, SignJWT} from "jose"; // ✅ Edge-compatible JWT generation

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set.");
}

export async function login(
    state: string | null,
    formData: FormData,
): Promise<string> {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        throw new Response("Email and password are required.", {status: 400});
    }

    const user = await prisma.user.findFirst({
        where: {
            email: email,
            deletedAt: null,
        },
    });

    if (!user || !(await verify(password, user.password))) {
        return "user not found";
    }

    const payload: TokenInterface & JWTPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };

    // Generate JWT token using jose
    const secret = new TextEncoder().encode(JWT_SECRET);
    const sessionToken = await new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setExpirationTime("7d")
        .sign(secret);

    await createSession(sessionToken);

    // Redirect after login
    redirect("/");
}
