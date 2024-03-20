import { API } from "@/shared/api/api-routes";
import { useAfterFetch } from "@/shared/hooks";
import { Button } from "@/shared/ui";
import { useLikeRoom } from "../../api";
import Image from "next/image";

interface LikeRoomActionProps {
    roomId: number;
    likesCount: number;
    like: boolean;
    setLike: (like: boolean) => void;
}

export function LikeRoomAction(props: LikeRoomActionProps): JSX.Element {
    const { roomId, likesCount, like, setLike } = props;
    const { trigger, isMutating } = useLikeRoom(roomId);
    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.ROOM_ROUTES.roomHistory, API.ROOM_ROUTES.publicRooms],
    });

    async function onAccept(): Promise<void> {
        const res = await trigger();
        onAfterFetch(["Room liked successfully", "Failed to like the room"], res.status);
    }

    return (
        <button
            className="flex gap-1.5 p-2"
            onClick={() => {
                onAccept();
                setLike(!like);
            }}
            disabled={isMutating}
        >
            <Image src="/icons/heart.svg" alt="Like the room" width={24} height={24} />
            {likesCount}
        </button>
    );
}
