"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/session";
import { ExtraProps } from "@/features/extra";
import { getPeopleModel } from "@/lib/models";
import mongoose from "mongoose";

export async function addContact(formData: FormData): Promise<string | void> {
  const user = await getUser();
  if (!user) {
    return redirect("/auth/login");
  }

  const extras = JSON.parse(formData.get("extras") as string) as ExtraProps;
  const People = await getPeopleModel();

  try {
    await People.create({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      userId: new mongoose.Types.ObjectId(user._id.toString()),
      extras: extras,
    });

    revalidatePath("/people/contact");
    redirect("/people/contact");
  } catch (error) {
    console.error(error);
    return "Error creating contact";
  }
}

export async function editContact(formData: FormData): Promise<string | void> {
  const user = await getUser();
  if (!user) {
    return redirect("/auth/login");
  }

  const id = formData.get("id") as string;
  const extras = JSON.parse(formData.get("extras") as string) as ExtraProps;
  const People = await getPeopleModel();

  try {
    await People.updateOne(
      {
        _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(user._id.toString()),
      },
      {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        extras: extras,
      },
    );

    revalidatePath("/people/contact");
    redirect("/people/contact");
  } catch (error) {
    console.error(error);
    return "Error updating contact";
  }
}
