import { People, PeopleType } from "@/schemas";
import connectDB from "@/lib/database";

export async function editCustomerAction(
  customerId: string,
  userId: string,
  name: string,
  email: string,
  phone: string,
) {
  await connectDB();

  try {
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
