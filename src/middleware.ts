import {NextRequest, NextResponse} from "next/server";
import {verify} from "jsonwebtoken";
import {cookies} from "next/headers";

export async function middleware(req: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const secret: string | undefined = process.env.JWT_SECRET;

    if (!secret) {
        return NextResponse.error();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
        verify(token, secret);
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
}

export const config = {
    matcher: "/((?!_next|auth/|favicon.ico).*)"
};
