import { Button } from "@/shared/ui";
import { useGradeRoom } from "../../api";
import { GradeRoomDialog } from "../grade-room-dialog";
import { useAfterFetch } from "@/shared/hooks";
import { API } from "@/shared/api/api-routes";
import { Room } from "@/shared/types";

interface GradeRoomActionProps {
    roomId: number;
    room: Room;
}

export function GradeRoomAction(props: GradeRoomActionProps): JSX.Element {
    const { roomId, room } = props;
    const { trigger, isMutating } = useGradeRoom(roomId);
    const { onAfterFetch } = useAfterFetch({ revalidate: [API.ROOM_ROUTES.roomHistory] });

    async function handleGrade(team: "conTeam" | "proTeam"): Promise<void> {
        const res = await trigger({
            team
        });

        onAfterFetch(["Room graded successfully", (res as unknown as { message: string }).message ?? "Something went wrong"], res.status);
    }

    return (
        <GradeRoomDialog onSelect={handleGrade} room={room}>
            <Button isLoading={isMutating}>Grade</Button>
        </GradeRoomDialog>
    );
}