"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui";
import { useState } from "react";

interface EndRoomDialogProps {
    isOpen?: boolean;
}

export function EndRoomDialog(props: EndRoomDialogProps): JSX.Element {
    const { isOpen } = props;
    const [open, setOpen] = useState(isOpen ?? false);

    function onOpenChange(i: boolean): void {
        // lock the dialog
        if (i === false) {
            return;
        }

        setOpen(i);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger>Create Room</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rate room</DialogTitle>
                    <p>Wait for the judge to rate the room</p>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
