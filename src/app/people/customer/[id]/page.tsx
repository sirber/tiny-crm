import { notFound } from "next/navigation";
import { validate as isUUID } from "uuid";
import { CustomerEdit, CustomerNew } from "@/features/people";

interface PageParams {
  params: Promise<{ id: string }>;
}

export default async function CustomerPage({ params }: PageParams) {
  const { id } = await params;

  if (id === "new") {
    return <CustomerNew />;
  }

  if (!isUUID(id)) {
    notFound();
  }

  // TODO: Fetch customer data using the id

  return <CustomerEdit />;
}
