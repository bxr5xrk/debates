'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { CreateRoomForm } from "./ui/create-room-form";
import { useOnAir } from "@/features/room/on-air/api";

export function CreateRoomDialog(): JSX.Element {
    const { data } = useOnAir();

    const isOnAir = data?.data.code;

    if (isOnAir) {
        return <></>;
    }

    return (
        <Dialog>
            <DialogTrigger>Create Room</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new room</DialogTitle>
                    <CreateRoomForm />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
