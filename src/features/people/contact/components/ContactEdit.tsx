"use client";

import { Card, CardContent, CardHeader } from "@mui/material";
import { getContactFields } from "../helpers/fields";
import { FormComponent } from "@/components/FormComponent";
import { editContact } from "@/app/people/contact/[id]/actions";
import { useActionState } from "react";
import { IPeopleDocument, PeopleType } from "@/schemas/People";
import { Types } from "mongoose";
import { ExtraProps } from "@/features/extra";

type Contact = IPeopleDocument & {
  type: PeopleType.contact;
  extras?: ExtraProps;
  _id: Types.ObjectId;
};

export function ContactEdit({ contact }: { contact: Contact }) {
  const [state, action] = useActionState<string | null, FormData>(
    async (_, formData) => {
      const result = await editContact(formData);
      return result || null;
    },
    null,
  );
  const fields = getContactFields(contact);

  return (
    <Card>
      <CardHeader title="Edit Contact" />
      <CardContent>
        <form action={action}>
          <input
            type="hidden"
            name="id"
            value={contact._id.toString()}
          />
          <input
            type="hidden"
            name="extras"
            value={JSON.stringify(contact.extras || {})}
          />
          <FormComponent fields={fields} />
          {state && <div>{state}</div>}
        </form>
      </CardContent>
    </Card>
  );
}
