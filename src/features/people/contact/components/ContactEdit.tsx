"use client";

import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { ExtraProps } from "@/features/extra";
import { FormField } from "@/interfaces/FormField";
import { getContactFields } from "../helpers/fields";
import { FormComponent } from "@/components/FormComponent";
import type { Contact } from "@/lib/database";
import Extras from "@/features/extra/components/Extras";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { editContact } from "@/app/people/contact/[id]/actions";

export interface EditContactProps {
  contact: Contact;
}

export const ContactEdit = ({ contact }: EditContactProps) => {
  const router = useRouter();
  const [state, action] = useActionState(editContact, null);

  const [extras, setExtras] = useState<ExtraProps>({
    followups: [],
    notes: [],
    links: [],
  });

  function cancel() {
    router.push("/people/contact");
  }

  const fields: FormField[] = getContactFields(contact);

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
            value={contact.id}
          />
          <input
            type="hidden"
            name="extras"
            value={JSON.stringify(extras)}
          />
          <Card>
            <CardContent>
              <Typography variant="h6">Edit Contact</Typography>
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