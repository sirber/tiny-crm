import { notFound } from "next/navigation";
import { validate as isUUID } from "uuid";
import { ContactEdit } from "@/features/people/contact/components/ContactEdit";
import { ContactAdd } from "@/features/people/contact/components/ContactAdd";
import { IPeopleDocument, PeopleType } from "@/schemas/People";
import { Types } from "mongoose";
import { getUser } from "@/lib/session";
import { getPeopleModel } from "@/lib/models";
import { ExtraProps } from "@/features/extra";

type Contact = IPeopleDocument & {
  type: PeopleType.contact;
  extras?: ExtraProps;
  _id: Types.ObjectId;
};

interface PageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function ContactPage({ params }: PageParams) {
  const { id } = await params;

  if (id === "new") {
    return <ContactAdd />;
  }

  if (!isUUID(id)) {
    return notFound();
  }

  try {
    const user = await getUser();
    const People = await getPeopleModel();
    const contact = await People.findOne({
      _id: new Types.ObjectId(id),
      userId: user.id,
      type: PeopleType.contact,
    });

    if (!contact) {
      return notFound();
    }

    return <ContactEdit contact={contact as Contact} />;
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
