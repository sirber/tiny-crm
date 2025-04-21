import { People, PeopleType } from "@/schemas";
import connectDB from "@/lib/database";

export async function addCustomerAction(
  userId: string,
  name: string,
  email: string,
  phone: string,
) {
  await connectDB();

  try {
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
