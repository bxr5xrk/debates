import { Room, RoomStatusEnum } from "@/entities/room";

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
            <p>countdown total: {countdownTotal}s</p>
            <p>countdown report: {countdownReport}s</p>
            <p>countdown grading: {countdownGrading}s</p>
            <p>topic {room?.topic}</p>
            <p className="text-xl font-bold">is admin {isAdmin.toString()}</p>
        </>
    );
}