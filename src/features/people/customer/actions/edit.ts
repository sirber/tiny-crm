import { IPeopleDocument, PeopleType } from "@/schemas";
import { getPeopleModel } from "@/lib/models";

export async function editCustomerAction(
  customerId: string,
  userId: string,
  name: string,
  email: string,
  phone: string,
): Promise<IPeopleDocument | null> {
  try {
    const People = await getPeopleModel();
    const customer = await People.findOneAndUpdate(
      {
        _id: customerId,
        userId: userId,
        type: PeopleType.customer,
      },
      {
        name,
        email,
        phone,
      },
      { new: true },
    );

    if (!customer) {
      throw new Error("Customer not found");
    }

    return customer;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw new Error("Could not update customer");
  }
}
