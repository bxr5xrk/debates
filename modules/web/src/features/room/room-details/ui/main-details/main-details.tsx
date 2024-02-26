import { Room, RoomStatusEnum } from "@/entities/room";
import { formatSeconds } from "@/shared/lib";

interface MainDetailsProps {
    countdownTotal: number;
    countdownReport: number;
    countdownGrading: number;
    room: Room | undefined;
    isAdmin: boolean;
    status: RoomStatusEnum | null;
}

export function MainDetails(props: MainDetailsProps): JSX.Element {
    const { countdownTotal, countdownReport, countdownGrading, room, isAdmin, status } = props;

    return (
        <>
            <span className="text-2xl p-2 border rounded-lg">{status}</span>
            <p>countdown total: {formatSeconds(countdownTotal)}</p>
            <p>countdown report: {formatSeconds(countdownReport)}</p>
            <p>countdown grading: {formatSeconds(countdownGrading)}</p>
            <p>topic: {room?.topic}</p>
            <p className="text-xl font-bold">is admin {isAdmin.toString()}</p>
        </>
    );
}

