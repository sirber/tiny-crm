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
import { useActionState, useState } from "react";
import { ExtraProps } from "@/features/extra";
import Extras from "@/features/extra/components/Extras";
import { getContactFields } from "../helpers/fields";
import { addContact } from "@/app/people/contact/[id]/actions";

export const ContactAdd = () => {
  const router = useRouter();
  const [state, action] = useActionState(addContact, "");

  const [extras, setExtras] = useState<ExtraProps>({
    followups: [],
    notes: [],
    links: [],
  });

  function cancel() {
    router.push("/people/contact");
  }

  const fields: FormField[] = getContactFields();

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
              <Typography variant="h6">New Contact</Typography>
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
