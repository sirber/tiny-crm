import { FormField } from "@/interfaces/FormField";
import { TextField } from "@mui/material";

interface FormProps<T> {
  fields: FormField<T>[];
  values: T;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormComponent = <T,>({
  fields,
  values,
  handleChange,
}: FormProps<T>) => {
  return (
    <>
      {fields.map((field) => (
        <TextField
          key={String(field.name)}
          fullWidth
          label={field.label}
          margin="dense"
          type={field.type || "text"}
          name={String(field.name)}
          value={values[field.name]}
          onChange={handleChange}
          required={field.required}
          inputProps={field.pattern ? { pattern: field.pattern } : {}}
        />
      ))}
    </>
  );
};
