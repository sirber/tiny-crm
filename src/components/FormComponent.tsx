import { FormField } from "@/interfaces/FormField";
import { TextField } from "@mui/material";

interface FormProps {
  fields: FormField[];
}

export const FormComponent = ({ fields }: FormProps) => {
  return (
    <form action="/your-server-action" method="POST">
      {fields.map((field) => (
        <TextField
          key={field.name}
          fullWidth
          label={field.label}
          margin="dense"
          type={field.type || "text"}
          name={field.name}
          required={field.required}
          defaultValue={field.value || ""}
          inputProps={
            field.pattern
              ? {
                pattern: field.pattern,
              }
              : {}
          }
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};
