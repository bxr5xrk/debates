import { RoomStatusEnum } from "@/entities/room";
import { User } from "@/entities/user";
import { Socket } from "socket.io-client";
import { useEmit } from "../../hooks/use-emit";
import { GradeRoomDialog } from "@/features/room";
import { EndRoomDialog } from "@/router/room/ui/end-room-dialog";

interface RoomActionsProps {
    onlineMembers: User[];
    userId: number;
    isAdmin: boolean;
    socket: Socket | null;
    isJudge: boolean;
    status: RoomStatusEnum | null;
    isCurrentTeamMember: boolean;
}

export function RoomActions(props: RoomActionsProps): JSX.Element {
    const { onlineMembers, userId, isAdmin, socket, isJudge, status, isCurrentTeamMember } = props;
    const { onEnd, onJoin, onPause, onRate, onResume, onStart, onSkip } = useEmit(socket, isAdmin);

    return (
        <div>
            {!onlineMembers.find(i => i.id === userId) && <button onClick={onJoin} className="border p-2">join</button>}
            {isAdmin && status === RoomStatusEnum.PENDING && <button onClick={onStart} className="border p-2">start</button>}
            {(isAdmin && status === RoomStatusEnum.STARTED) && <button onClick={onPause} className="border p-2">pause</button>}
            {isAdmin && status === RoomStatusEnum.PAUSED && <button onClick={onResume} className="border p-2">resume</button>}
            {isAdmin && (status === RoomStatusEnum.STARTED || status === RoomStatusEnum.PAUSED) && <button onClick={onEnd} className="border p-2">end</button>}
            {(isAdmin || isCurrentTeamMember) && (status === RoomStatusEnum.STARTED || status === RoomStatusEnum.PAUSED) && <button onClick={onSkip} className="border p-2">skip</button>}
            {isJudge && status === RoomStatusEnum.GRADING && <GradeRoomDialog isOpen onSelect={onRate} />}
            {!isJudge && status === RoomStatusEnum.GRADING && <EndRoomDialog isOpen />}
        </div>
    );
}