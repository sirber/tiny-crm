import { check as checkSession } from "@/features/auth/actions";

export async function GET(): Promise<Response> {
  const isSessionValid = await checkSession();

  if (!isSessionValid) {
    return new Response(
      JSON.stringify({ status: "error", message: "Session not found" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response(
    JSON.stringify({ status: "success", message: "Session is valid" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
