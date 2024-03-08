import { API } from "@/shared/api/api-routes";
import { useAfterFetch } from "@/shared/hooks";
import { Button } from "@/shared/ui";
import { useLikeRoom } from "../../api";

interface LikeRoomActionProps {
    roomId: number;
}

export function LikeRoomAction(
    props: LikeRoomActionProps
): JSX.Element {
    const { roomId } = props;
    const { trigger, isMutating } = useLikeRoom(roomId);
    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.ROOM_ROUTES.roomHistory, API.ROOM_ROUTES.publicRooms],
    });

    async function onAccept(): Promise<void> {
        const res = await trigger();
        onAfterFetch(
            ["Room liked successfully", "Failed to like the room"],
            res.status
        );
    }

    return (
        <Button
            className="after:bg-green hover:text-white p-2"
            onClick={onAccept}
            disabled={isMutating}
        >
            {isMutating ? "Loading..." : "Like"}
        </Button>
    );
}