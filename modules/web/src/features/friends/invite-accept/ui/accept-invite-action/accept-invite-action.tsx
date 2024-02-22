import { useInviteAccept } from "@/features/friends/invite-accept/api";
import { API } from "@/shared/api/api-routes";
import { useAfterFetch } from "@/shared/hooks";

interface AcceptInviteActionProps {
  inviteId: number;
}

export function AcceptInviteAction(props: AcceptInviteActionProps): JSX.Element {
    const { inviteId } = props;
    const { trigger, isMutating } = useInviteAccept(inviteId);
    const { onAfterFetch } = useAfterFetch({ revalidate: [API.FRIENDS_ROUTES.invites, API.FRIENDS_ROUTES.friends] });

    async function onAccept(): Promise<void> {
        const res = await trigger();
        onAfterFetch(["Invite accepted successfully", "Failed to send invite"], res.status);
    }

    return (
        <button onClick={onAccept} disabled={isMutating}>{isMutating ? "Loading..." : "Accept"}</button>
    );
}