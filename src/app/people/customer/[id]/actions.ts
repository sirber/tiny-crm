"use server";

import { addCustomerAction } from "@/features/people/customer/actions/add";
import { editCustomerAction } from "@/features/people/customer/actions/edit";
import { getUser } from "@/lib/session";
import { type Customer } from "@/lib/database";
import { redirect } from "next/navigation";

export async function addCustomer(
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

  let id;
  try {
    const customer: Customer = await addCustomerAction(
      user.id,
      name,
      email,
      phone,
    );

    id = customer.id;
  } catch (error: unknown) {
    console.log(error);
    return "could not add a new customer";
  }

  redirect("/people/customer/" + id);
}

export async function editCustomer(
  state: string | null,
  formData: FormData,
): Promise<string> {
  const user = await getUser();

  const customerId = formData.get("id")?.toString();
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

  let id;
  try {
    const customer: Customer = await editCustomerAction(
      parseInt(customerId),
      user.id,
      name,
      email,
      phone,
    );

    id = customer.id;
  } catch (error: unknown) {
    console.log("Error editing customer:", error);
    return "Could not edit the customer";
  }

  redirect("/people/customer/" + id);
}
