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
    field: "phone",
    headerName: "Phone",
    width: 150,
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

export const ContactList = ({ rows }: { rows: GridValidRowModel[] }) => {
  const router = useRouter();

  function onRefreshClick() {
    router.refresh();
  }

  function onAddClick() {
    router.push("/people/contact/new");
  }

  function onRowClick(params: GridRowParams) {
    router.push("/people/contact/" + params.id);
  }

  return (
    <List
      title="Contacts"
      columns={columns}
      rows={rows}
      onRefreshClick={onRefreshClick}
      onAddClick={onAddClick}
      onRowClick={onRowClick}
    ></List>
  );
}; 