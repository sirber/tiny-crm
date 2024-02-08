import type { Extra } from "./Extra";

export type Person = {
  id: string,
  type: string,
  extras: Extra[],
};