"use client";

import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridValidRowModel,
} from "@mui/x-data-grid";

interface ListProps {
  title: string;
  columns: GridColDef[];
  rows: GridValidRowModel[];
  onRowClick: (params: GridRowParams) => void;
  onAddClick: () => void;
  onRefreshClick: () => void;
}

export default function List({
  title,
  columns,
  rows,
  onAddClick,
  onRowClick,
  onRefreshClick,
}: ListProps) {
  return (
    <>
      <Grid
        container
        alignItems="center"
      >
        <Grid size={6}>
          <Typography
            variant="h4"
            component="h1"
          >
            {title}
          </Typography>
        </Grid>
        <Grid
          size={6}
          textAlign="right"
        >
          <ButtonGroup variant="contained">
            <Button onClick={onAddClick}>Add</Button>
            <Button onClick={onRefreshClick}>Refresh</Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      <Box
        sx={{
          minHeight: 400,
          width: "100%",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={onRowClick}
          disableRowSelectionOnClick
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
              paginationModel: {
                page: 0,
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          // checkboxSelection
        />
      </Box>
    </>
  );
}
