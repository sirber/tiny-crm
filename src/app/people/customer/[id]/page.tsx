import { notFound } from "next/navigation";
import { validate as isUUID } from "uuid";
import { CustomerEdit, CustomerAdd } from "@/features/people";
import { getUser } from "@/lib/session";
import { People, PeopleType } from "@/schemas";
import connectDB from "@/lib/database";

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
    await connectDB();

    const customer = await People.findOne({
      _id: id,
      userId: user.id,
      type: PeopleType.customer,
    }).lean();

    if (!customer) {
      return notFound();
    }

    return <CustomerEdit customer={{ ...customer, id: customer._id.toString() }} />;
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
