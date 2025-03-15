"use client";

import { useCallback, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";
import Extras from "@/features/extra/components/Extras";
import CustomerDTO from "@/features/people/dto/CustomerDTO";
import { ExtraProps } from "@/features/extra";

export const CustomerNew = () => {
  const router = useRouter();

  const [customer, setCustomer] = useState<CustomerDTO>(new CustomerDTO());

  function handleCustomerChange(key: keyof CustomerDTO, value: string) {
    setCustomer((prev) => prev.withUpdatedField(key, value));
  }

  const handleExtrasChange = useCallback((updatedExtras: ExtraProps) => {
    setCustomer((prev) => prev.withUpdatedExtras(updatedExtras));
  }, []);

  function cancel() {
    router.push("/people/customer");
  }

  return (
    <Grid container spacing={1}>
      <Grid size={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Add Customer</Typography>
            <TextField
              fullWidth
              label="Name"
              margin="dense"
              value={customer.name}
              onChange={(e) => handleCustomerChange("name", e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              margin="dense"
              value={customer.email}
              onChange={(e) => handleCustomerChange("email", e.target.value)}
            />
            <TextField
              fullWidth
              label="Phone"
              margin="dense"
              value={customer.phone}
              onChange={(e) => handleCustomerChange("phone", e.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary">
              Add
            </Button>
            <Button variant="contained" color="secondary" onClick={cancel}>
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid size={6}>
        <Extras data={customer.extras} setData={handleExtrasChange} />
      </Grid>
    </Grid>
  );
};
