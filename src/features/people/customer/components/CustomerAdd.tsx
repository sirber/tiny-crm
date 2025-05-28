"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { FormField } from "@/interfaces/FormField";
import { FormComponent } from "@/components/FormComponent";
import { useActionState } from "react";
import Extras from "@/features/extra/components/Extras";
import { getCustomerFields } from "../helpers/fields";
import { addCustomer } from "@/app/people/customer/[id]/actions";

export const CustomerAdd = () => {
  const router = useRouter();
  const [state, action] = useActionState(addCustomer, null);

  function cancel() {
    router.push("/people/customer");
  }

  const fields: FormField[] = getCustomerFields();

  return (
    <Grid
      container
      spacing={1}
    >
      <Grid size={6}>
        <form action={action}>
          <Card>
            <CardContent>
              <Typography variant="h5">New Customer</Typography>
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
