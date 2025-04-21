import { FormField } from "@/interfaces/FormField";

export function getContactFields(contact?: any): FormField[] {
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