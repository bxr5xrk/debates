"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui";
import { PropsWithChildren, useState } from "react";

interface GradeRoomDialogProps {
  onSelect: (type: "conTeam" | "proTeam") => void;
}

export function GradeRoomDialog(props: PropsWithChildren<GradeRoomDialogProps>): JSX.Element {
    const { onSelect, children } = props;
    const [open, setOpen] = useState(false);

    function handleSelect(type: "conTeam" | "proTeam"): void {
        onSelect(type);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{children || "Rate"}</DialogTrigger>
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
