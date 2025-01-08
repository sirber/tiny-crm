"use client";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useActionState } from "react";
import { register } from "./formActions";
import { useRouter } from "next/navigation";
import { isRegisterEnabled } from "@/config";

export function RegisterForm() {
  const router = useRouter();
  const [state, action] = useActionState(register, null);

  const showLoginButton = isRegisterEnabled();

  function goLogin() {
    router.push("/auth/login");
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
            TinyCRM - Register
          </Typography>
          <form action={action}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                id="name"
                name="name"
                label="Name"
                type="text"
                placeholder="Enter your name"
                fullWidth
                required
                autoFocus
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                fullWidth
                required
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
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
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
                Register
              </Button>

              {showLoginButton && (
                <Button
                  type="button"
                  onClick={goLogin}
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Login
                </Button>
              )}
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}