import List from "@/components/List";
import { GridColDef } from "@mui/x-data-grid";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/session";

const prisma = new PrismaClient();

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
];

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

  return <List title="Customers" columns={columns} rows={rows}></List>;
}
