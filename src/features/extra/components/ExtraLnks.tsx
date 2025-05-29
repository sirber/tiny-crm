import { Card, CardContent, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { Link } from "@/features/extra";
import List from "@/components/List";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import CardModal from "@/components/CardModel";

interface ExtraLinksProps {
  data: Array<Link>;
  setData: (data: Array<Link>) => void;
}

// eslint-disable-next-line
export default function ExtraLinks({ data, setData }: ExtraLinksProps) {
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

  const [showModal, setShowModal] = useState(false);

  const handleRowClick = useCallback((params: GridRowParams): void => {
    console.log(params);
    throw new Error("Function not implemented.");
  }, []);

  const handleAddClick = useCallback((): void => {
    setShowModal(true);
  }, []);

  function onClose() {
    setShowModal(false);
  }

  return (
    <>
      <Card>
        <CardContent>
          <List
            title="Links"
            columns={columns}
            rows={data}
            onRowClick={handleRowClick}
            onAddClick={handleAddClick}
          />
        </CardContent>
      </Card>

      <CardModal
        open={showModal}
        onClose={onClose}
      >
        <CardContent>
          <Typography variant="h6">Link</Typography>
          WIP
        </CardContent>
      </CardModal>
    </>
  );
}
