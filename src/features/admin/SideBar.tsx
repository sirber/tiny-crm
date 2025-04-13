import { Paper, Typography } from "@mui/material";

export default function SideBar() {
  return (
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
  );
}
