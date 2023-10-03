import Icon from "@mdi/react";
import { mdiEyeOutline } from "@mdi/js";
import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip } from "@nextui-org/react";
import { get_issue, Issue } from "@/lib/api";

interface Props {
    id: string
}

export default function ViewDialog({ id }: Props) {
    const [issue, setIssue] = useState<Issue>()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        get_issue(id).then(
            (data) => {
                setIssue(data);
                console.log(data);
            });
    }, [isOpen]);

    return (
        <>
            <Tooltip content="Details">
                <span onClick={onOpen} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <Icon path={mdiEyeOutline} size={1} />
                </span>
            </Tooltip>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{issue.title}</ModalHeader>
                            <ModalBody>
                                <p>
                                    {issue.description}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
};
