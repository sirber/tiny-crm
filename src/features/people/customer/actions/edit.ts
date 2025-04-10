import { Customer, Prisma, prisma } from "@/lib/database";

export async function editCustomerAction(
  customerId: string,
  userId: string,
  name: string,
  email: string,
  phone: string,
): Promise<Customer> {
  const customerData: Prisma.CustomerUpdateInput = {
    name,
    email,
    phone,
  };

  try {
    return await prisma.customer.update({
      where: {
        id: customerId,
        userId: userId,
      },
      data: customerData,
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    throw new Error("Could not update customer");
  }
}
