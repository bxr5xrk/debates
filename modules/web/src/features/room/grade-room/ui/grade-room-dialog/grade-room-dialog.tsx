"use client";

import { useWhoami } from "@/features/auth";
import { useFieldsSetup } from "@/features/room/room-details/hooks/use-fields-setup";
import Judge from "@/features/room/room-details/ui/judge/judge";
import { RoomTeamList } from "@/features/room/room-details/ui/room-team-list";
import { cl } from "@/shared/lib/cl";
import { Room } from "@/shared/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";

interface GradeRoomDialogProps {
    onSelect: (type: "conTeam" | "proTeam") => void;
    isOpen?: boolean;
    room: Room;
}


export function GradeRoomDialog(props: PropsWithChildren<GradeRoomDialogProps>): JSX.Element {
    const { onSelect, children, isOpen, room} = props;
    const [open, setOpen] = useState(isOpen ?? false);
    const { data: whoami, } = useWhoami();
    const userId = whoami?.data.id;
    const {currentTeam} = useFieldsSetup();
    const [selectedTeam, setSelectedTeam] = useState<"proTeam" | "conTeam" | null>(null);



    if (!userId) {
        return <></>;
    }

    function handleSelect(type: "conTeam" | "proTeam"): void {
        setSelectedTeam(type);
    
        setTimeout(() => {
            onSelect(type);
            setOpen(false);
        }, 1000);
    }


    return (
        <Dialog  open={open} onOpenChange={setOpen}>
            <div onClick={() => setOpen(true)}>{children || ""}</div>
            <DialogContent>
                <DialogHeader className="flex flex-col items-center">
                    <DialogTitle className="lg:!text-[70px] md:!text-[50px] sm:!text-[40px] !text-[35px] text-center mx-auto mt-[50px] ">Сhoose the winner</DialogTitle>
                    <Judge room={room} className="absolute top-[-25%] mx-auto"/>
                    <div onClick={() => console.log(room)
                    } className="bg-background w-full lg:px-[25px] pb-10">
                        <ul className="mx-auto flex justify-between lg:max-w-[90%] w-full">
                            <li onClick={() => handleSelect("proTeam")} className="p-2 font-bold bg-cover cursor-pointer flex flex-col items-center bg-center hover:bg-[url('/oval.jpeg')]">
                                <p className=" relative text-[20px] md:text-[25px] lg:text-[40px] border-text text-red-600 font-bold">
                                    {selectedTeam === "proTeam" && (
                                        <Image className="absolute top-[-10px] left-[-10px]" src={"/icons/crown.svg"} alt={"crown"} width={36} height={36}/>
                                    )}
                                    Red
                                </p>
                                <p className="text-[25px] md:text-[30px] font-bold">Team</p>
                                <RoomTeamList
                                    team={room.proTeam}
                                    currentUserId={userId}
                                    className={cl("!justify-start !h-min",
                                        currentTeam?.currentTeamType === "proTeam"?
                                            "":""
                                    )}
                                />
                            </li>
                            <li onClick={() => handleSelect("conTeam")} className="p-2 font-bold cursor-pointer bg-center bg-cover flex flex-col items-center hover:bg-[url('/oval.jpeg')]">
                                <p className="relative text-[20px] md:text-[25px] lg:text-[40px] border-text text-sky-600 font-bold">
                                    {selectedTeam === "conTeam" && (
                                        <Image className="absolute top-[-10px] left-[-10px]" src={"/icons/crown.svg"} alt={"crown"} width={36} height={36}/>
                                    )}                                    Blue
                                </p>
                                <p className="text-[25px] md:text-[30px] font-bold">Team</p>
                                <RoomTeamList
                                    team={room.conTeam}
                                    currentUserId={userId}
                                    className={cl("!justify-start !h-min",
                                        currentTeam?.currentTeamType === "conTeam"?
                                            "":""
                                    )}
                                />
                            </li>
                        </ul>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
