"use server";

import { addCustomerAction } from "@/features/people/customer/actions/add";
import { getUser } from "@/lib/session";
import { Customer } from "@prisma/client";
import { redirect } from "next/navigation";

export async function newCustomer(
  state: string | null,
  formData: FormData,
): Promise<string> {
  const user = await getUser();

  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const phone = formData.get("phone")?.toString();

  if (!name) {
    return "name is required";
  }

  if (!email) {
    return "email is required";
  }

  if (!phone) {
    return "phone is required";
  }

  try {
    const customer: Customer = await addCustomerAction(
      user.id,
      name,
      email,
      phone,
    );

    redirect("/customer/" + customer.id);
  } catch (error: unknown) {
    console.error(error);
    return "could not add a new customer";
  }
}
