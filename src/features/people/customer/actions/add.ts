import { Customer, Prisma } from "@prisma/client";
import prisma from "@/lib/database";

export async function addCustomerAction(
  userId: string,
  name: string,
  email: string,
  phone: string,
): Promise<Customer> {
  const customer: Prisma.CustomerCreateInput = {
    name: name,
    email: email,
    phone: phone,
    type: "customer",
    User: {
      connect: {
        id: userId,
      },
    },
  };

  return prisma.customer.create({
    data: customer,
  });
}
