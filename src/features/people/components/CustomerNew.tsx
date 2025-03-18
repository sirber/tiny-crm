"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";
import Extras from "@/features/extra/components/Extras";
import { NewCustomerProps } from "../interfaces/NewCustomerProps";
import { FormField } from "@/interfaces/FormField";
import { FormComponent } from "@/components/FormComponent";

export const CustomerNew = ({ userId }: NewCustomerProps) => {
  const router = useRouter();

  function cancel() {
    router.push("/people/customer");
  }

  const fields: FormField[] = [
    {
      name: "name",
      label: "Name",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      label: "Phone",
      type: "tel",
      required: true,
      pattern: "^\\+?[0-9]{7,15}$",
    },
  ];

  return (
    <Grid
      container
      spacing={1}
    >
      <Grid size={6}>
        <form>
          <Card>
            <CardContent>
              <Typography variant="h6">Add Customer</Typography>
              <FormComponent fields={fields} />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Add
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={cancel}
              >
                Cancel
              </Button>
            </CardActions>
          </Card>
        </form>
      </Grid>

      <Grid size={6}>
        <Extras
          data={customer.extras}
          setData={handleExtrasChange}
        />
      </Grid>
    </Grid>
  );
};
