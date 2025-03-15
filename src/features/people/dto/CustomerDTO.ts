import { ExtraProps } from "@/features/extra";

export default class CustomerDTO {
  constructor(
    public name: string = "",
    public email: string = "",
    public phone: string = "",
    public extras: ExtraProps = {
      followups: [],
      links: [],
      notes: [],
    },
  ) {}

  withUpdatedField(key: keyof CustomerDTO, value: string): CustomerDTO {
    return new CustomerDTO(
      key === "name" ? value : this.name,
      key === "email" ? value : this.email,
      key === "phone" ? value : this.phone,
      this.extras, // Preserve `extras` when updating other fields
    );
  }

  withUpdatedExtras(extras: ExtraProps): CustomerDTO {
    return new CustomerDTO(this.name, this.email, this.phone, extras);
  }
}
