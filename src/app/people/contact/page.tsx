import { getUser } from "@/lib/session";
import { ContactList } from "@/features/people/contact/components/ContactList";
import { IPeopleDocument, PeopleType } from "@/schemas/People";
import { Types } from "mongoose";
import { getPeopleModel } from "@/lib/models";

export default async function Contact() {
  const user = await getUser();
  if (!user) {
    return null;
  }

  const People = await getPeopleModel();
  const rows = await People.find({
    userId: user.id,
    deletedAt: null,
    type: PeopleType.contact,
  });

  const displayRows = rows.map((row: IPeopleDocument) => ({
    id: (row._id as Types.ObjectId).toString(),
    name: row.name,
    email: row.email,
    phone: row.phone,
    type: row.type,
  }));

  return <ContactList rows={displayRows} />;
}
