import { getUser } from "@/lib/session";
import { CustomerList } from "@/features/people";
import { PeopleType } from "@/schemas";
import { formatDate } from "@/lib/date";
import { getPeopleModel } from "@/lib/models";

export default async function Customer() {
  const user = await getUser();
  if (!user) {
    return null;
  }

  const People = await getPeopleModel();

  const rows = await People.find({
    userId: user.id,
    type: PeopleType.customer,
    deletedAt: null,
  }).lean();

  const displayRows = rows.map((row) => ({
    ...row,
    id: row._id.toString(),
    createdAt: formatDate(new Date(row.createdAt)),
    updatedAt: formatDate(new Date(row.updatedAt)),
  }));

  return <CustomerList rows={displayRows} />;
}
