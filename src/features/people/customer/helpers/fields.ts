import { FormField } from "@/interfaces/FormField";
import { IPeopleDocument } from "@/schemas/People";

export function getCustomerFields(customer?: IPeopleDocument): FormField[] {
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
