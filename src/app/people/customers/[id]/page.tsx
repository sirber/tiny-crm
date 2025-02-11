import { notFound } from "next/navigation";
import { validate as isUUID } from "uuid";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CustomerEdit({ params }: PageProps) {
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
