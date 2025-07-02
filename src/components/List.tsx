"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
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
}

export default function List({
  title,
  columns,
  rows,
  onAddClick,
  onRowClick,
}: ListProps) {
  const [searchText, setSearchText] = useState("");

  const filteredRows = useMemo(() => {
    if (!searchText) return rows;
    return rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, rows]);

  return (
    <>
      <Grid container alignItems="center" spacing={2} mb={2}>
        <Grid size={6}>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid size={4}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Grid>
        <Grid size={2} textAlign="right">
          <ButtonGroup variant="contained">
            <Button onClick={onAddClick}>Add</Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={filteredRows}
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
        />
      </Box>
    </>
  );
}
