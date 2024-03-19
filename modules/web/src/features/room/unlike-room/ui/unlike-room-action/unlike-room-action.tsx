import { API } from "@/shared/api/api-routes";
import { useAfterFetch } from "@/shared/hooks";
import { Button } from "@/shared/ui";
import { useUnlikeRoom } from "../../api";
import Image from "next/image";

interface UnlikeRoomActionProps {
    roomId: number;
    likesCount: number;
}

export function UnlikeRoomAction(
    props: UnlikeRoomActionProps
): JSX.Element {
    const { roomId, likesCount } = props;
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
        <button
            className="flex gap-1.5 p-2"
            onClick={onAccept}
            disabled={isMutating}
        >
            <Image src="/icons/heart-active.svg" alt="Unlike the room" width={24} height={24} />
            {likesCount}
        </button>
    );
}