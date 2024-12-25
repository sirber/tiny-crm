import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

function getUnauthorizedResponse() {
  return new Response(
    JSON.stringify({ status: "error", message: "Session not found" }),
    {
      status: 401,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function GET(): Promise<Response> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return getUnauthorizedResponse();
  }

  const user = prisma.user.findFirst({
    where: {
      sessionToken: {
        equals: token,
      },
    },
  });

  if (!!user) {
    return new Response(
      JSON.stringify({ status: "success", message: "Session is valid" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return getUnauthorizedResponse();
}
