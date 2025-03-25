"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ExtraProps } from "@/features/extra";
import { FormField } from "@/interfaces/FormField";
import { getCustomerFields } from "../helpers/fields";
import { FormComponent } from "@/components/FormComponent";
import type { Customer } from "@prisma/client";
import Extras from "@/features/extra/components/Extras";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

export interface EditCustomerProps {
  customer: Customer;
}

export const CustomerEdit = ({ customer }: EditCustomerProps) => {
  const router = useRouter();

  const [extras, setExtras] = useState<ExtraProps>({
    followups: [],
    notes: [],
    links: [],
  });

  function cancel() {
    router.push("/people/customer");
  }

  const fields: FormField[] = getCustomerFields(customer);

  // TODO: form action

  return (
    <Grid
      container
      spacing={1}
    >
      <Grid size={6}>
        <form>
          <input
            type="hidden"
            name="userId"
            value={customer.userId}
          />
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
          data={extras}
          setData={setExtras}
        />
      </Grid>
    </Grid>
  );
};
