import { FormField } from "@/interfaces/FormField";
import { IPeopleDocument, PeopleType } from "@/schemas/People";

type Contact = IPeopleDocument & { type: PeopleType.contact };

export function getContactFields(contact?: Contact): FormField[] {
  return [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      value: contact?.name || "",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      value: contact?.email || "",
    },
    {
      name: "phone",
      label: "Phone",
      type: "tel",
      required: false,
      value: contact?.phone || "",
    },
  ];
}
