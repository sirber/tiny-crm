import type { Extra } from "./Extra";
import type { Business } from "./Business";

export type User = {
  id?: string;
  firstName: string,
  lastName: string,
  email: string,
  roles: string,
  business: Business[],
  extras: Array<Extra>,
}