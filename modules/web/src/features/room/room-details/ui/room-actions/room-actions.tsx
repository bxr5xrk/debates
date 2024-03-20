import { Room, RoomStatusEnum } from "@/shared/types";
import { User } from "@/entities/user";
import { Socket } from "socket.io-client";
import { useEmit } from "../../hooks/use-emit";
import { GradeRoomDialog } from "@/features/room";
import { EndRoomDialog } from "@/router/room/ui/end-room-dialog";
import { Button } from "@/shared/ui";
import Link from "next/link";
import { cl } from "@/shared/lib/cl";
import { useState } from "react";
import { Modal } from "./modalRoom";

interface RoomActionsProps {
    onlineMembers: User[];
    userId: number;
    isAdmin: boolean;
    socket: Socket | null;
    isJudge: boolean;
    status: RoomStatusEnum | null;
    isCurrentTeamMember: boolean;
    currentTeamType: string | undefined | null;
    room: Room;
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
        currentTeamType,
        room
    } = props;
    const { onEnd, onJoin, onPause, onRate, onResume, onStart, onSkip } =
        useEmit(socket, isAdmin);
    const [modal, setModal] = useState(true);

    const modalJoin  = ():void => {
        setModal(!modal);
    };
    
    const isRoomInProgress = status === RoomStatusEnum.GRADING || status === RoomStatusEnum.PAUSED || status === RoomStatusEnum.STARTED || status === RoomStatusEnum.ENDED;

    
    return (
        <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between p-2 sm:p-6">
            {
                modal && !isRoomInProgress && (
                    <Modal setModal={setModal} modal={modal} modalJoin={modalJoin} userId={userId} onJoin={onJoin} onStart={onStart} onlineMembers={onlineMembers} status={status} isAdmin={isAdmin}/>
                )}
            <div className="flex justify-between">
                <Link
                    className="w-[100px] sm:w-[150px] text-center base-button capitalize"
                    href="./dashboard"
                >
                    leave
                </Link>
                {isAdmin &&
                    (status === RoomStatusEnum.STARTED ||
                        status === RoomStatusEnum.PAUSED) && (
                    <Button
                        onClick={onEnd}
                        className="w-[115px] sm:w-[165px] after:bg-darkRed after:border-white text-white"
                    >
                            End game
                    </Button>
                )}
            </div>
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
                            className="sm:w-[165px] w-[100px] after:bg-white after:bord"
                        >
                            Stop
                        </Button>
                    )}

                    {isAdmin && status === RoomStatusEnum.PAUSED && (
                        <Button
                            onClick={onResume}
                            className="sm:w-[165px] w-[100px] after:bg-darkRed after:border-white text-white"
                        >
                            resume
                        </Button>
                    )}
                </div>
            </div>
            <div className="absolute z-[101]">
                {isJudge && status === RoomStatusEnum.GRADING && (
                    <GradeRoomDialog isOpen onSelect={onRate} room={room}/>
                )}
                {!isJudge && status === RoomStatusEnum.GRADING && (
                    <EndRoomDialog isOpen />
                )}
            </div>
        </div>
    );
}
