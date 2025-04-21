import { PeopleType } from "@/schemas";
import { getPeopleModel } from "@/lib/models";

export async function addCustomerAction(
  userId: string,
  name: string,
  email: string,
  phone: string,
) {
  try {
    const People = await getPeopleModel();

    const customer = new People({
      userId,
      name,
      email,
      phone,
      type: PeopleType.customer,
    });

    await customer.save();
    return customer;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw new Error("Could not create customer");
  }
}
