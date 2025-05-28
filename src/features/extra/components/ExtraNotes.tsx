import { Card, CardContent } from "@mui/material";
import { Note } from "@/features/extra";
import { useCallback } from "react";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import List from "@/components/List";

interface ExtraNotesProps {
  data: Array<Note>;
  setData: (data: Array<Note>) => void;
}

// eslint-disable-next-line
export default function ExtraNotes({ data, setData }: ExtraNotesProps) {
  const columns: GridColDef[] = [
    {
      field: "created_at",
      headerName: "Date",
      width: 120,
    },
    {
      field: "title",
      headerName: "Title",
      width: 300,
    },
  ];

  const handleRowClick = useCallback((params: GridRowParams): void => {
    console.log(params);
    throw new Error("Function not implemented.");
  }, []);

  const handleAddClick = useCallback((): void => {
    throw new Error("Function not implemented.");
  }, []);

  return (
    <Card>
      <CardContent>
        <List
          title="Notes"
          columns={columns}
          rows={data}
          onRowClick={handleRowClick}
          onAddClick={handleAddClick}
        />
      </CardContent>
    </Card>
  );
}
