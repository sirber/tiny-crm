'use client';

import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { useActionState } from 'react';
import { loginAction } from '@/app/actions/auth';

export function LoginForm() {
  const [state, action] = useActionState(loginAction, null);

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh" 
      bgcolor="#f5f5f5"
    >
      <Card sx={{ maxWidth: 400, width: '100%', padding: 3, boxShadow: 3 }}>
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
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                size="large"
                fullWidth
              >
                Login
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
