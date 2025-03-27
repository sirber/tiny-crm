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
import { FormField } from "@/interfaces/FormField";
import { FormComponent } from "@/components/FormComponent";
import { useActionState, useState } from "react";
import { ExtraProps } from "@/features/extra";
import Extras from "@/features/extra/components/Extras";
import { getCustomerFields } from "../helpers/fields";
import { newCustomer } from "@/app/people/customer/[id]/actions";

export const CustomerNew = () => {
  const router = useRouter();
  const [state, action] = useActionState(newCustomer, null);

  const [extras, setExtras] = useState<ExtraProps>({
    followups: [],
    notes: [],
    links: [],
  });

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
          <input
            type="hidden"
            name="extras"
            value={JSON.stringify(extras)}
          />
          <Card>
            <CardContent>
              <Typography variant="h6">New Customer</Typography>
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
        <Extras
          data={extras}
          setData={setExtras}
        />
      </Grid>
    </Grid>
  );
};
