// import Icon from "@mdi/react";
// import { mdiEyeOutline } from "@mdi/js";
import { useEffect, useState, FormEvent } from "react";
import { button as buttonStyles } from "@nextui-org/theme";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { create_issue, Issue } from "@/lib/api";

interface Props {
    onNewIssue: (issue: Issue) => void;
}

export default function AddDialog({ onNewIssue }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    useEffect(() => {
        setLoading(false)
        setTitle("");
        setDescription("");
    }, [isOpen]);

    async function onFormConfirm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (title === "" || description === "") return;
        setLoading(true);
        const payload = {
            title,
            description
        };
        const response = await create_issue(payload);
        setLoading(false);
        if (response) {
            onNewIssue(response);
            onClose();
        }
    };

    return (
        <>
            <Button size="sm" onPress={onOpen} color="danger">
                Add new issue
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <form onSubmit={onFormConfirm}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Add new issue
                                </ModalHeader>
                                <ModalBody>
                                    <Input
                                        size="sm"
                                        label="Title"
                                        value={title}
                                        onChange={(evt) => setTitle(evt.target.value)}
                                    />
                                    <Textarea
                                        label="Description"
                                        size="sm"
                                        placeholder="Enter your description"
                                        value={description}
                                        onChange={(evt) => setDescription(evt.target.value)}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        isLoading={loading}
                                        isDisabled={title === "" || description === ""}
                                    >
                                        Start
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
};
