import { notFound } from "next/navigation";
import { CustomerEdit, CustomerAdd } from "@/features/people";
import { getUser } from "@/lib/session";
import { getPeopleModel } from "@/lib/models";
import { PeopleType } from "@/schemas";

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

  try {
    const user = await getUser();
    const People = await getPeopleModel();

    const customer = await People.findOne({
      _id: id,
      userId: user.id,
      type: PeopleType.customer,
    }).lean();

    if (!customer) {
      return notFound();
    }

    return (
      <CustomerEdit customer={{ ...customer, id: customer._id.toString() }} />
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
