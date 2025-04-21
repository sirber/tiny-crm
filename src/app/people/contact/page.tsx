import { getUser } from "@/lib/session";
import { ContactList } from "@/features/people/contact/components/ContactList";
import { prisma } from "@/lib/database";
import { formatDate } from "@/lib/date";

export default async function Contact() {
  const user = await getUser();
  if (!user) {
    return null;
  }

  const rows = await prisma.contact.findMany({
    where: {
      userId: user.id,
      deletedAt: null,
    },
  });

  const displayRows = rows.map((row) => ({
    ...row,
    createdAt: formatDate(new Date(row.createdAt)),
    updatedAt: formatDate(new Date(row.updatedAt)),
  }));

  return <ContactList rows={displayRows} />;
}
