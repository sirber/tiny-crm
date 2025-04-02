import { notFound } from "next/navigation";
import { validate as isUUID } from "uuid";
import { CustomerEdit, CustomerAdd } from "@/features/people";
import { getUser } from "@/lib/session";
import prisma from "@/lib/database";

interface PageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function CustomerPage({ params }: PageParams) {
  const { id } = await params;

  if (id === "new") {
    return <CustomerAdd />;
  }

  if (!isUUID(id)) {
    return notFound();
  }

  try {
    const user = await getUser();
    const customer = await prisma.customer.findFirstOrThrow({
      where: {
        id: id,
        userId: user.id,
      },
    });

    return <CustomerEdit customer={customer} />;
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
