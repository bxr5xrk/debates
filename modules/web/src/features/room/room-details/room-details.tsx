"use client";

import { useFieldsSetup } from "./hooks/use-fields-setup";
import { useRoomSetup } from "./hooks/use-room-setup";
import { useEventListener } from "./hooks/use-event-listener";
import { RoomActions } from "./ui/room-actions";
import { MainDetails } from "./ui/main-details";
import { RoomUserItem } from "./ui/room-user-item";
import { RoomTeamList } from "./ui/room-team-list";
import { cl } from "@/shared/lib/cl";
import Judge from "./ui/judge/judge";

interface RoomDetailsProps {
    roomId: string;
    userId: number;
}

export const onlineMembersArr: number[] = [];

export function RoomDetails(props: RoomDetailsProps): JSX.Element {
    const { roomId, userId } = props;
    const { isJudge, socket, room } = useRoomSetup(roomId, userId);
    
    const {
        countdownGrading,
        countdownReport,
        countdownTotal,
        currentTeam,
        isAdmin,
        onlineMembers,
        setCountdownGrading,
        setCountdownReport,
        setCountdownTotal,
        setCurrentTeam,
        setIsAdmin,
        setOnlineMembers,
        setStatus,
        status,
    } = useFieldsSetup();
    
    useEventListener({
        socket,
        setCountdownGrading,
        setCountdownReport,
        setCountdownTotal,
        setCurrentTeam,
        setIsAdmin,
        setOnlineMembers,
        setStatus,
    });

    if (!room) {
        return <></>;
    }

    onlineMembers.map((member) => {
        onlineMembersArr.push(member.id);

        return (
            <RoomUserItem
                key={member.id}
                {...member}
                isCurrentUser={member.id === userId}
            />
        );
    });

    return (
        <div className="flex flex-col gap-2 relative h-full top-0">
            <RoomActions
                status={status}
                onlineMembers={onlineMembers}
                isAdmin={isAdmin}
                isJudge={isJudge}
                socket={socket}
                userId={userId}
                isCurrentTeamMember={currentTeam?.isTeamMember ?? false}
                currentTeamType={currentTeam?.currentTeamType}
                room={room}
            />
            <MainDetails
                status={status}
                room={room}
                countdownGrading={countdownGrading}
                countdownReport={countdownReport}
                countdownTotal={countdownTotal}
                isAdmin={isAdmin}
                currentTeamType={currentTeam?.currentTeamType}
            />

            <div className="flex justify-between  h-[100vh] w-[100vw] z-[-1] absolute">
                <div
                    className={cl(
                        currentTeam?.currentTeamType === "proTeam" &&
                            "border-blue-500", "h-full w-[45%]"
                    )}
                >

                    <RoomTeamList
                        team={room.proTeam}
                        currentUserId={userId}
                        className={cl(
                            currentTeam?.currentTeamType === "conTeam" &&
                                " bg-rose-300 ","w-full"
                        )}
                        
                    />
                </div>
                <div className={cl(
                    currentTeam?.currentTeamType === "conTeam" &&
                            " bg-rose-300", "h-full w-[55%] relative z-[-1]"
                )}>
                    <RoomTeamList
                        team={room.conTeam}
                        currentUserId={userId}
                        className={cl("w-full  gap-5 items-end  bg-lightning border border-black border-r-2",
                            currentTeam?.currentTeamType === "proTeam"?
                                "border-blue-300 bg-sky-300":"bg-white"
                        )}
                    />
                </div>
            </div>
            <Judge room={room} />
        </div>
    );
}
