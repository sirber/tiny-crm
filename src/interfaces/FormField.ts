export interface FormField {
  name: string;
  label: string;
  type?: string;
  value?: string;
  required?: boolean;
  pattern?: string;
}
