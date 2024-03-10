import { API } from "@/shared/api/api-routes";
import { useAfterFetch } from "@/shared/hooks";
import { Button } from "@/shared/ui";
import { useUnlikeRoom } from "../../api";

interface UnlikeRoomActionProps {
    roomId: number;
}

export function UnlikeRoomAction(
    props: UnlikeRoomActionProps
): JSX.Element {
    const { roomId } = props;
    const { trigger, isMutating } = useUnlikeRoom(roomId);
    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.ROOM_ROUTES.roomHistory, API.ROOM_ROUTES.publicRooms],
    });

    async function onAccept(): Promise<void> {
        const res = await trigger();
        onAfterFetch(
            ["Room unliked successfully", "Failed to unlike the room"],
            res.status
        );
    }

    return (
        <Button
            className="after:bg-red hover:text-white p-2"
            onClick={onAccept}
            disabled={isMutating}
            isLoading={isMutating}
        >
            {isMutating ? "Loading..." : "Unlike"}
        </Button>
    );
}