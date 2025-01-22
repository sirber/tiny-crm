import { Box, Button, ButtonGroup, Grid2, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";

interface ListProps {
  title: string;
  columns: GridColDef[];
  rows: GridValidRowModel[];
}

export default function List({ title, columns, rows }: ListProps) {
  return (
    <>
      <Grid2 container alignItems="center">
        <Grid2 size={6}>
          <Typography variant="h4" component="h1">
            {title}
          </Typography>
        </Grid2>
        <Grid2 size={6} textAlign="right">
          <ButtonGroup variant="contained">
            <Button>Add</Button>
            <Button>Remove</Button>
            <Button>Refresh</Button>
          </ButtonGroup>
        </Grid2>
      </Grid2>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "darkgray",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Box>
    </>
  );
}
