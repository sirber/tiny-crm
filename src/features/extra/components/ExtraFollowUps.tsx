import { Card, CardContent } from "@mui/material";
import { useCallback } from "react";
import { FollowUp } from "@/features/extra";
import List from "@/components/List";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";

interface ExtraFollowUpProps {
  data: Array<FollowUp>;
  setData: (data: Array<FollowUp>) => void;
}

// eslint-disable-next-line
export default function ExtraLinks({ data, setData }: ExtraFollowUpProps) {
  const columns: GridColDef[] = [
    {
      field: "follow_at",
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
          title="Follow Ups"
          columns={columns}
          rows={data}
          onRowClick={handleRowClick}
          onAddClick={handleAddClick}
        />
      </CardContent>
    </Card>
  );
}
