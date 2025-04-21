import { notFound } from "next/navigation";
import { validate as isUUID } from "uuid";
import { ContactEdit, ContactAdd } from "@/features/people/contact/components";
import { getUser } from "@/lib/session";
import { prisma } from "@/lib/database";

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
    const contact = await prisma.contact.findFirstOrThrow({
      where: {
        id: id,
        userId: user.id,
      },
    });

    return <ContactEdit contact={contact} />;
  } catch (error) {
    console.error(error);
    return notFound();
  }
} 