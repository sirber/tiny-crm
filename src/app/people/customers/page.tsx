import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/session";
import { CustomerList } from "@/features/people/CustomerList";

const prisma = new PrismaClient();

export default async function Customer() {
  const user = await getUser();
  if (!user) {
    return null;
  }

  const rows = await prisma.customer.findMany({
    where: {
      userId: user?.id,
      type: "customer",
    },
  });

  return <CustomerList rows={rows} />;
}
