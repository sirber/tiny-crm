import { getRole } from "@/lib/session";
import { forbidden } from "next/navigation";

export default async function AdminPage() {
  const role = await getRole();
  if ("admin" !== role) {
    return forbidden();
  }

  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  );
}
