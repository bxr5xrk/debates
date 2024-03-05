import { API } from "@/shared/api/api-routes";
import { useAfterFetch } from "@/shared/hooks";
import { Button } from "@/shared/ui";
import { usePublishRoom } from "./usePublishRoom";
interface AcceptInviteActionProps {
    roomId: number;
}

export function PublishRoomAction(
    props: AcceptInviteActionProps
): JSX.Element {
    const { roomId } = props;
    const { trigger, isMutating } = usePublishRoom(roomId);
    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.FRIENDS_ROUTES.invites, API.FRIENDS_ROUTES.friends],
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
        >
            {isMutating ? "Loading..." : "Publish"}
        </Button>
    );
}