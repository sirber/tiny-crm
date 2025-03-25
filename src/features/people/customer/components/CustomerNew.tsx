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
import { useState } from "react";
import { ExtraProps } from "@/features/extra";
import Extras from "@/features/extra/components/Extras";
import { getCustomerFields } from "../helpers/fields";

export const CustomerNew = () => {
  const router = useRouter();

  const [extras, setExtras] = useState<ExtraProps>({
    followups: [],
    notes: [],
    links: [],
  });

  function cancel() {
    router.push("/people/customer");
  }

  const fields: FormField[] = getCustomerFields();

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
            name="extras"
            value={JSON.stringify(extras)}
          />
          <Card>
            <CardContent>
              <Typography variant="h6">New Customer</Typography>
              <FormComponent fields={fields} />
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
