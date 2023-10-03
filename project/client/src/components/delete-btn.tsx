"use client";

import { useState } from "react";
import Icon from "@mdi/react";
import { mdiDeleteOutline } from "@mdi/js";
import { Popover, PopoverTrigger, PopoverContent, Tooltip, Button, Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { delete_issue, Issue } from "@/lib/api";

interface Props {
    id: string;
    onIssueDeleted: (id: string) => void;
}

export default function DeleteButton({ id, onIssueDeleted }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    async function onConfirm() {
        setLoading(true);
        const response = await delete_issue(id);
        setLoading(false);
        if (response.success) {
            onIssueDeleted(response.item_id);
            setIsOpen(false);
        }
    }

    return (
        <Popover 
            showArrow 
            placement="bottom" 
            isOpen={isOpen} 
            onOpenChange={(open: boolean) => setIsOpen(open)}
        >
            <PopoverTrigger>
                <span
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                    <Tooltip
                        color="danger"
                        content="Delete Issue"
                        showArrow
                    >
                        <div onClick={(e) => setIsOpen(true)}>
                            <Icon path={mdiDeleteOutline} size={1} />
                        </div>
                    </Tooltip>
                </span>
            </PopoverTrigger>
            <PopoverContent className="p-1">
                <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
                    <CardBody>
                        Are you sure want to delete this issue?
                    </CardBody>
                    <Divider />
                    <CardFooter className="justify-end gap-1">
                        <Button
                            variant="light"
                            size="sm"
                            onPress={(e) => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="danger"
                            onPress={onConfirm}
                            isLoading={loading}
                            size="sm"
                        >
                            Confirm
                        </Button>
                    </CardFooter>
                </Card>
            </PopoverContent>
        </Popover >
    );
};
