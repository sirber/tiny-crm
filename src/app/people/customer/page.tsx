import { getUser } from "@/lib/session";
import { CustomerList } from "@/features/people/components/CustomerList";
import prisma from "@/lib/database";
import { formatDate } from "@/lib/date";

export default async function Customer() {
  const user = await getUser();
  if (!user) {
    return null;
  }

  const rows = await prisma.customer.findMany({
    where: {
      userId: user.id,
      type: "customer",
      deletedAt: null,
    },
  });

  const displayRows = rows.map((row) => ({
    ...row,
    createdAt: formatDate(new Date(row.createdAt)),
    updatedAt: formatDate(new Date(row.updatedAt)),
  }));

  return <CustomerList rows={displayRows} />;
}
