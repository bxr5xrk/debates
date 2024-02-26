"use client";

import { useFieldsSetup } from "./hooks/use-fields-setup";
import { useRoomSetup } from "./hooks/use-room-setup";
import { useEventListener } from "./hooks/use-event-listener";
import { RoomActions } from "./ui/room-actions";
import { MainDetails } from "./ui/main-details";
import { RoomUserItem } from "./ui/room-user-item";
import { RoomTeamList } from "./ui/room-team-list";
import { cl } from "@/shared/lib/cl";

interface RoomDetailsProps {
    roomId: string;
    userId: number;
}

export function RoomDetails(props: RoomDetailsProps): JSX.Element {
    const { roomId, userId } = props;
    const { isJudge, socket, room } = useRoomSetup(roomId, userId);
    const { countdownGrading, countdownReport, countdownTotal, currentTeam, isAdmin, onlineMembers, setCountdownGrading, setCountdownReport, setCountdownTotal, setCurrentTeam, setIsAdmin, setOnlineMembers, setStatus, status } = useFieldsSetup();

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

    return (
        <div className="flex flex-col gap-2">
            <RoomActions status={status} onlineMembers={onlineMembers} isAdmin={isAdmin} isJudge={isJudge} socket={socket} userId={userId} />
            <MainDetails status={status} room={room} countdownGrading={countdownGrading} countdownReport={countdownReport} countdownTotal={countdownTotal} isAdmin={isAdmin} />

            <p className="text-xl font-bold">judge</p>
            <RoomUserItem {...room.judge} isCurrentUser={room.judge.id === userId} />

            <p className="text-xl font-bold">online</p>
            <ul className="border rounded-xl p-2 flex flex-col gap-2">
                {onlineMembers.map((member) => (
                    <RoomUserItem key={member.id} {...member} isCurrentUser={member.id === userId} />
                ))}
            </ul>

            <p className="text-xl font-bold">teams</p>
            <div className="grid grid-cols-2 gap-2">
                <RoomTeamList team={room.proTeam} currentUserId={userId} className={cl(currentTeam?.currentTeamType === "proTeam" && 'border-blue-500')} />
                <RoomTeamList team={room.conTeam} currentUserId={userId} className={cl(currentTeam?.currentTeamType === "conTeam" && 'border-red-500')} />
            </div>
        </div>
    );
}