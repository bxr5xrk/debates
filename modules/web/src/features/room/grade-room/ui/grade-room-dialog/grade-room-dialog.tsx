"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui";
import { PropsWithChildren, useState } from "react";

interface GradeRoomDialogProps {
    onSelect: (type: "conTeam" | "proTeam") => void;
    isOpen?: boolean;
}

export function GradeRoomDialog(props: PropsWithChildren<GradeRoomDialogProps>): JSX.Element {
    const { onSelect, children, isOpen } = props;
    const [open, setOpen] = useState(isOpen ?? false);

    function handleSelect(type: "conTeam" | "proTeam"): void {
        onSelect(type);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div onClick={() => setOpen(true)}>{children || "Grade"}</div>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rate room</DialogTitle>
                    <ul>
                        <li onClick={() => handleSelect("proTeam")} className="p-2 font-bold cursor-pointer border bg-blue-50 border-blue-400">proTeam</li>
                        <li onClick={() => handleSelect("conTeam")} className="p-2 font-bold cursor-pointer border bg-red-50 border-red-400">conTeam</li>
                    </ul>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
