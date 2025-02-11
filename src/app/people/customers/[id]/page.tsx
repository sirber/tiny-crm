import { notFound } from "next/navigation";
import { validate as isUUID } from "uuid";

export default async function CustomerEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") {
    return <>New</>;
  }

  if (!isUUID(id)) {
    notFound();
  }

  // TODO: Fetch customer data using the id

  return <>Page for ID: {id}</>;
}
