export interface FormField<T> {
  name: keyof T;
  label: string;
  type?: string;
  required?: boolean;
  pattern?: string;
}
