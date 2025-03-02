"use server"

import {redirect} from "next/navigation";
import prisma from "@/lib/database";
import {clearToken, getUser} from "@/lib/session";

export default async function Logout() {
    const user = await getUser();
    if (user) {
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                sessionToken: null,
            },
        });
    }

    await clearToken();

    redirect('/');
}