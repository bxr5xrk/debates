import { API } from "@/shared/api/api-routes";
import { useAfterFetch } from "@/shared/hooks";
import { Button } from "@/shared/ui";
import { useUnpublishRoom } from "../../api";

interface UnpublishRoomActionProps {
    roomId: number;
}

export function UnpublishRoomAction(
    props: UnpublishRoomActionProps
): JSX.Element {
    const { roomId } = props;
    const { trigger, isMutating } = useUnpublishRoom(roomId);
    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.ROOM_ROUTES.publicRooms, API.ROOM_ROUTES.roomHistory],
    });

    async function onAccept(): Promise<void> {
        const res = await trigger();
        onAfterFetch(
            ["Room unpublished successfully", "Failed to unpublish the room"],
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
            {isMutating ? "Loading..." : "Unpublish"}
        </Button>
    );
}