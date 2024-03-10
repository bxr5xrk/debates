import { API } from "@/shared/api/api-routes";
import { useAfterFetch } from "@/shared/hooks";
import { Button } from "@/shared/ui";
import { usePublishRoom } from "../../api";

interface PublishRoomActionProps {
    roomId: number;
}

export function PublishRoomAction(
    props: PublishRoomActionProps
): JSX.Element {
    const { roomId } = props;
    const { trigger, isMutating } = usePublishRoom(roomId);
    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.ROOM_ROUTES.roomHistory, API.ROOM_ROUTES.publicRooms],
    });

    async function onAccept(): Promise<void> {
        const res = await trigger();
        onAfterFetch(
            ["Room published successfully", "Failed to publish the room"],
            res.status
        );
    }

    return (
        <Button
            className="after:bg-green hover:text-white p-2"
            onClick={onAccept}
            disabled={isMutating}
            isLoading={isMutating}
        >
            {isMutating ? "Loading..." : "Publish"}
        </Button>
    );
}