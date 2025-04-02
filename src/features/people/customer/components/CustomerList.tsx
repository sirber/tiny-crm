"use client";

import List from "@/components/List";
import { GridColDef, GridRowParams, GridValidRowModel } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 150,
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 150,
  },
];

export const CustomerList = ({ rows }: { rows: GridValidRowModel[] }) => {
  const router = useRouter();

  function onRefreshClick() {
    router.refresh();
  }

  function onAddClick() {
    router.push("/people/customer/new");
  }

  function onRowClick(params: GridRowParams) {
    router.push("/people/customer/" + params.id);
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
};
