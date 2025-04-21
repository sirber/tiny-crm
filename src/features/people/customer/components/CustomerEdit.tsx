"use client";

import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { ExtraProps } from "@/features/extra";
import { FormField } from "@/interfaces/FormField";
import { getCustomerFields } from "../helpers/fields";
import { FormComponent } from "@/components/FormComponent";
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
import { IPeopleDocument } from "@/schemas";

export interface EditCustomerProps {
  customer: IPeopleDocument;
}

export const CustomerEdit = ({ customer }: EditCustomerProps) => {
  const router = useRouter();
  const [state, action] = useActionState(editCustomer, null);

  const [extras, setExtras] = useState<ExtraProps>({
    followups: [],
    notes: [],
    links: [],
  });

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
          <input
            type="hidden"
            name="extras"
            value={JSON.stringify(extras)}
          />
          <Card>
            <CardContent>
              <Typography variant="h6">Edit Customer</Typography>
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
