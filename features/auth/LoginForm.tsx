"use client";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useActionState, useEffect, useState } from "react";
import { login } from "@/features/auth/actions";
import { useRouter } from "next/navigation";
import { isRegisterEnabled } from "@/config";

export function LoginForm() {
  const router = useRouter();
  const [state, action] = useActionState(login, null);
  const [showRegisterButton, setShowRegisterButton] = useState(false);

  useEffect(() => {
    setShowRegisterButton(isRegisterEnabled());
  }, []);

  function goRegister() {
    router.push("/auth/register");
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Card sx={{ maxWidth: 400, width: "100%", padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" align="center" gutterBottom>
            TinyCRM - Login
          </Typography>
          <form action={action}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                fullWidth
                required
                autoFocus
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                fullWidth
                required
              />

              {state}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Login
              </Button>

              {showRegisterButton && (
                <Button
                  type="button"
                  onClick={goRegister}
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Register
                </Button>
              )}
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
