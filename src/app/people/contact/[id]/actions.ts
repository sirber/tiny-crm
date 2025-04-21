"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/database";
import { getUser } from "@/lib/session";
import { ExtraProps } from "@/features/extra";

export async function addContact(formData: FormData) {
  const user = await getUser();
  if (!user) {
    return redirect("/auth/login");
  }

  const extras = JSON.parse(formData.get("extras") as string) as ExtraProps;

  try {
    await prisma.contact.create({
      data: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        userId: user.id,
        extras: extras,
      },
    });

    revalidatePath("/people/contact");
    redirect("/people/contact");
  } catch (error) {
    console.error(error);
    return <div>Error creating contact</div>;
  }
}

export async function editContact(formData: FormData) {
  const user = await getUser();
  if (!user) {
    return redirect("/auth/login");
  }

  const id = formData.get("id") as string;
  const extras = JSON.parse(formData.get("extras") as string) as ExtraProps;

  try {
    await prisma.contact.update({
      where: {
        id: id,
        userId: user.id,
      },
      data: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        extras: extras,
      },
    });

    revalidatePath("/people/contact");
    redirect("/people/contact");
  } catch (error) {
    console.error(error);
    return <div>Error updating contact</div>;
  }
} 