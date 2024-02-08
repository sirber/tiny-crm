import type { ExtraDto } from "./ExtraDto";

export class PersonDto { // TODO: add all fields
  id!: string;
  type!: string;

  firstName!: string;
  lastName!: string;
  email!: string;
  work!: string;
  birthday!: string;

  phone: {
    home?: string,
    work?: string,
    cell?: string,
    other?: string,
  };

  address: {
    number?: string,
    street?: string,
    city?: string,
    country?: string,
    postalCode?: string,
  };

  isActive!: boolean;

  extraFields!: Array<any>;
  extras!: ExtraDto[];

  constructor() {
    this.phone = {
      home: "",
      work: "",
      cell: "",
      other: "",
    };

    this.address = {
      number: "",
      street: "",
      city: "",
      country: "",
      postalCode: "",
    };
  }
}