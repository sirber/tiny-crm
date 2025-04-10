import { FormField } from "@/interfaces/FormField";
import { type Customer } from "@/lib/database";

export function getCustomerFields(customer?: Customer): FormField[] {
  return [
    {
      name: "name",
      label: "Name",
      value: customer?.name,
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      value: customer?.email,
      required: true,
    },
    {
      name: "phone",
      label: "Phone",
      type: "tel",
      value: customer?.phone,
      required: true,
      pattern: "^\\+?[0-9]{7,15}$",
    },
  ];
}
