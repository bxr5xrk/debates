import { API } from "@/shared/api/api-routes";
import { useAfterFetch } from "@/shared/hooks";
import { useFriendRemove } from "../../api";
import { Button } from "@/shared/ui";

interface FriendRemoveActionProps {
    friendId: number;
}

export function FriendRemoveAction(
    props: FriendRemoveActionProps
): JSX.Element {
    const { friendId } = props;
    const { trigger, isMutating } = useFriendRemove(friendId);
    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.FRIENDS_ROUTES.friends],
    });

    async function onRemove(): Promise<void> {
        const res = await trigger();
        onAfterFetch(
            ["Friend removed successfully", "Failed to remove friend"],
            res.status
        );
    }

    return (
        <Button
            onClick={onRemove}
            disabled={isMutating}
            className="after:bg-darkRed hover:text-white"
        >
            {isMutating ? "Loading..." : "Remove"}
        </Button>
    );
}
