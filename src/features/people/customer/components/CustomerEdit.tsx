"use client";

import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { FormField } from "@/interfaces/FormField";
import { getCustomerFields } from "../helpers/fields";
import { FormComponent } from "@/components/FormComponent";
import type { Customer } from "@/lib/database";
import Extras from "@/features/extra/components/Extras";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { editCustomer } from "@/app/people/customer/[id]/actions";

export interface EditCustomerProps {
  customer: Customer;
}

export const CustomerEdit = ({ customer }: EditCustomerProps) => {
  const router = useRouter();
  const [state, action] = useActionState(editCustomer, null);

  function cancel() {
    router.push("/people/customer");
  }

  const fields: FormField[] = getCustomerFields(customer);

  return (
    <Grid
      container
      spacing={1}
    >
      <Grid size={6}>
        <form action={action}>
          <input
            type="hidden"
            name="id"
            value={customer.id}
          />
          <Card>
            <CardContent>
              <Typography variant="h5">Edit Customer</Typography>
              <FormComponent fields={fields} />
              {state}
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Save
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
        <Extras />
      </Grid>
    </Grid>
  );
};
