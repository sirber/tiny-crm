import { FormField } from "@/interfaces/FormField";

export const fields: FormField[] = [
  {
    name: "name",
    label: "Name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    required: true,
    pattern: "^\\+?[0-9]{7,15}$",
  },
];
