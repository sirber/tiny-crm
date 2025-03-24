import { notFound } from "next/navigation";
import { validate as isUUID } from "uuid";
import { CustomerEdit, CustomerNew } from "@/features/people";
import { getUser } from "@/lib/session";
import prisma from "@/lib/database";

interface PageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function CustomerPage({ params }: PageParams) {
  const { id } = await params;
  const user = await getUser();

  if (id === "new") {
    return <CustomerNew userId={user.id} />;
  }

  if (!isUUID(id)) {
    return notFound();
  }

  const customer = await prisma.customer.findFirstOrThrow({
    where: {
      id: id,
      userId: user.id,
    },
  });

  return (
    <CustomerEdit
      userId={user.id}
      customer={customer}
    />
  );
}
