"use client";

import List from "@/components/List";
import { GridColDef, GridRowParams, GridValidRowModel } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
];

export function CustomerList({ rows }: { rows: GridValidRowModel[] }) {
  const router = useRouter();

  function onRefreshClick() {
    router.refresh();
  }

  function onAddClick() {
    alert("TODO: onAddClick");
  }

  function onRowClick(params: GridRowParams) {
    console.log(params);
    alert("TODO: onRemoveClick");
  }

  return (
    <List
      title="Customers"
      columns={columns}
      rows={rows}
      onRefreshClick={onRefreshClick}
      onAddClick={onAddClick}
      onRowClick={onRowClick}
    ></List>
  );
}
