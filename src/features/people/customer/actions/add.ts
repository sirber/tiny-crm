import { Customer, Prisma, prisma } from "@/lib/database";

export async function addCustomerAction(
  userId: number,
  name: string,
  email: string,
  phone: string,
): Promise<Customer> {
  const customerData: Prisma.CustomerCreateInput = {
    name: name,
    email: email,
    phone: phone,
    User: {
      connect: {
        id: userId,
      },
    },
  };

  try {
    return await prisma.customer.create({
      data: customerData,
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    throw new Error("Could not create customer");
  }
}
