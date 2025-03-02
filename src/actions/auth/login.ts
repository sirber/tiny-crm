"use server";

import {PrismaClient} from "@prisma/client";
import {v4 as uuid} from "uuid";
import {redirect} from "next/navigation";
import {createSession} from "@/lib/session";
import {verify} from "@/lib/password";

const prisma = new PrismaClient();

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

    if (null === user) {
        return "user not found";
    }

    if (!(await verify(password, user.password))) {
        return "user not found";
    }

    const sessionToken = uuid();

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            sessionToken: sessionToken,
        },
    });

    await createSession(sessionToken);

    redirect("/");
}
