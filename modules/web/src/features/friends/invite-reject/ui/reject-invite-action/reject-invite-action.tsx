import { API } from "@/shared/api/api-routes";
import { useAfterFetch } from "@/shared/hooks";
import { useInviteReject } from "../../api";
import { Button } from "@/shared/ui";

interface RejectInviteActionProps {
    inviteId: number;
}

export function RejectInviteAction(
    props: RejectInviteActionProps
): JSX.Element {
    const { inviteId } = props;
    const { trigger, isMutating } = useInviteReject(inviteId);
    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.FRIENDS_ROUTES.invites],
    });

    async function onAccept(): Promise<void> {
        const res = await trigger();
        onAfterFetch(
            ["Invite rejected successfully", "Failed to send invite"],
            res.status
        );
    }

    return (
        <Button
            className="after:bg-darkRed hover:text-white"
            onClick={onAccept}
            disabled={isMutating}
        >
            {isMutating ? "Loading..." : "Reject"}
        </Button>
    );
}
