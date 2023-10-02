"use client"
import { useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencilOutline, mdiDeleteOutline } from "@mdi/js";
import ViewDialog from "./view-dialog";

interface Issue {
    id: String;
    title: String;
    description: String;
}

interface Props {
    issues: Issue[];
};

interface Column {
    name: string;
    uid: string
};

const columns = [
    { name: "TITLE", uid: "title" },
    // { name: "DESCRIPTION", uid: "description" },
    { name: "ACTIONS", uid: "actions" },
];


export default function IssuesTable({ issues, }: Props) {

    const renderCell = useCallback((issue: Issue, columnKey: string) => {
        const cellValue = issue[columnKey];

        switch (columnKey) {
            case "title":
                return (
                    <p className="text-left text-bold text-sm capitalize" >
                        {issue.title}
                    </p>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <ViewDialog id={issue.id}/>
                        </Tooltip>
                        <Tooltip content="Edit Issue">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <Icon path={mdiPencilOutline} size={1} />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete Issue">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <Icon path={mdiDeleteOutline} size={1} />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table removeWrapper aria-label="Example static collection table">
            <TableHeader columns={columns}>
                {(column: Column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={issues}>
                {(item: Issue) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}