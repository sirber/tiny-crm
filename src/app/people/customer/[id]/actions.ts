"use server";

import { addCustomerAction } from "@/features/people/customer/actions/add";
import { editCustomerAction } from "@/features/people/customer/actions/edit";
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

export async function editCustomer(
  state: string | null,
  formData: FormData,
): Promise<string> {
  const user = await getUser();

  const customerId = formData.get("customerId")?.toString();
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const phone = formData.get("phone")?.toString();

  if (!customerId) {
    return "CustomerId is required";
  }

  if (!name) {
    return "Name is required";
  }

  if (!email) {
    return "Email is required";
  }

  if (!phone) {
    return "Phone is required";
  }

  try {
    const customer: Customer = await editCustomerAction(
      customerId,
      user.id,
      name,
      email,
      phone,
    );

    redirect("/customer/" + customer.id);
  } catch (error: unknown) {
    console.error("Error editing customer:", error);
    return "Could not edit the customer";
  }
}
