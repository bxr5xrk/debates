import { RoomStatusEnum } from "@/shared/types";
import { User } from "@/entities/user";
import { Socket } from "socket.io-client";
import { useEmit } from "../../hooks/use-emit";
import { GradeRoomDialog } from "@/features/room";
import { EndRoomDialog } from "@/router/room/ui/end-room-dialog";
import { Button } from "@/shared/ui";
import Link from "next/link";
import { cl } from "@/shared/lib/cl";
import { useState } from "react";

interface RoomActionsProps {
    onlineMembers: User[];
    userId: number;
    isAdmin: boolean;
    socket: Socket | null;
    isJudge: boolean;
    status: RoomStatusEnum | null;
    isCurrentTeamMember: boolean;
    currentTeamType: string | undefined | null
}

export function RoomActions(props: RoomActionsProps): JSX.Element {
    const {
        onlineMembers,
        userId,
        isAdmin,
        socket,
        isJudge,
        status,
        isCurrentTeamMember,
        currentTeamType
    } = props;
    const { onEnd, onJoin, onPause, onRate, onResume, onStart, onSkip } =
        useEmit(socket, isAdmin);
    const [modal, setModal] = useState(true);

    const modalJoin  = ():void => {
        setModal(!modal);
        onJoin();
        onStart();

    };
    

    return (
        <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between p-6">
            <div className="flex justify-between">
                <Link
                    className="w-[150px] text-center base-button capitalize"
                    href="./dashboard"
                >
                    leave
                </Link>
                {isAdmin &&
                    (status === RoomStatusEnum.STARTED ||
                        status === RoomStatusEnum.PAUSED) && (
                    <Button
                        onClick={onEnd}
                        className="w-[165px] after:bg-darkRed after:border-white text-white"
                    >
                            End game
                    </Button>
                )}
            </div>
            {
                modal && (
                    <>
                        <div className="absolute w-full h-full top-0 left-0 z-10 bg-slate-50 opacity">
                            <div className="self-center border-4 border-black w-1/2  rounded-[50px] mx-auto mt-[200px] p-[90px] bg-slate-500">
                                <p className="text-[30px] text-center text-white border-text font-bold">join the room? </p> 
                                <div className="flex justify-between">
                                    <Link
                                        className="w-[150px] text-center base-button h-min font-bold"
                                        href="./dashboard"
                                    >
                    leave
                                    </Link>
                                    {!onlineMembers.find((i) => i.id === userId) && (
                                        <Button onClick={()=>modalJoin()} className="w-[130px] h-min">
                    join
                                        </Button>
                                    )}
                                </div>
                                {isAdmin && status === RoomStatusEnum.PENDING && (
                                    <Button onClick={onStart} className="w-130px h-min">
                    start
                                    </Button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            <div>
                <div className={cl("w-1/4 flex",
                    currentTeamType === "conTeam"
                        ? "justify-end"
                        : "justify-start ml-auto"
                )}>
                    {(isAdmin || isCurrentTeamMember) &&
                        (status === RoomStatusEnum.STARTED ||
                            status === RoomStatusEnum.PAUSED) && (
                        <Button
                            onClick={onSkip}
                            className={cl("w-[130px]",
                                currentTeamType === "conTeam"
                                    ? "after:bg-red"
                                    : "after:bg-blue"
                            )}
                        >
                                skip
                        </Button>
                    )}
                </div>
                <div className="mt-[20px] flex justify-center">
                    {isAdmin && status === RoomStatusEnum.STARTED && (
                        <Button
                            onClick={onPause}
                            className="w-[165px] after:bg-white after:bord"
                        >
                            Stop
                        </Button>
                    )}

                    {isAdmin && status === RoomStatusEnum.PAUSED && (
                        <Button
                            onClick={onResume}
                            className="w-[165px] after:bg-darkRed after:border-white text-white"
                        >
                            resume
                        </Button>
                    )}
                </div>
            </div>
            {isJudge && status === RoomStatusEnum.GRADING && (
                <GradeRoomDialog isOpen onSelect={onRate} />
            )}
            {!isJudge && status === RoomStatusEnum.GRADING && (
                <EndRoomDialog isOpen />
            )}
        </div>
    );
}
