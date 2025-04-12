import { getRole } from "@/lib/session";
import { forbidden } from "next/navigation";
import { Box, Paper, Typography } from "@mui/material";

export default async function AdminPage() {
  const role = await getRole();
  if ("admin" !== role) {
    return forbidden();
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        minHeight: "300px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "25%",
          p: 2,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Administration</Typography>
        {/* Add left sidebar content here */}
      </Paper>

      {/* Right Pane (3/4 of the width) */}
      <Paper
        elevation={3}
        sx={{
          width: "75%",
          p: 2,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">Users</Typography>
        {/* Add main content here */}
      </Paper>
    </Box>
  );
}
