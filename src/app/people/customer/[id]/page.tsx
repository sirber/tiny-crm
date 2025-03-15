import { notFound } from "next/navigation";
import { validate as isUUID } from "uuid";
import { CustomerEdit, CustomerNew } from "@/features/people";
import { getUser } from "@/lib/session";

interface PageParams {
  params: Promise<{ id: string }>;
}

export default async function CustomerPage({ params }: PageParams) {
  const { id } = await params;
  const user = await getUser();

  if (id === "new") {
    return <CustomerNew userId={user?.id} />;
  }

  if (!isUUID(id)) {
    notFound();
  }

  // TODO: Fetch customer data using the id

  return <CustomerEdit />;
}
