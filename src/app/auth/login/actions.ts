"use server";

import {PrismaClient} from "@prisma/client";
import {redirect} from "next/navigation";
import {createSession, TokenInterface} from "@/lib/session";
import {verify} from "@/lib/password";
import jwt from "jsonwebtoken"; // JWT library

const prisma = new PrismaClient();

export async function login(
    state: string | null,
    formData: FormData,
): Promise<string> {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Response("JWT_SECRET is not set.", {status: 500});
    }

    if (!email || !password) {
        throw new Response("Email and password are required.", {status: 400});
    }

    const user = await prisma.user.findFirst({
        where: {
            email: email,
            deletedAt: null,
        },
    });

    if (null === user) {
        return "user not found";
    }

    // Verify password
    if (!(await verify(password, user.password))) {
        return "user not found";
    }

    const payload: TokenInterface = {
        id: user.id,
        email: user.email,
        role: user.role,
    }

    // Generate JWT token
    const sessionToken = jwt.sign(
        payload,
        secret,
        {expiresIn: "7d"} // Token expiration (7 days, you can adjust as needed)
    );

    await createSession(sessionToken);

    // Send the JWT token in a Set-Cookie header
    redirect("/");
}
