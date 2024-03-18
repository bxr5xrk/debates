'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { CreateRoomForm } from "./ui/create-room-form";
import { useOnAir } from "@/features/room/on-air/api";
import { useState } from "react";

export function CreateRoomDialog(): JSX.Element {
    const { data } = useOnAir();
    const [open, setOpen] = useState(false);

    const isOnAir = data?.data;

    if (isOnAir) {
        return <></>;
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>Create Room</DialogTrigger>
            <DialogContent className="lg:w-11/12 lg:h-[90%]">
                <DialogHeader>
                    {/* <DialogTitle>Create new room</DialogTitle> */}
                    <CreateRoomForm afterCreate={() => setOpen(false)} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
