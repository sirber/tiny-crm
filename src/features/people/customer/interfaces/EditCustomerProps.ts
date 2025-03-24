import { Customer } from "@prisma/client";

export interface EditCustomerProps {
  userId: string;
  customer: Customer;
}
