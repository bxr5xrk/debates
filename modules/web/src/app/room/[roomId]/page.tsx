import { RoomPage } from "@/router/room";

export default function Page({ params }: { params: { roomId: string } }): JSX.Element {
    return (
        <RoomPage roomId={params.roomId} />
    );
}