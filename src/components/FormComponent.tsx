import { FormField } from "@/interfaces/FormField";
import { TextField } from "@mui/material";

interface FormProps {
  fields: FormField[];
  values?: Record<string, unknown>;
}

export const FormComponent = ({ fields, values }: FormProps) => {
  return (
    <>
      {fields.map((field) => (
        <TextField
          key={field.name}
          fullWidth
          label={field.label}
          margin="dense"
          type={field.type || "text"}
          name={field.name}
          value={values?.[field.name] || ""}
          required={field.required}
          inputProps={
            field.pattern
              ? {
                  pattern: field.pattern,
                }
              : {}
          }
        />
      ))}
    </>
  );
};
