import { Box, Paper, Typography } from "@mui/material";
import SideBar from "@/features/admin/SideBar";

export default async function AdminUserPage() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        minHeight: "300px",
      }}
    >
      <SideBar />

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
