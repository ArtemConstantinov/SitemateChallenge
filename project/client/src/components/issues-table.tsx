"use client"
import { useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import Icon from "@mdi/react";
import { mdiPencilOutline } from "@mdi/js";
import ViewDialog from "./view-dialog";
import DeleteButton from "./delete-btn";

interface IssuePayload {
    title: string;
    description: string;
}
interface Issue extends IssuePayload {
    id: string;
}



interface Props {
    issues: Issue[];
    onIssueDeleted?: (id: string) => void;
    onIssueUpdated?: (id: string, payload: IssuePayload) => void;
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


export default function IssuesTable({ issues, onIssueDeleted, onIssueUpdated}: Props) {

    function onDelete(id: string): void {
        if (onIssueDeleted) {
            onIssueDeleted(id)
        }
    };

    function onUpdated(id: string, payload: IssuePayload) {
        if (onIssueUpdated) {
            onIssueUpdated(id, payload)
        }
    };

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
                        <ViewDialog id={issue.id} />
                        
                        <Tooltip color="danger" content="Delete Issue">
                            <DeleteButton
                                id={issue.id}
                                onIssueDeleted={onDelete}
                            />
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table
            removeWrapper
            aria-label="Example static collection table"
            className="min-w-[458px]"
        >
            <TableHeader columns={columns}>
                {(column: Column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={issues} emptyContent={"No rows to display."}>
                {(item: Issue) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}