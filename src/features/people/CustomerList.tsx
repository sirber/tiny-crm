"use client";

import List from "@/components/List";
import {GridColDef, GridRowParams, GridValidRowModel} from "@mui/x-data-grid";
import {redirect, RedirectType, useRouter} from "next/navigation";

const columns: GridColDef[] = [
    {field: "name", headerName: "Name", width: 200},
    {field: "email", headerName: "Email", width: 300},
    {field: "createdAt", headerName: "Created At", width: 150},
    {field: "updatedAt", headerName: "Updated At", width: 150},
];

export function CustomerList({rows}: { rows: GridValidRowModel[] }) {
    const router = useRouter();

    function onRefreshClick() {
        router.refresh();
    }

    function onAddClick() {
        alert("TODO: onAddClick");
    }

    function onRowClick(params: GridRowParams) {
        redirect("/people/customers/" + params.id, RedirectType.push);
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
